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
exports.InstructionService = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const app_types_1 = require("../../../shared/app-types");
const shared_1 = require("../../../shared");
const employee_1 = require("../../../shared/app-types/employee");
dotenv_1.default.config();
class InstructionService {
    constructor() {
        this.startProject = (projectPrameters = {
            mainIdea: "A chain restaurat with a simple cheap and convenient menu",
        }) => __awaiter(this, void 0, void 0, function* () {
            //start role definition
            const ceo = new employee_1.Employee("ceo");
            const cto = new employee_1.Employee("cto");
            const coo = new employee_1.Employee("coo");
            const cfo = new employee_1.Employee("cfo");
            const cmo = new employee_1.Employee("cmo");
            const cso = new employee_1.Employee("cso");
            const cpo = new employee_1.Employee("cpo");
            const staff = {
                ceo,
                cto,
                coo,
                cfo,
                cmo,
                cso,
                cpo,
            };
            for (const member in staff) {
                if (Object.prototype.hasOwnProperty.call(staff, member)) {
                    const current = staff[member];
                    const deliverables = yield current.do(staff, projectPrameters);
                    yield Promise.all(deliverables.map((data) => __awaiter(this, void 0, void 0, function* () {
                        return yield shared_1.ServiceHandler.post("/database/create", "database", {
                            name: "deliverable",
                            data,
                        });
                    })));
                }
            }
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
exports.InstructionService = InstructionService;
//# sourceMappingURL=service.js.map