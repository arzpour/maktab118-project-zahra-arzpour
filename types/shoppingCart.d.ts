interface IShoppingCart {
  _id: ObjectId;
  userId: string;
  products: {
    _id: string;
    name: string;
    price: number;
    selectedQuantity: number;
    thumbnail: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
