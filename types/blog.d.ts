interface IBlog {
  _id: ObjectId | string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface IBlogResDto {
  total: number;
  totalPages: number;
  per_page: null | number;
  page: number;
  data: {
    blogs: IBlog[];
  };
  status: string;
}

interface IBlogByIdRes {
  status: string;
  data: {
    blog: IBlog;
  };
}

interface IBlogReqDto {
  title: string;
  thumbnail?: File;
  description: string;
}
