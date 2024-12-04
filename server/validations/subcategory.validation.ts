import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "نام دسته بندی باید بیشتر از ۲ حرف باشد" }),
  icon: z.string().optional(),
});

export type categorySchemaType = z.infer<typeof categorySchema>;

export const subcategorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "نام دسته بندی باید بیشتر از ۲ حرف باشد" }),
  // category: z.string({ message: "دسته بندی را انتخاب کنید" }),
  category: z.string().optional(),
});

export type subcategorySchemaType = z.infer<typeof subcategorySchema>;
