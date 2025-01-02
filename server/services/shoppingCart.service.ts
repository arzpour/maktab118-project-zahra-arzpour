import connectMongoDB from "../database/connection";

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
