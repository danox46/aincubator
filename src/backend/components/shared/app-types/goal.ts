import { z } from "zod";
import { Ammount } from "./utils";

export const Reminder = z.object({
  schedule: z.string().min(1),
  message: z.string().optional(),
});

const goal = z.object({ amount: Ammount, metric: z.string().min(1) });
export const GoalInfo = z.object({
  goalName: z.string().min(3),
  start: goal.optional(),
  goal: goal.optional(),
  mesurements: z.array(goal).optional(),
});

export type GoalInfo = z.infer<typeof GoalInfo>;
