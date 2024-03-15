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
var _MealController_meal;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealController = void 0;
const service_1 = require("./service");
const app_types_1 = require("../../../shared/app-types");
class MealController extends app_types_1.AppObjectController {
    constructor() {
        const mealSchema = { mealName: "string" };
        const mealService = new service_1.MealService("meal", mealSchema);
        super(mealService);
        _MealController_meal.set(this, void 0);
        this.listen = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const event = app_types_1.AppEvent.passthrough().parse(req.body);
                yield __classPrivateFieldGet(this, _MealController_meal, "f").listen(event);
                const appResponse = new app_types_1.AppResponse({ message: "Confirmed" }, req, res, app_types_1.HttpStatusCode.Accepted);
                appResponse.end();
            }
            catch (error) {
                const appError = new app_types_1.AppError(error, req, res);
                appError.end();
            }
        });
        __classPrivateFieldSet(this, _MealController_meal, mealService, "f");
    }
}
exports.MealController = MealController;
_MealController_meal = new WeakMap();
MealController.instance = null;
MealController.getInstance = () => {
    if (!MealController.instance) {
        MealController.instance = new MealController();
    }
    return MealController.instance;
};
//# sourceMappingURL=controller.js.map