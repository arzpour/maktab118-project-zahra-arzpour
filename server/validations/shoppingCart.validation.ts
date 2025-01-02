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
