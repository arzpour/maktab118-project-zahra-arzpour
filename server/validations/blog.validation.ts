import { z } from "zod";

const validThumbnailTypes = ["image/png", "image/jpeg", "image/jpg"];
const validSize = 2; // MB

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  // date: z.string(),
  // createdAt: z.date(),
  updatedAt: z.date(),
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
});

export type blogSchemaType = z.infer<typeof blogSchema>;
