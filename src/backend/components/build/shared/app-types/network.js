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
exports.Credentials = exports.Authorization = exports.TokenType = exports.Confirmation = exports.AppClient = exports.AppResponse = exports.NetworkEvent = exports.AppEvent = exports.HttpStatusCode = void 0;
const service_handler_1 = require("../service-handler");
const http_client_1 = require("../http-client");
Object.defineProperty(exports, "HttpStatusCode", { enumerable: true, get: function () { return http_client_1.HttpStatusCode; } });
const circular_json_1 = __importDefault(require("circular-json"));
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
dotenv_1.default.config();
var service_handler_2 = require("../service-handler");
Object.defineProperty(exports, "AppEvent", { enumerable: true, get: function () { return service_handler_2.AppEvent; } });
class NetworkEvent {
}
exports.NetworkEvent = NetworkEvent;
class AppResponse extends Response {
    constructor(data, req, res, status) {
        super();
        this.log = () => __awaiter(this, void 0, void 0, function* () {
            const data = circular_json_1.default.stringify(this);
            service_handler_1.ServiceHandler.post("/database/create", "database", Object.assign({ name: "log" }, JSON.parse(data)));
        });
        this.send = () => __awaiter(this, void 0, void 0, function* () {
            this._res.status(this._status).send(this._data);
        });
        this.end = () => __awaiter(this, void 0, void 0, function* () {
            this.log();
            this.send();
        });
        this._req = req;
        this._res = res;
        this._status = status;
        this._data = data;
    }
}
exports.AppResponse = AppResponse;
class AppClient {
}
exports.AppClient = AppClient;
exports.Confirmation = zod_1.z.object({
    result: zod_1.z.any().optional(),
    results: zod_1.z.array(zod_1.z.any()).optional(),
    total: zod_1.z.number().optional(),
});
var TokenType;
(function (TokenType) {
    TokenType["authorization"] = "Bearer";
})(TokenType || (exports.TokenType = TokenType = {}));
exports.Authorization = zod_1.z.object({
    authorized: zod_1.z.boolean().nullable().optional(),
    authenticated: zod_1.z.boolean().nullable(),
    token: zod_1.z.string().optional(),
    tokenType: zod_1.z.nativeEnum(TokenType).optional(),
});
exports.Credentials = zod_1.z.object({
    username: zod_1.z.string().min(1),
    password: zod_1.z.string().min(1),
    accountId: zod_1.z.string().optional(),
});
//# sourceMappingURL=network.js.map