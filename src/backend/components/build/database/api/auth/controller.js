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
var _AuthController_auth;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const service_1 = require("./service");
const app_types_1 = require("../../../shared/app-types");
class AuthController extends app_types_1.AppObjectController {
    constructor() {
        const dbInstace = service_1.AuthService.getInstance();
        super(dbInstace);
        _AuthController_auth.set(this, void 0);
        this.subscribe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = app_types_1.Credentials.parse(req.body.credentials);
                const accountInfo = app_types_1.AccountInfo.parse(req.body.accountInfo);
                const confirmation = yield __classPrivateFieldGet(this, _AuthController_auth, "f").subscribe(credentials, accountInfo);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.unsubscribe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = app_types_1.AppId.parse(req.body.accountId);
                const confirmation = yield __classPrivateFieldGet(this, _AuthController_auth, "f").unsubscribe(accountId);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.authenticate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credentials = app_types_1.Credentials.parse(req.body.credentials);
                const confirmation = yield __classPrivateFieldGet(this, _AuthController_auth, "f").authenticate(credentials);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.getUserPolicy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = app_types_1.AppId.parse(req.params.accountId);
                const confirmation = yield __classPrivateFieldGet(this, _AuthController_auth, "f").getUserPolicy(accountId);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Ok);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.setUserPolicy = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = app_types_1.AppId.parse(req.params.accountId);
                const userPolicy = app_types_1.UserPolicy.parse(req.body.userPolicy);
                const confirmation = yield __classPrivateFieldGet(this, _AuthController_auth, "f").setUserPolicy(accountId, userPolicy);
                const appResponse = new app_types_1.AppResponse(confirmation, req, res, app_types_1.HttpStatusCode.Created);
                appResponse.send();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.send();
            }
        });
        this.listen = (req, res, ...args) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = app_types_1.AppEvent.parse(req.body);
                __classPrivateFieldGet(this, _AuthController_auth, "f").listen(event);
                const appResponse = new app_types_1.AppResponse({ message: "Confirmed" }, req, res, app_types_1.HttpStatusCode.Accepted);
                appResponse.end();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.end();
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.batchCreate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.read = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.list = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.batchRead = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.batchUpdate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        this.batchDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const appError = new app_types_1.AppError({ message: "This is a private method", status: app_types_1.HttpStatusCode.Forbidden }, req, res);
            appError.send();
        });
        __classPrivateFieldSet(this, _AuthController_auth, dbInstace, "f");
    }
}
exports.AuthController = AuthController;
_AuthController_auth = new WeakMap();
AuthController.instance = null;
AuthController.getInstance = () => {
    if (!AuthController.instance) {
        AuthController.instance = new AuthController();
    }
    return AuthController.instance;
};
//# sourceMappingURL=controller.js.map