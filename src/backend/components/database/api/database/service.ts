import { MongoClient, Db, Collection, ObjectId } from "mongodb";
import {
  AppObject,
  HttpStatusCode,
  Confirmation,
  AppEvent,
  ObjectInfo,
} from "../../../shared/app-types";
import dotenv from "dotenv";
dotenv.config();

export class DatabaseInfo implements ObjectInfo {}

export class DatabaseService extends AppObject {
  private static instance: DatabaseService | null = null;
  private db: Db | null = null;

  private constructor(name: string, schema: DatabaseInfo, value?: any) {
    super(name, schema, value);
    this.connect();
  }

  private connect = async (): Promise<Db> => {
    if (!this.db) {
      const client = await MongoClient.connect(
        process.env.DB_URL || "mongodb://127.0.0.1:27017/nutrition-app"
      );
      this.db = client.db();
    }
    return this.db;
  };

  static getInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(
        "DatabaseService",
        new DatabaseInfo()
      );
    }
    return DatabaseService.instance;
  };

  private getCollection = async (
    collectionName: string = "unknown"
  ): Promise<Collection> => {
    while (!this.db) {
      await this.connect();
    }
    return this.db.collection(collectionName);
  };

  override create = async (properties: ObjectInfo): Promise<Confirmation> => {
    const collection = await this.getCollection(properties.name);
    return { result: await collection.insertOne(properties) };
  };

  override batchCreate = async (
    properties: Array<ObjectInfo>
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(properties[0].name);
    return { result: await collection.insertMany(properties) };
  };

  override read = async (
    id: any,
    collectionName: string
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    if (!result)
      throw { message: "Record not found", status: HttpStatusCode.NotFound };
    return { result };
  };

  override batchRead = async (
    ids: Array<any>,
    collectionName: string
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(collectionName);
    ids = ids.map((e) => new ObjectId(e));
    const foundItems = await collection.find({ _id: { $in: ids } }).toArray();
    const results = ids.map(
      (id) =>
        foundItems.find((e) => e._id.toString() === id.toString()) || {
          _id: id,
          error: "Item Not found",
        }
    );
    return { results };
  };

  override list = async (collectionName: string): Promise<Confirmation> => {
    const collection = await this.getCollection(collectionName);
    return { results: await collection.find({}).toArray() };
  };

  search = async (
    collectionName: string,
    query: any
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(collectionName);
    return {
      results: await collection.find(query).toArray(),
    };
  };

  override update = async (update: ObjectInfo): Promise<Confirmation> => {
    const collection = await this.getCollection(update.name);
    const id = new ObjectId(update._id);
    update = this.convertToUpdateDocument(update);
    const query = { _id: id };
    const result = await collection.updateOne(query, { $set: update });
    if (result.matchedCount === 0)
      throw { message: "Record not found", status: HttpStatusCode.NotFound };
    return { result };
  };

  upsert = async (
    identifier: string,
    upsert: ObjectInfo
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(upsert.name);
    const options = { upsert: true };
    const updateDocument = { $set: upsert };
    return {
      result: await collection.updateOne(
        { [identifier]: upsert[identifier] },
        updateDocument,
        options
      ),
    };
  };

  override batchUpdate = async (
    batch: Array<ObjectInfo>
  ): Promise<Confirmation> => {
    const collection = await this.getCollection(batch[0].name);
    const bulkOps = batch.map((e) => ({
      updateOne: {
        filter: { _id: new ObjectId(e._id) },
        update: { $set: this.convertToUpdateDocument(e) },
      },
    }));
    return { result: await collection.bulkWrite(bulkOps) };
  };

  override delete = async (
    id: any,
    collectionName: string
  ): Promise<Confirmation> => {
    const originalCollection = await this.getCollection(collectionName);
    const archivedCollectionName = "archived-" + collectionName;
    const archivedCollection = await this.getCollection(archivedCollectionName);

    const document = await originalCollection.findOne({
      _id: new ObjectId(id),
    });

    if (document) await archivedCollection.insertOne(document);
    else
      throw {
        message: "Can't find the document to archive",
        status: HttpStatusCode.NotFound,
      };

    return {
      result: await originalCollection.deleteOne({ _id: new ObjectId(id) }),
    };
  };

  override batchDelete = async (
    ids: Array<any>,
    collectionName: string
  ): Promise<Confirmation> => {
    const originalCollection = await this.getCollection(collectionName);
    const archivedCollectionName = "archived-" + collectionName;
    const archivedCollection = await this.getCollection(archivedCollectionName);
    ids = ids.map((e) => new ObjectId(e));
    const documents = await originalCollection
      .find({ _id: { $in: ids } })
      .toArray();

    await archivedCollection.insertMany(documents);

    return {
      result: await originalCollection.deleteMany({
        _id: { $in: ids.map((e) => new ObjectId(e)) },
      }),
    };
  };

  listen = async (event: AppEvent): Promise<any> => {};

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
