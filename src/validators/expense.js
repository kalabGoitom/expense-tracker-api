import { z } from "zod";

const CreateSchema = z.object({
  description: z
    .string()
    .min(4, "title must be at least 4 characters")
    .max(120, "title too long"),
  type: z.enum(["INCOME", "EXPENSE"], {
    message: "Type must be either INCOME or EXPENSE",
  }),
  amount: z.number(),
});

const UpdateSchema = z.object({
  description: z
    .string()
    .min(6, "description must be at least 6 characters")
    .max(500, "too long description")
    .optional(),
  type: z
    .enum(["INCOME", "EXPENSE"], {
      message: "Type must be either INCOME or EXPENSE",
    })
    .optional(),
  amount: z.number().optional(),
});

export { CreateSchema, UpdateSchema };
