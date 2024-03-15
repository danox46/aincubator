import { z } from "zod";

export const List = z.array(
  z.object({
    _id: z.string().min(1),
    name: z.string().optional(),
    isActive: z.boolean().optional(),
  })
);
export type List = z.infer<typeof List>;
