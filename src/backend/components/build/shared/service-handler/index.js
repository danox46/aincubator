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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHandler = exports.AppEvent = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const http_client_1 = require("../http-client");
const zod_1 = require("zod");
dotenv_1.default.config();
const servicesInfo = {
    database: {
        port: 3000,
    },
    dron: {
        port: 3005,
    },
};
exports.AppEvent = zod_1.z.object({
    source: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    details: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
});
class ServiceHandler extends (_b = http_client_1.HttpClient) {
    static patch(endpoint, serviceName, update) {
        const _super = Object.create(null, {
            patch: { get: () => super.patch }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const url = _a.getServiceUrl(serviceName);
            update = _a.setData(update);
            const result = yield _super.patch.call(this, url + endpoint, update);
            return result;
        });
    }
    static delete(endpoint, serviceName, ids) {
        const _super = Object.create(null, {
            delete: { get: () => super.delete }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const url = _a.getServiceUrl(serviceName);
            ids = _a.setData(ids);
            const result = yield _super.delete.call(this, url + endpoint, ids);
            return result;
        });
    }
}
exports.ServiceHandler = ServiceHandler;
_a = ServiceHandler;
ServiceHandler.get = (endpoint, serviceName) => __awaiter(void 0, void 0, void 0, function* () {
    const url = _a.getServiceUrl(serviceName);
    const result = yield Reflect.get(_b, "get", _a).call(_a, url + endpoint);
    return result;
});
ServiceHandler.post = (endpoint, serviceName, data) => __awaiter(void 0, void 0, void 0, function* () {
    const url = _a.getServiceUrl(serviceName);
    data = _a.setData(data);
    const result = yield Reflect.get(_b, "post", _a).call(_a, url + endpoint, data);
    return result;
});
ServiceHandler.put = (endpoint, serviceName, update) => __awaiter(void 0, void 0, void 0, function* () {
    const url = _a.getServiceUrl(serviceName);
    update = _a.setData(update);
    const result = yield Reflect.get(_b, "put", _a).call(_a, url + endpoint, update);
    return result;
});
ServiceHandler.event = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const subscribers = yield _a.post("/database/search/event-subscription", "database", {
        query: { eventName: event.name },
    });
    if (!(subscribers === null || subscribers === void 0 ? void 0 : subscribers.results))
        return;
    const postPromises = subscribers.results.map((e) => {
        return _a.post("/" + e.serivce + "/event", e.serivce, event);
    });
    return yield Promise.all(postPromises);
});
ServiceHandler.subscribeToEvent = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    subscription.name = "event-subscription";
    subscription.subscriptionId =
        subscription.eventName + "-to-" + subscription.serivce;
    _a.put("/database/upsert", "database", {
        upsert: subscription,
        identifier: "subscriptionId",
    });
});
ServiceHandler.getServiceUrl = (serviceName) => {
    const env = process.env.ENV;
    return env === "prod" || env === "dev"
        ? `https://${serviceName}-dot-nutrition-app-410700.uc.r.appspot.com/`
        : `http://localhost:${servicesInfo[serviceName].port}`;
};
ServiceHandler.setData = (data) => {
    data = typeof data === "string" ? JSON.parse(data) : data;
    data = Array.isArray(data) ? { items: data } : data;
    return data;
};
//# sourceMappingURL=index.js.map