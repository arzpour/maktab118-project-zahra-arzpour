interface IChildren {
  children: React.ReactNode | JSX.Element | JSX.Element[];
}

interface IError {
  message: string;
  response: {
    statusText: string;
  };
  status: number;
}

interface IParams {
  page: number;
  limit: number;
  total?: number;
  total_pages?: number;
}

interface IShoppingCartProductList extends IProducts {
  selectedQuantity?: number;
  addToCart?: (quantity: number) => void;
}
