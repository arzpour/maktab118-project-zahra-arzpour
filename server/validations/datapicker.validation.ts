import { z } from "zod";

export const dateSchema = z.object({
  deliveryDate: z
    .string({ message: "تاریخ نباید خالی باشد." })
    .refine(
      (value) => /^\d{4}\/\d{2}\/\d{2}$/.test(value),
      "تاریخ باید در فرمت yyyy/MM/dd باشد."
    ),
});

export type dateSchemaType = z.infer<typeof dateSchema>;
