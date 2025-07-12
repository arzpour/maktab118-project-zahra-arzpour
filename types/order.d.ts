interface IOrder {
  _id: string;
  user: string;
  products: {
    product: string;
    count: number;
    _id: string;
  }[];
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IOrderResDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: IOrder[];
  };
}

interface IAddOrderReqDto {
  user: string;
  products: {
    product: string;
    count: number;
  }[];
  deliveryStatus: boolean;
  deliveryDate: Date;
}

interface IAddOrderResDto {
  status: string;
  message: string;
  data: {
    order: {
      user: string;
      products: {
        product: {
          _id: string;
          price: number;
        };
        count: number;
        _id: string;
      }[];
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: boolean;
    };
  };
}

interface IGetOrderOrderByIdResDto {
  status: string;
  order: {
    _id: string;
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    products: [
      {
        product: {
          rating: {
            rate: number;
            count: number;
          };
          _id: string;
          category: string;
          subcategory: string;
          name: string;
          price: number;
          quantity: number;
          brand: string;
          description: string;
          thumbnail: string;
          images: string[];
          createdAt: string;
          updatedAt: string;
          slugname: string;
          __v: number;
        };
        count: number;
        _id: string;
      }
    ];
    totalPrice: number;
    deliveryDate: string;
    deliveryStatus: true;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}
