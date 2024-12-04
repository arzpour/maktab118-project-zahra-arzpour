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
    .min(8, { message: "رمز عبور باید بیشتر از ۸ کاراکتر باشد" }),
  email: z.string().optional(),
  phoneNumber: z
    .string()
    .refine((value) => /^\d+$/.test(value), "شماره تماس اشتباه میباشد"),
  address: z.string().min(3, { message: "آدرس باید بیشتر از ۳ کاراکتر باشد" }),
});

export type signupUserSchemaType = z.infer<typeof signupUserSchema>;
