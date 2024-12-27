import { z } from "zod";

const validThumbnailTypes = ["image/png", "image/jpeg", "image/jpg"];
const validSize = 9; // MB

export const productSchema = z.object({
  category: z.string({ message: "نام دسته بندی الزامی است" }).optional(),
  subcategory: z.string({ message: "نام زیر مجموعه الزامی است" }).optional(),
  name: z
    .string({ message: "نام محصول الزامی است" })
    .min(2, { message: "نام محصول باید بیشتر از ۲ حرف باشد" }),

  price: z.string({ message: "قیمت الزامی است" }),
  quantity: z.string({ message: "مقدار الزامی است" }),
  brand: z.string({ message: "برند الزامی است" }),
  description: z.string({ message: "توضیحات الزامی است" }),
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || validThumbnailTypes.includes(file.type), {
      message: `فرمت عکس باید ${validThumbnailTypes} باشد`,
    })
    .refine(
      (file) =>
        !file || validSize * Math.pow(10, 6) >= Number(file.size || Infinity),
      { message: "سایز عکس باید 2 مگابایت باشد" }
    ),

  images: z
    .array(z.any())
    .optional()
    .refine(
      (files) => {
        if (!files) return true;
        const invalidFile = files.some(
          (file) => !validThumbnailTypes.includes(file.type)
        );
        if (invalidFile) {
          console.error("فرمت فایل نامعتبر است.");
          return false;
        }
        return true;
      },
      { message: `فرمت تصاویر باید ${validThumbnailTypes.join(", ")} باشد` }
    )
    .refine(
      (files) =>
        !files || files.every((file) => file.size <= validSize * 1024 * 1024),
      { message: `تصاویر باید کمتر از ${validSize}MB باشند` }
    ),
});

export type productSchemaType = z.infer<typeof productSchema>;

export const editProductSchema = z.object({
  name: z
    .string({ message: "نام محصول الزامی است" })
    .min(2, { message: "نام محصول باید بیشتر از ۲ حرف باشد" }),
  description: z.string({ message: "توضیحات الزامی است" }),
  category: z.string({ message: "نام دسته بندی الزامی است" }).optional(),
  subcategory: z.string({ message: "نام زیر مجموعه الزامی است" }).optional(),

  quantity: z.string().optional(),
  price: z.string().optional(),
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || validThumbnailTypes.includes(file.type), {
      message: `فرمت عکس باید ${validThumbnailTypes} باشد`,
    })
    .refine(
      (file) =>
        !file || validSize * Math.pow(10, 6) >= Number(file.size || Infinity),
      { message: `تصاویر باید کمتر از ${validSize}مگابایت باشند` }
    ),

  images: z
    .array(z.any())
    .optional()
    .refine(
      (files) =>
        !files ||
        files.every((file) => validThumbnailTypes.includes(file.type)),
      { message: `فرمت تصاویر باید ${validThumbnailTypes.join(", ")} باشد` }
    )
    .refine(
      (files) =>
        !files || files.every((file) => file.size <= validSize * 1024 * 1024),
      { message: `تصاویر باید کمتر از ${validSize}MB باشند` }
    ),
});

export type editProductSchemaType = z.infer<typeof editProductSchema>;
