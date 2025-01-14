interface IBlogResDto {
  _id: string;
  title: string;
  thumbnail: string;
  // date: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface IBlogReqDto {
  title: string;
  thumbnail: string;
  // date: string;
  description: string;
  updatedAt: string;
}
