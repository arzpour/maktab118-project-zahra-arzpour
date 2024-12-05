import { z } from "zod";

export const productSchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  name: z
    .string()
    .min(2, { message: "نام دسته بندی باید بیشتر از ۲ حرف باشد" }),
  price: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), { message: "قیمت باید عدد باشد" }),
  quantity: z
    .string()
    .transform((value) => Number(value))
    .refine((value) => !isNaN(value), { message: "مقدار باید عدد باشد" }),
  brand: z.string(),
  description: z.string(),
});

export type productSchemaType = z.infer<typeof productSchema>;
