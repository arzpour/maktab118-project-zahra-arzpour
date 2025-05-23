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
  page: number;
  data: IBlog[];
}

interface IBlogReqDto {
  title: string;
  thumbnail?: File;
  description: string;
}
