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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppObject = exports.AppRecord = exports.AppId = exports.ObjectInfo = void 0;
const service_handler_1 = require("../service-handler");
const zod_1 = require("zod");
exports.ObjectInfo = zod_1.z.record(zod_1.z.string(), zod_1.z.any());
exports.AppId = zod_1.z.string().min(1);
exports.AppRecord = zod_1.z.record(zod_1.z.string(), zod_1.z.any());
class AppObject extends Object {
    constructor(name, schema, value = undefined) {
        super(value);
        this.create = (properties, ...args) => __awaiter(this, void 0, void 0, function* () {
            const record = yield service_handler_1.ServiceHandler.post("/database/create/", "database", {
                properties,
                name: this.name,
            });
            return record;
        });
        this.batchCreate = (objects, ...args) => __awaiter(this, void 0, void 0, function* () {
            const name = this.name;
            objects = objects.map((e) => {
                return { name, properties: e.properties };
            });
            const confirmation = yield service_handler_1.ServiceHandler.post("/database/create/batch", "database", objects);
            return confirmation;
        });
        this.read = (id, ...args) => __awaiter(this, void 0, void 0, function* () {
            const confirmation = yield service_handler_1.ServiceHandler.post("/database/read/" + this.name, "database", { id });
            return confirmation;
        });
        this.list = (...args) => __awaiter(this, void 0, void 0, function* () {
            const result = yield service_handler_1.ServiceHandler.get("/database/list/" + this.name, "database");
            return result;
        });
        this.batchRead = (ids, ...args) => __awaiter(this, void 0, void 0, function* () {
            const batch = yield service_handler_1.ServiceHandler.post("/database/read/batch/" + this.name, "database", { ids });
            return batch;
        });
        this.update = (update, ...args) => __awaiter(this, void 0, void 0, function* () {
            const confirmation = yield service_handler_1.ServiceHandler.patch("/database/update", "database", update);
            return confirmation;
        });
        this.batchUpdate = (batch, ...args) => __awaiter(this, void 0, void 0, function* () {
            const name = this.name;
            batch = batch.map((e) => {
                return Object.assign({ name }, e);
            });
            const results = [];
            const result = service_handler_1.ServiceHandler.patch("/database/update/batch", "database", batch);
            results.push(result);
            return yield Promise.all(results);
        });
        this.delete = (id, ...args) => __awaiter(this, void 0, void 0, function* () {
            const result = yield service_handler_1.ServiceHandler.delete("/database/delete/" + this.name, "database", { id });
            return result;
        });
        this.batchDelete = (ids, ...args) => __awaiter(this, void 0, void 0, function* () {
            const batch = yield service_handler_1.ServiceHandler.delete("/database/delete/batch/" + this.name, "database", { ids });
            return batch;
        });
        this.schema = schema;
        this.name = name;
    }
}
exports.AppObject = AppObject;
//# sourceMappingURL=AppObject.js.map