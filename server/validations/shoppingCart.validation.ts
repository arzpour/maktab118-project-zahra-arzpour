import { z } from "zod";

export const addShoppingCartProductSchema = z.array(
  z.object({
    name: z.string(),
    price: z.number(),
    selectedQuantity: z.number(),
    _id: z.string(),
    thumbnail: z.string(),
  })
);

export type addShoppingCartProductSchemaType = z.infer<
  typeof addShoppingCartProductSchema
>;

export const editShoppingCartProductSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  selectedQuantity: z.number().optional(),
  _id: z.string().optional(),
  thumbnail: z.string().optional(),
});

export type editShoppingCartProductSchemaType = z.infer<
  typeof editShoppingCartProductSchema
>;
