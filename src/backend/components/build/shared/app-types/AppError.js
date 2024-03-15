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
exports.AppError = void 0;
const network_1 = require("./network");
const circular_json_1 = __importDefault(require("circular-json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const service_handler_1 = require("../service-handler");
const mongodb_1 = require("mongodb");
class AppError extends Error {
    constructor(error, req, res, status = network_1.HttpStatusCode.InternalServerError) {
        var _a, _b, _c, _d, _e;
        let message = undefined;
        if (Array.isArray(error) || error.name === "ZodError") {
            const zodError = error;
            message = JSON.stringify(zodError.issues);
        }
        if (!message)
            message =
                ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.error) || // App error
                    ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) ||
                    ((_c = error.response) === null || _c === void 0 ? void 0 : _c.body) ||
                    error.message || // Axios Error
                    "Unknow Error";
        super(message);
        this._status = network_1.HttpStatusCode.InternalServerError;
        this.log = () => __awaiter(this, void 0, void 0, function* () {
            let data = circular_json_1.default.stringify(this);
            service_handler_1.ServiceHandler.post("/database/create", "database", Object.assign({ name: "log" }, JSON.parse(data)));
        });
        this.send = () => __awaiter(this, void 0, void 0, function* () {
            this._res.status(this._status).send({ error: this.message });
        });
        this.end = () => __awaiter(this, void 0, void 0, function* () {
            this.log();
            this.send();
        });
        this.message = message || "Unknow Error";
        this._req = req;
        this._res = res;
        if (error instanceof mongodb_1.MongoAPIError || error instanceof mongodb_1.MongoError) {
            if (message === null || message === void 0 ? void 0 : message.toLowerCase().includes("empty"))
                this._status = network_1.HttpStatusCode.NotFound;
            if (this._status)
                return;
        }
        this._status =
            Array.isArray(error) || error.name === "ZodError"
                ? 400
                : error.status ||
                    ((_d = error.response) === null || _d === void 0 ? void 0 : _d.status) ||
                    ((_e = error.response) === null || _e === void 0 ? void 0 : _e.statusCode) ||
                    status;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map