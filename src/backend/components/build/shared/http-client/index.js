"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.HttpStatusCode = void 0;
const axios_1 = __importStar(require("axios"));
Object.defineProperty(exports, "HttpStatusCode", { enumerable: true, get: function () { return axios_1.HttpStatusCode; } });
const config_1 = __importDefault(require("../config"));
class HttpClient {
}
exports.HttpClient = HttpClient;
_a = HttpClient;
HttpClient.retry = (config, retriesLeft = config_1.default.maxRetries, interval = config_1.default.retryInterval) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, axios_1.default)(config);
        return response.data;
    }
    catch (error) {
        if (retriesLeft > 0) {
            console.log("error:", error);
            yield new Promise((resolve) => setTimeout(resolve, interval));
            return _a.retry(config, retriesLeft - 1, interval * 2);
        }
        throw error;
    }
});
HttpClient.get = (url, headers, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield _a.retry({
        method: "get",
        url,
        headers,
    });
    return response;
});
HttpClient.post = (url, data, headers, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield _a.retry({
        method: "post",
        url,
        data,
        headers,
    });
    return response;
});
HttpClient.patch = (url, data, headers, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield _a.retry({
        method: "patch",
        url,
        data,
        headers,
    });
    return response;
});
HttpClient.delete = (url, data, headers, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield _a.retry({
        method: "delete",
        url,
        data,
        headers,
    });
    return response;
});
HttpClient.put = (url, data, headers, ...args) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield _a.retry({
        method: "put",
        url,
        data,
        headers,
    });
    return response;
});
//# sourceMappingURL=index.js.map