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
exports.GoalService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_types_1 = require("../../../shared/app-types");
dotenv_1.default.config();
class GoalService extends app_types_1.AppObject {
    constructor(name, schema, value) {
        super(name, schema, value);
        this.takeMesurement = () => __awaiter(this, void 0, void 0, function* () { });
        this.sendNotification = () => __awaiter(this, void 0, void 0, function* () { });
        this.goalReached = () => __awaiter(this, void 0, void 0, function* () { });
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
exports.GoalService = GoalService;
//# sourceMappingURL=service.js.map