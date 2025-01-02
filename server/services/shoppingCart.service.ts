import connectMongoDB from "../database/connection";
import {
  addShoppingCartProductSchemaType,
  editShoppingCartProductSchemaType,
} from "../validations/shoppingCart.validation";

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
}) => Promise<IShoppingCart[] | undefined>;

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
        (item: IShoppingCart) => item._id === product._id
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

    await db?.collection("cart").updateOne(
      { userId },
      {
        $set: { products: cartProducts, updatedAt: date },
        $setOnInsert: { createdAt: date },
      },
      { upsert: true }
    );

    return [
      {
        _id: cart?._id,
        userId,
        products: cartProducts,
        createdAt: cart?.createdAt || date.toISOString(),
        updatedAt: date.toISOString(),
      },
    ];
  } catch (error) {
    console.error(error);
  }
};

type editShoppingCartType = (_: {
  data: editShoppingCartProductSchemaType;
  userId: string;
}) => Promise<IShoppingCart | undefined>;
export const editShoppingCart: editShoppingCartType = async ({
  data,
  userId,
}) => {
  const db = await connectMongoDB();

  try {
    const cart = await db?.collection("cart").findOne({ userId });

    const cartProducts = cart?.products || [];

    const itemIndex = cartProducts.findIndex(
      (item: IShoppingCart) => item._id === data._id
    );

    if (itemIndex >= 0) {
      if (data.selectedQuantity! <= 0) {
        cartProducts.splice(itemIndex, 1);
      } else {
        cartProducts[itemIndex].selectedQuantity = data.selectedQuantity;
      }
    }

    const date = new Date();

    await db?.collection("cart").updateOne(
      { userId },
      {
        $set: { products: cartProducts, updatedAt: date },
        $setOnInsert: { createdAt: date },
      },
      { upsert: true }
    );

    return {
      _id: cart?._id,
      userId,
      products: cartProducts,
      createdAt: cart?.createdAt || date.toISOString(),
      updatedAt: date.toISOString(),
    };
  } catch (error) {
    console.log(error);
  }
};

type deleteShoppingCartType = (userId: string) => Promise<string | undefined>;

export const deleteShoppingCart: deleteShoppingCartType = async (userId) => {
  const db = await connectMongoDB();

  try {
    const response = await db?.collection("cart").deleteOne({ userId });

    if (response?.deletedCount === 1) {
      return "deleted";
    } else {
      return "no deleted";
    }
  } catch (error) {
    console.log(error);
  }
};
