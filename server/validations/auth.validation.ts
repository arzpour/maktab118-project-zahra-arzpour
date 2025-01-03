import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(3, { message: "نام کاربری باید بیشتر از ۳ کاراکتر باشد" }),
  password: z
    .string()
    .min(5, { message: "رمز عبور باید بیشتر از ۵ کاراکتر باشد" }),
});

export type authSchemaType = z.infer<typeof authSchema>;

export const signupUserSchema = z.object({
  firstname: z.string().min(3, { message: "نام باید بیشتر از ۳ حرف باشد" }),
  lastname: z
    .string()
    .min(3, { message: "نام خانوادگی باید بیشتر از ۳ حرف باشد" }),
  username: z
    .string()
    .min(3, { message: "نام کاربری باید بیشتر از ۳ کاراکتر باشد" }),
  password: z
    .string()
    .refine(
      (value) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value),
      "رمز عبور باید بیشتر از ۸ کاراکتر (دارای حروف بزرگ, کوچک, اعداد و ... باشد.)"
    ),
  email: z.string().optional(),
  phoneNumber: z
    .string()
    .refine(
      (value) =>
        /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi.test(
          value
        ),
      "شماره تماس اشتباه میباشد"
    ),
  address: z
    .string()
    .min(10, { message: "آدرس باید بیشتر از ۱۰ کاراکتر باشد" }),
});

export type signupUserSchemaType = z.infer<typeof signupUserSchema>;

export const editUserSchema = z.object({
  address: z
    .string()
    .min(10, { message: "آدرس باید بیشتر از ۱۰ کاراکتر باشد" })
    .optional(),
});

export type editUserSchemaType = z.infer<typeof editUserSchema>;
