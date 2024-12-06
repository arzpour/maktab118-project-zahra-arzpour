interface IProducts {
  _id?: string;
  category?: string;
  subcategory?: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  slugname?: string;
}

interface IProductsResDto {
  status?: string;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: {
    products: IProducts[];
  };
}

interface IProduct {
  category?: string;
  subcategory?: string;
  name?: string;
  price?: number;
  quantity?: number;
  brand?: string;
  description?: string;
  thumbnail?: string;
  images?: string[];
  rating?: {
    rate: number;
    count: number;
  };
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  slugname?: string;
  __v?: number;
}

interface IAddProductsRes {
  status?: string;
  data?: {
    product?: IProduct[];
  };
}
