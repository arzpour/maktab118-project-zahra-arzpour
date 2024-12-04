interface ISubCategoryReqDto {
  category: string;
  name: string;
}

interface ISubCategory {
  category: string;
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface ISubCategoryResDto {
  status?: string;
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
  data?: {
    subcategories: ISubCategory[];
  };
}
