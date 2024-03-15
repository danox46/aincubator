import { z } from "zod";
import { Ammount } from "./utils";

export const HydrationInfo = z.object({
  hydrationName: z.string().min(3),
  goal: z.object({ amount: Ammount, metric: z.string().min(1) }).optional(),
  schedule: z.string().min(1).optional(),
});

export type HydrationInfo = z.infer<typeof HydrationInfo>;
