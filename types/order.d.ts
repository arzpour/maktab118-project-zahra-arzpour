interface IOrder {
  _id: string;
  user: string;
  products: [
    {
      product: string;
      count: number;
      _id: string;
    }
  ];
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
  products: [
    {
      product: string;
      count: number;
    }
  ];
  deliveryStatus: boolean;
}

interface IAddOrderResDto {
  status: string;
  data: {
    order: {
      user: string;
      products: [
        {
          product: {
            _id: string;
            price: number;
          };
          count: 2;
          _id: string;
        }
      ];
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
