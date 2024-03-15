"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ammount = exports.AmountUnit = void 0;
const zod_1 = require("zod");
var AmountUnit;
(function (AmountUnit) {
    AmountUnit["centimeters"] = "cm";
    AmountUnit["grams"] = "g";
    AmountUnit["milliliters"] = "ml";
    AmountUnit["kilograms"] = "kg";
    AmountUnit["liters"] = "l";
    AmountUnit["milligrams"] = "mg";
    AmountUnit["micrograms"] = "mcg";
    AmountUnit["ounces"] = "oz";
    AmountUnit["pounds"] = "lb";
    AmountUnit["meters"] = "m";
    AmountUnit["kilometers"] = "km";
    AmountUnit["teaspoons"] = "tsp";
    AmountUnit["tablespoons"] = "tbsp";
    AmountUnit["cups"] = "cup";
    AmountUnit["pints"] = "pt";
    AmountUnit["quarts"] = "qt";
    AmountUnit["gallons"] = "gal";
    AmountUnit["units"] = "units";
    AmountUnit["pieces"] = "pcs";
})(AmountUnit || (exports.AmountUnit = AmountUnit = {}));
exports.Ammount = zod_1.z.object({
    value: zod_1.z.any(),
    unit: zod_1.z.nativeEnum(AmountUnit),
});
//# sourceMappingURL=utils.js.map