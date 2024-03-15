import { z } from "zod";
import { Ammount } from "./utils";
import { AppId } from "./AppObject";
import { Nutrient } from "./ingredient";

export const MealInfo = z.object({
  mealName: z.string().min(3),
  recipes: z
    .array(z.object({ recipeId: AppId, schedule: z.string().min(1) }))
    .optional(),
  dailyCaloryAvg: Ammount.optional(),
  dailyMacrosAvg: z.array(Nutrient).optional(),
});

export type MealInfo = z.infer<typeof MealInfo>;
