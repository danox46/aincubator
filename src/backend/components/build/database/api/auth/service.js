"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthInfo = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
const util_1 = require("util");
const app_types_1 = require("../../../shared/app-types");
const service_handler_1 = require("../../../shared/service-handler");
const bcryptHash = (0, util_1.promisify)(bcrypt_1.hash);
const bcryptCompare = (0, util_1.promisify)(bcrypt_1.compare);
class AuthInfo {
}
exports.AuthInfo = AuthInfo;
class AuthService extends app_types_1.AppObject {
    constructor(name, schema, value) {
        super(name, schema, value);
        this.db = null;
        this.subscribe = (credentials, accountInfo) => __awaiter(this, void 0, void 0, function* () {
            if (yield this.isDuplicated(credentials.username))
                throw { message: "duplicated username", status: app_types_1.HttpStatusCode.Conflict };
            const hashedPassword = yield bcryptHash(credentials.password, 12);
            credentials.password = hashedPassword;
            const accountConfirmation = (yield service_handler_1.ServiceHandler.post("/account/create", "account", { properties: accountInfo }));
            credentials.accountId = accountConfirmation.result.insertedId;
            if (!credentials.userPolicy)
                credentials.userPolicy = {
                    paymentPlan: app_types_1.PaymentPlan.Free,
                    userRole: app_types_1.UserRole.Standard,
                };
            yield this.create(credentials);
            return accountConfirmation;
        });
        this.unsubscribe = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            yield service_handler_1.ServiceHandler.event({
                source: "auth",
                name: "user-unsubscribed",
                details: {
                    accountId: accountId,
                },
            });
            return {
                result: yield collection.deleteOne({ accountId }),
            };
        });
        this.authenticate = (credentials) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const savedAuth = yield collection.findOne({
                username: credentials.username,
            });
            const authenticated = yield bcryptCompare(credentials.password, savedAuth === null || savedAuth === void 0 ? void 0 : savedAuth.password);
            if (!authenticated)
                throw { message: "Unauthorized", status: app_types_1.HttpStatusCode.Unauthorized };
            return {
                authenticated,
                token: jsonwebtoken_1.default.sign(credentials, process.env.APP_SECRET || "local-secret"),
            };
        });
        this.isAuthenticated = () => __awaiter(this, void 0, void 0, function* () { });
        this.logOut = () => __awaiter(this, void 0, void 0, function* () { });
        this.getUserPolicy = (accountId) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const savedAuth = yield collection.findOne({
                accountId,
            });
            if (!savedAuth)
                throw { message: "Item not found", status: app_types_1.HttpStatusCode.NotFound };
            return {
                userPolicy: savedAuth === null || savedAuth === void 0 ? void 0 : savedAuth.userPolicy,
            };
        });
        this.setUserPolicy = (accountId, userPolicy) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const result = yield collection.updateOne({ accountId }, { $set: this.convertToUpdateDocument(userPolicy) });
            return {
                result,
            };
        });
        this.isDuplicated = (username) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const searchResults = yield collection.find({ username }).toArray();
            return searchResults.length > 0;
        });
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.db) {
                const client = yield mongodb_1.MongoClient.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/nutrition-app");
                this.db = client.db();
            }
            return this.db;
        });
        this.getCollection = () => __awaiter(this, void 0, void 0, function* () {
            while (!this.db) {
                yield this.connect();
            }
            return this.db.collection("auth");
        });
        this.create = (properties) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            return { result: yield collection.insertOne(properties) };
        });
        this.batchCreate = (properties) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            return { result: yield collection.insertMany(properties) };
        });
        this.read = (id) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            return { result: yield collection.findOne({ _id: new mongodb_1.ObjectId(id) }) };
        });
        this.batchRead = (ids) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            ids = ids.map((e) => new mongodb_1.ObjectId(e));
            return { results: yield collection.find({ _id: { $in: ids } }).toArray() };
        });
        this.list = () => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            return { results: yield collection.find({}).toArray() };
        });
        this.update = (update) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const id = new mongodb_1.ObjectId(update._id);
            update = this.convertToUpdateDocument(update);
            const query = { _id: id };
            return { result: yield collection.updateOne(query, { $set: update }) };
        });
        this.batchUpdate = (batch) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const bulkOps = batch.map((e) => ({
                updateOne: {
                    filter: { _id: new mongodb_1.ObjectId(e._id) },
                    update: { $set: this.convertToUpdateDocument(e) },
                },
            }));
            return { results: yield collection.bulkWrite(bulkOps) };
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            const originalCollection = yield this.getCollection();
            return {
                result: yield originalCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }),
            };
        });
        this.batchDelete = (ids) => __awaiter(this, void 0, void 0, function* () {
            const originalCollection = yield this.getCollection();
            ids = ids.map((e) => new mongodb_1.ObjectId(e));
            return {
                result: yield originalCollection.deleteMany({
                    _id: { $in: ids.map((e) => new mongodb_1.ObjectId(e)) },
                }),
            };
        });
        this.listen = (event) => __awaiter(this, void 0, void 0, function* () {
            const eventName = event.name;
            switch (eventName) {
                default: {
                    throw {
                        message: "Not subscribed to this event",
                        status: app_types_1.HttpStatusCode.NotImplemented,
                    };
                }
            }
        });
        this.convertToUpdateDocument = (properties) => {
            const updateDocument = {};
            delete properties._id;
            const buildDotNotation = (obj, currentKey = "") => {
                for (const key in obj) {
                    const newKey = currentKey ? `${currentKey}.${key}` : key;
                    if (typeof obj[key] === "object" &&
                        obj[key] !== null &&
                        !Array.isArray(obj[key])) {
                        buildDotNotation(obj[key], newKey);
                    }
                    else {
                        updateDocument[newKey] = obj[key];
                    }
                }
            };
            buildDotNotation(properties);
            return updateDocument;
        };
        this.connect();
    }
}
exports.AuthService = AuthService;
AuthService.instance = null;
AuthService.getInstance = () => {
    if (!AuthService.instance) {
        AuthService.instance = new AuthService("AuthService", new AuthInfo());
    }
    return AuthService.instance;
};
//# sourceMappingURL=service.js.map