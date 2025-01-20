import { z } from "zod";

export const dateSchema = z.object({
  deliveryDate: z
    .string({ message: "تاریخ نباید خالی باشد" })
    .min(10, "فرمت تاریخ درست نیست"),
});

export type dateSchemaType = z.infer<typeof dateSchema>;
