import connectMongoDB from "../database/connection";
import { addShoppingCartProductSchemaType } from "../validations/shoppingCart.validation";

type getShoppingCartType = () => Promise<IShoppingCart[]>;
export const getShoppingCart: getShoppingCartType = async () => {
  const db = await connectMongoDB();

  try {
    const response = await db
      ?.collection<IShoppingCart>("cart")
      .find()
      .toArray();

    return response || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

type getShoppingCartByUserIdType = (
  userId: string
) => Promise<IShoppingCart | string>;
export const getShoppingCartByUserId: getShoppingCartByUserIdType = async (
  userId
) => {
  const db = await connectMongoDB();

  try {
    const response = await db
      ?.collection<IShoppingCart>("cart")
      .findOne({ userId });

    console.log(response);

    if (!response) return "not found";

    return response;
  } catch (error) {
    console.log(error);
    return "not found";
  }
};

type addToShoppingCartType = (_: {
  data: addShoppingCartProductSchemaType;
  userId: string;
}) => Promise<any>;

export const addToShoppingCart: addToShoppingCartType = async ({
  data,
  userId,
}) => {
  const db = await connectMongoDB();

  try {
    const cart = await db?.collection("cart").findOne({ userId });
    const cartProducts = cart?.products || [];

    for (const product of data) {
      const itemIndex = cartProducts.findIndex(
        (item: any) => item.id === product._id
      );

      if (itemIndex < 0) {
        cartProducts.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          selectedQuantity: product.selectedQuantity,
          thumbnail: product.thumbnail,
        });
      } else {
        cartProducts[itemIndex].selectedQuantity = product.selectedQuantity;
      }
    }

    const date = new Date();

    const update = await db?.collection("cart").updateOne(
      { userId },
      {
        $set: { products: cartProducts, updatedAt: date },
        $setOnInsert: { createdAt: date },
      },
      { upsert: true }
    );

    return update;
  } catch (error) {
    console.error(error);
  }
};
