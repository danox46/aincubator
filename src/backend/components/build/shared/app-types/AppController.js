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
exports.AppObjectController = exports.AppController = void 0;
const AppObject_1 = require("./AppObject");
const network_1 = require("./network");
const http_client_1 = require("../http-client");
const AppError_1 = require("./AppError");
class AppController {
    constructor(serice) {
        this._service = serice;
    }
}
exports.AppController = AppController;
class AppObjectController extends AppController {
    constructor(serice) {
        super(serice);
        this.create = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const properties = AppObject_1.ObjectInfo.parse(req.body.properties);
                const confirmation = yield this._service.create(properties);
                const appResponse = new network_1.AppResponse(confirmation, req, res, http_client_1.HttpStatusCode.Created);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.batchCreate = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyArray = AppObject_1.ObjectInfo.array()
                    .nonempty()
                    .parse(req.body.items);
                const confirmation = yield this._service.batchCreate(propertyArray);
                const appResponse = new network_1.AppResponse(confirmation, req, res, http_client_1.HttpStatusCode.Created);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.read = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = AppObject_1.AppId.parse(req.body._id);
                const accountInfo = yield this._service.read(id);
                const appResponse = new network_1.AppResponse(accountInfo, req, res, http_client_1.HttpStatusCode.Ok);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.list = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accountsInfo = yield this._service.list();
                const appResponse = new network_1.AppResponse(accountsInfo, req, res, http_client_1.HttpStatusCode.Ok);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.batchRead = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idArray = AppObject_1.AppId.array()
                    .nonempty()
                    .parse(req.body.items);
                const accountsInfo = yield this._service.batchRead(idArray);
                const appResponse = new network_1.AppResponse(accountsInfo, req, res, http_client_1.HttpStatusCode.Ok);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.update = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updates = AppObject_1.ObjectInfo.parse(req.body);
                AppObject_1.AppId.parse(updates._id);
                AppObject_1.AppRecord.parse(updates.properties);
                const confirmation = yield this._service.update(updates);
                const appResponse = new network_1.AppResponse(confirmation, req, res, http_client_1.HttpStatusCode.Created);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.batchUpdate = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const propertyArray = AppObject_1.ObjectInfo.array()
                    .nonempty()
                    .parse(req.body.items);
                const confirmation = yield this._service.batchUpdate(propertyArray);
                const appResponse = new network_1.AppResponse(confirmation, req, res, http_client_1.HttpStatusCode.Created);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.delete = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = AppObject_1.AppId.parse(req.body._id);
                const deleted = yield this._service.delete(id);
                const appResponse = new network_1.AppResponse(deleted, req, res, http_client_1.HttpStatusCode.Ok);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.batchDelete = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const idArray = AppObject_1.AppId.array()
                    .nonempty()
                    .parse(req.body.items);
                const deletedItems = yield this._service.batchDelete(idArray);
                const appResponse = new network_1.AppResponse(deletedItems, req, res, http_client_1.HttpStatusCode.Ok);
                appResponse.end();
            }
            catch (error) {
                const appError = new AppError_1.AppError(error, req, res);
                appError.end();
            }
        });
    }
}
exports.AppObjectController = AppObjectController;
//# sourceMappingURL=AppController.js.map