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

interface IAddProductsResDto {
  status?: string;
  data?: {
    product?: IProduct[];
  };
}

interface IProductById {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  subcategory: {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
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
}

interface IGetProductResDto {
  status?: string;
  data?: {
    product?: IProductById;
  };
}

interface IEditProductReqDto {
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
}

interface IEditProductsResDto {
  status: string;
  data: {
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
  };
}
