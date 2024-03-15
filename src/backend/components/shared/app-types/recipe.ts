import { z } from "zod";
import { Ammount } from "./utils";
import { IngredientInfo, Nutrient } from "./ingredient";
import { AppId } from "./AppObject";

export const Step = z.object({
  name: z.string().min(1),
  ingredients: z.array(AppId).optional(),
  instruction: z.array(z.string()).optional(),
  time: z.number().optional(),
});

export type Step = z.infer<typeof Step>;

export const RecipeInfo = z.object({
  recipeName: z.string().min(3),
  ingredients: z
    .array(z.object({ amount: Ammount, ingredient: AppId }))
    .optional(),
  steps: z.array(Step).optional(),
  calories: Ammount.optional(),
  nutrients: z.array(Nutrient).optional(),
  time: z.number().optional(),
  image: z.string().url().optional(),
  notes: z.array(z.string()).optional(),
});

export type RecipeInfo = z.infer<typeof RecipeInfo>;
