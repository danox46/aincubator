import { z } from "zod";
import { Ammount } from "./utils";

export const Nutrient = z.object({
  name: z.string().min(1),
  value: Ammount.optional(),
});

export type Nutrient = z.infer<typeof Nutrient>;

export const IngredientInfo = z.object({
  ingredientName: z.string().min(3),
  nutrients: z.array(Nutrient).optional(),
  calories: Ammount.optional(),
  image: z.string().url().optional(),
  notes: z.array(z.string().min(1)).optional(),
});

export type IngredientInfo = z.infer<typeof IngredientInfo>;
