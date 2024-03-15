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
exports.GptService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_types_1 = require("../../../shared/app-types");
const shared_1 = require("../../../shared");
dotenv_1.default.config();
class GptService {
    constructor() {
        this.chat = (messages, model = "gpt-3.5-turbo-0125") => __awaiter(this, void 0, void 0, function* () {
            const completion = yield shared_1.HttpClient.post("https://api.openai.com/v1/chat/completions", {
                model,
                messages,
            }, {
                Authorization: `Bearer ${process.env.API_KEY}`,
            });
            console.log(completion);
            return completion;
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
    }
}
exports.GptService = GptService;
//# sourceMappingURL=service.js.map