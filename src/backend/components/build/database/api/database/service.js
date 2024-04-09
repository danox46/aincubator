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
exports.DatabaseService = exports.DatabaseInfo = void 0;
const mongodb_1 = require("mongodb");
const app_types_1 = require("../../../shared/app-types");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DatabaseInfo {
}
exports.DatabaseInfo = DatabaseInfo;
class DatabaseService extends app_types_1.AppObject {
    constructor(name, schema, value) {
        super(name, schema, value);
        this.db = null;
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.db) {
                const client = yield mongodb_1.MongoClient.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/test");
                this.db = client.db();
            }
            return this.db;
        });
        this.getCollection = (collectionName = "unknown") => __awaiter(this, void 0, void 0, function* () {
            while (!this.db) {
                yield this.connect();
            }
            return this.db.collection(collectionName);
        });
        this.create = (properties) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(properties.name);
            return { result: yield collection.insertOne(properties) };
        });
        this.batchCreate = (properties) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(properties[0].name);
            return { result: yield collection.insertMany(properties) };
        });
        this.read = (id, collectionName) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(collectionName);
            const result = yield collection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!result)
                throw { message: "Record not found", status: app_types_1.HttpStatusCode.NotFound };
            return { result };
        });
        this.batchRead = (ids, collectionName) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(collectionName);
            ids = ids.map((e) => new mongodb_1.ObjectId(e));
            const foundItems = yield collection.find({ _id: { $in: ids } }).toArray();
            const results = ids.map((id) => foundItems.find((e) => e._id.toString() === id.toString()) || {
                _id: id,
                error: "Item Not found",
            });
            return { results };
        });
        this.list = (collectionName) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(collectionName);
            return { results: yield collection.find({}).toArray() };
        });
        this.search = (collectionName, query) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(collectionName);
            return {
                results: yield collection.find(query).toArray(),
            };
        });
        this.update = (update) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(update.name);
            const id = new mongodb_1.ObjectId(update._id);
            update = this.convertToUpdateDocument(update);
            const query = { _id: id };
            const result = yield collection.updateOne(query, { $set: update });
            if (result.matchedCount === 0)
                throw { message: "Record not found", status: app_types_1.HttpStatusCode.NotFound };
            return { result };
        });
        this.upsert = (identifier, upsert) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(upsert.name);
            const options = { upsert: true };
            const updateDocument = { $set: upsert };
            return {
                result: yield collection.updateOne({ [identifier]: upsert[identifier] }, updateDocument, options),
            };
        });
        this.batchUpdate = (batch) => __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection(batch[0].name);
            const bulkOps = batch.map((e) => ({
                updateOne: {
                    filter: { _id: new mongodb_1.ObjectId(e._id) },
                    update: { $set: this.convertToUpdateDocument(e) },
                },
            }));
            return { result: yield collection.bulkWrite(bulkOps) };
        });
        this.delete = (id, collectionName) => __awaiter(this, void 0, void 0, function* () {
            const originalCollection = yield this.getCollection(collectionName);
            const archivedCollectionName = "archived-" + collectionName;
            const archivedCollection = yield this.getCollection(archivedCollectionName);
            const document = yield originalCollection.findOne({
                _id: new mongodb_1.ObjectId(id),
            });
            if (document)
                yield archivedCollection.insertOne(document);
            else
                throw {
                    message: "Can't find the document to archive",
                    status: app_types_1.HttpStatusCode.NotFound,
                };
            return {
                result: yield originalCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) }),
            };
        });
        this.batchDelete = (ids, collectionName) => __awaiter(this, void 0, void 0, function* () {
            const originalCollection = yield this.getCollection(collectionName);
            const archivedCollectionName = "archived-" + collectionName;
            const archivedCollection = yield this.getCollection(archivedCollectionName);
            ids = ids.map((e) => new mongodb_1.ObjectId(e));
            const documents = yield originalCollection
                .find({ _id: { $in: ids } })
                .toArray();
            yield archivedCollection.insertMany(documents);
            return {
                result: yield originalCollection.deleteMany({
                    _id: { $in: ids.map((e) => new mongodb_1.ObjectId(e)) },
                }),
            };
        });
        this.listen = (event) => __awaiter(this, void 0, void 0, function* () { });
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
exports.DatabaseService = DatabaseService;
DatabaseService.instance = null;
DatabaseService.getInstance = () => {
    if (!DatabaseService.instance) {
        DatabaseService.instance = new DatabaseService("DatabaseService", new DatabaseInfo());
    }
    return DatabaseService.instance;
};
//# sourceMappingURL=service.js.map