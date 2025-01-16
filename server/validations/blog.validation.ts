import { z } from "zod";

const validThumbnailTypes = ["image/png", "image/jpeg", "image/jpg"];
const validSize = 2; // MB

export const blogSchema = z.object({
  title: z
    .string({ message: "عنوان الزامی است" })
    .min(3, { message: "عنوان باید بیشتر از ۳ کاراکتر باشد" })
    .optional(),
  description: z
    .string({ message: "توضیحات الزامی است" })
    .min(10, { message: "عنوان باید بیشتر از ۱۰ کاراکتر باشد" })
    .optional(),
  thumbnail: z
    .any()
    .optional()
    .refine((file) => !file || validThumbnailTypes.includes(file.type), {
      message: `فرمت عکس باید ${validThumbnailTypes.join(", ")} باشد`,
    })
    .refine(
      (file) =>
        !file || validSize * Math.pow(10, 6) >= Number(file.size || Infinity),
      { message: `سایز عکس باید کمتر از ${validSize} مگابایت باشد` }
    )
    .optional(),
});

export type blogSchemaType = z.infer<typeof blogSchema>;
