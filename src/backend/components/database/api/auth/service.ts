import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { promisify } from "util";
import {
  AppObject,
  HttpStatusCode,
  Confirmation,
  ObjectInfo,
  PaymentPlan,
  UserPolicy,
  UserRole,
  AppEvent,
  Credentials,
  Authorization,
  AccountInfo,
} from "../../../shared/app-types";
import { ServiceHandler } from "../../../shared/service-handler";

const bcryptHash = promisify(hash);
const bcryptCompare = promisify(compare);

export class AuthInfo implements ObjectInfo {}

export class AuthService extends AppObject {
  private static instance: AuthService | null = null;
  private db: Db | null = null;

  private constructor(name: string, schema: AuthInfo, value?: any) {
    super(name, schema, value);
    this.connect();
  }

  subscribe = async (
    credentials: Credentials,
    accountInfo: AccountInfo
  ): Promise<Confirmation> => {
    if (await this.isDuplicated(credentials.username))
      throw { message: "duplicated username", status: HttpStatusCode.Conflict };

    const hashedPassword = await bcryptHash(credentials.password, 12);
    credentials.password = hashedPassword;
    const accountConfirmation = (await ServiceHandler.post(
      "/account/create",
      "account",
      { properties: accountInfo }
    )) as Confirmation;
    credentials.accountId = accountConfirmation.result.insertedId;

    if (!credentials.userPolicy)
      credentials.userPolicy = {
        paymentPlan: PaymentPlan.Free,
        userRole: UserRole.Standard,
      };

    await this.create(credentials);
    return accountConfirmation;
  };

  unsubscribe = async (accountId: string) => {
    const collection = await this.getCollection();
    await ServiceHandler.event({
      source: "auth",
      name: "user-unsubscribed",
      details: {
        accountId: accountId,
      },
    });
    return {
      result: await collection.deleteOne({ accountId }),
    };
  };

  authenticate = async (credentials: Credentials): Promise<Authorization> => {
    const collection = await this.getCollection();
    const savedAuth = await collection.findOne({
      username: credentials.username,
    });
    const authenticated = await bcryptCompare(
      credentials.password,
      savedAuth?.password
    );
    if (!authenticated)
      throw { message: "Unauthorized", status: HttpStatusCode.Unauthorized };
    return {
      authenticated,
      token: jwt.sign(credentials, process.env.APP_SECRET || "local-secret"),
    };
  };

  isAuthenticated = async () => {};

  logOut = async () => {};

  getUserPolicy = async (accountId: string) => {
    const collection = await this.getCollection();
    const savedAuth = await collection.findOne({
      accountId,
    });
    if (!savedAuth)
      throw { message: "Item not found", status: HttpStatusCode.NotFound };
    return {
      userPolicy: savedAuth?.userPolicy,
    };
  };

  setUserPolicy = async (accountId: string, userPolicy: UserPolicy) => {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { accountId },
      { $set: this.convertToUpdateDocument(userPolicy) }
    );
    return {
      result,
    };
  };

  private isDuplicated = async (username: string) => {
    const collection = await this.getCollection();
    const searchResults = await collection.find({ username }).toArray();
    return searchResults.length > 0;
  };

  private connect = async (): Promise<Db> => {
    if (!this.db) {
      const client = await MongoClient.connect(
        process.env.DB_URL || "mongodb://127.0.0.1:27017/nutrition-app"
      );
      this.db = client.db();
    }
    return this.db;
  };

  static getInstance = (): AuthService => {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService("AuthService", new AuthInfo());
    }
    return AuthService.instance;
  };

  private getCollection = async (): Promise<Collection> => {
    while (!this.db) {
      await this.connect();
    }
    return this.db.collection("auth");
  };

  override create = async (properties: ObjectInfo): Promise<Confirmation> => {
    const collection = await this.getCollection();
    return { result: await collection.insertOne(properties) };
  };

  override batchCreate = async (
    properties: Array<ObjectInfo>
  ): Promise<Confirmation> => {
    const collection = await this.getCollection();
    return { result: await collection.insertMany(properties) };
  };

  override read = async (id: any): Promise<Confirmation> => {
    const collection = await this.getCollection();
    return { result: await collection.findOne({ _id: new ObjectId(id) }) };
  };

  override batchRead = async (ids: Array<any>): Promise<Confirmation> => {
    const collection = await this.getCollection();
    ids = ids.map((e) => new ObjectId(e));
    return { results: await collection.find({ _id: { $in: ids } }).toArray() };
  };

  override list = async (): Promise<Confirmation> => {
    const collection = await this.getCollection();
    return { results: await collection.find({}).toArray() };
  };

  override update = async (update: ObjectInfo): Promise<Confirmation> => {
    const collection = await this.getCollection();
    const id = new ObjectId(update._id);
    update = this.convertToUpdateDocument(update);
    const query = { _id: id };

    return { result: await collection.updateOne(query, { $set: update }) };
  };

  override batchUpdate = async (batch: Array<ObjectInfo>): Promise<any> => {
    const collection = await this.getCollection();
    const bulkOps = batch.map((e) => ({
      updateOne: {
        filter: { _id: new ObjectId(e._id) },
        update: { $set: this.convertToUpdateDocument(e) },
      },
    }));
    return { results: await collection.bulkWrite(bulkOps) };
  };

  override delete = async (id: any): Promise<unknown> => {
    const originalCollection = await this.getCollection();
    return {
      result: await originalCollection.deleteOne({ _id: new ObjectId(id) }),
    };
  };

  override batchDelete = async (ids: Array<any>): Promise<unknown> => {
    const originalCollection = await this.getCollection();
    ids = ids.map((e) => new ObjectId(e));
    return {
      result: await originalCollection.deleteMany({
        _id: { $in: ids.map((e) => new ObjectId(e)) },
      }),
    };
  };

  listen = async (event: AppEvent): Promise<any> => {
    const eventName = event.name;
    switch (eventName) {
      default: {
        throw {
          message: "Not subscribed to this event",
          status: HttpStatusCode.NotImplemented,
        };
      }
    }
  };

  private convertToUpdateDocument = (
    properties: any
  ): Record<string, unknown> => {
    const updateDocument: Record<string, unknown> = {};
    delete properties._id;

    const buildDotNotation = (
      obj: Record<string, unknown>,
      currentKey = ""
    ) => {
      for (const key in obj) {
        const newKey = currentKey ? `${currentKey}.${key}` : key;
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          buildDotNotation(obj[key] as Record<string, unknown>, newKey);
        } else {
          updateDocument[newKey] = obj[key];
        }
      }
    };

    buildDotNotation(properties);

    return updateDocument;
  };
}
