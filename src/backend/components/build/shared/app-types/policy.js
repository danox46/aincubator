"use strict";
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
var _AppObjectPolicy_contentType, _AppObjectPolicy_paymentPlan, _AppUserPolicy_paymentPlan, _AppUserPolicy_userRole;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppUserPolicy = exports.UserPolicy = exports.AppObjectPolicy = exports.PaymentPlan = exports.UserRole = exports.ContentType = void 0;
const zod_1 = require("zod");
var ContentType;
(function (ContentType) {
    ContentType["Public"] = "public";
    ContentType["Draft"] = "draft";
    ContentType["Private"] = "private";
})(ContentType || (exports.ContentType = ContentType = {}));
var UserRole;
(function (UserRole) {
    UserRole["Standard"] = "standard";
    UserRole["Admin"] = "admin";
})(UserRole || (exports.UserRole = UserRole = {}));
var PaymentPlan;
(function (PaymentPlan) {
    PaymentPlan["Free"] = "free";
    PaymentPlan["Premium"] = "premium";
})(PaymentPlan || (exports.PaymentPlan = PaymentPlan = {}));
class AppObjectPolicy {
    constructor(contentType, paymentPlan) {
        _AppObjectPolicy_contentType.set(this, void 0);
        _AppObjectPolicy_paymentPlan.set(this, void 0);
        this.getContetType = () => {
            return __classPrivateFieldGet(this, _AppObjectPolicy_contentType, "f");
        };
        this.setContentType = (contentType) => {
            __classPrivateFieldSet(this, _AppObjectPolicy_contentType, contentType, "f");
        };
        this.getPaymentPlan = () => {
            return __classPrivateFieldGet(this, _AppObjectPolicy_paymentPlan, "f");
        };
        this.setPaymentPlan = (paymentPlan) => {
            __classPrivateFieldSet(this, _AppObjectPolicy_paymentPlan, paymentPlan, "f");
        };
        __classPrivateFieldSet(this, _AppObjectPolicy_contentType, contentType, "f");
        __classPrivateFieldSet(this, _AppObjectPolicy_paymentPlan, paymentPlan, "f");
    }
}
exports.AppObjectPolicy = AppObjectPolicy;
_AppObjectPolicy_contentType = new WeakMap(), _AppObjectPolicy_paymentPlan = new WeakMap();
exports.UserPolicy = zod_1.z.object({
    paymentPlan: zod_1.z.nativeEnum(PaymentPlan),
    userRole: zod_1.z.nativeEnum(UserRole),
});
class AppUserPolicy {
    constructor(paymentPlan) {
        _AppUserPolicy_paymentPlan.set(this, void 0);
        _AppUserPolicy_userRole.set(this, void 0);
        __classPrivateFieldSet(this, _AppUserPolicy_paymentPlan, paymentPlan, "f");
        __classPrivateFieldSet(this, _AppUserPolicy_userRole, UserRole.Standard, "f");
    }
    getUserRole() {
        return __classPrivateFieldGet(this, _AppUserPolicy_userRole, "f");
    }
    getPaymentPlan() {
        return __classPrivateFieldGet(this, _AppUserPolicy_paymentPlan, "f");
    }
    setPaymentPlan(paymentPlan) {
        __classPrivateFieldSet(this, _AppUserPolicy_paymentPlan, paymentPlan, "f");
    }
}
exports.AppUserPolicy = AppUserPolicy;
_AppUserPolicy_paymentPlan = new WeakMap(), _AppUserPolicy_userRole = new WeakMap();
//# sourceMappingURL=policy.js.map