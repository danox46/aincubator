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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DatabaseController_database;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const service_1 = require("./service");
const app_types_1 = require("../../../shared/app-types");
class DatabaseController extends app_types_1.AppObjectController {
    constructor() {
        const dbInstace = service_1.DatabaseService.getInstance();
        super(dbInstace);
        _DatabaseController_database.set(this, void 0);
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const properties = req.body;
                const confirmation = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").create(properties);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.batchCreate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyArray = req.body
                    .items;
                const confirmation = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").batchCreate(propertyArray);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const { name } = req.params;
                if (!name)
                    throw { status: 400, message: "no collection name provided" };
                const accountInfo = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").read(id, name);
                const appResponse = new app_types_1.AppResponse(accountInfo, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const name = req.params.name;
                if (!name)
                    throw { status: 400, message: "no collection name provided" };
                const accountsInfo = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").list(name);
                const appResponse = new app_types_1.AppResponse(accountsInfo, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                const { query } = req.body;
                if (!name || !query)
                    throw { status: 400, message: "no collection name or query provided" };
                const searchInfo = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").search(name, query);
                const appResponse = new app_types_1.AppResponse(searchInfo, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.batchRead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.params;
                if (!name)
                    throw { status: 400, message: "no collection name provided" };
                const body = req.body.ids;
                const accountsInfo = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").batchRead(body, name);
                const appResponse = new app_types_1.AppResponse(accountsInfo, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = req.body;
                const confirmation = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").update(updates);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.upsert = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { upsert, identifier } = req.body;
                const confirmation = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").upsert(identifier, upsert);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.batchUpdate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const properties = req.body.items;
                const confirmation = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").batchUpdate(properties);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body;
                const { name } = req.params;
                if (!name)
                    throw { status: 400, message: "no collection name provided" };
                const deleted = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").delete(id, name);
                const appResponse = new app_types_1.AppResponse(deleted, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.batchDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body.ids;
                const { name } = req.params;
                if (!name)
                    throw { status: 400, message: "no collection name provided" };
                const deletedItems = yield __classPrivateFieldGet(this, _DatabaseController_database, "f").batchDelete(body, name);
                const appResponse = new app_types_1.AppResponse(deletedItems, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.listen = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = req.body;
                __classPrivateFieldGet(this, _DatabaseController_database, "f").listen(event);
                const appResponse = new app_types_1.AppResponse({ message: "Confirmed" }, req, res, app_types_1.HttpStatusCode.Accepted);
                appResponse.end();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.end();
            }
        });
        __classPrivateFieldSet(this, _DatabaseController_database, dbInstace, "f");
    }
}
exports.DatabaseController = DatabaseController;
_DatabaseController_database = new WeakMap();
DatabaseController.instance = null;
DatabaseController.getInstance = () => {
    if (!DatabaseController.instance) {
        DatabaseController.instance = new DatabaseController();
    }
    return DatabaseController.instance;
};
//# sourceMappingURL=controller.js.map