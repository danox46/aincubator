import { z } from "zod";

export enum AmountUnit {
  centimeters = "cm",
  grams = "g",
  milliliters = "ml",
  kilograms = "kg",
  liters = "l",
  milligrams = "mg",
  micrograms = "mcg",
  ounces = "oz",
  pounds = "lb",
  meters = "m",
  kilometers = "km",
  teaspoons = "tsp",
  tablespoons = "tbsp",
  cups = "cup",
  pints = "pt",
  quarts = "qt",
  gallons = "gal",
  units = "units",
  pieces = "pcs",
}

export const Ammount = z.object({
  value: z.any(),
  unit: z.nativeEnum(AmountUnit),
});

export type Ammount = z.infer<typeof Ammount>;
