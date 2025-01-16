interface IBlogResDto {
  _id: string;
  title: string;
  thumbnail: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface IBlogReqDto {
  title: string;
  thumbnail?: File;
  description: string;
}
