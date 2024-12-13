interface ICategoryReqDto {
  name: string;
  icon?: string;
}

interface ICategory {
  name?: string;
  icon?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  slugname?: string;
  __v?: number;
}

interface ICategoryResDto {
  status?: string;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: {
    categories: ICategory[];
  };
}

interface IPostCategoryResDto {
  status?: string;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: {
    category: ICategory;
  };
}
