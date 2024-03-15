import { z } from "zod";
import { Ammount } from "./utils";
import { List } from "./AppList";

export const AccountInfo = z.object({
  accountName: z.string().min(3),
  userInfo: z
    .object({
      height: Ammount.optional(),
      weight: Ammount.optional(),
    })
    .optional(),
  mealPlans: List.optional(),
  recipes: List.optional(),
  goals: List.optional(),
  groceryList: List.optional(),
});

export type AccountInfo = z.infer<typeof AccountInfo>;
