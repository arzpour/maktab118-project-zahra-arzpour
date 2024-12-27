interface IUserData {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

interface ILoginReqDto {
  username: string;
  password: string;
}

interface IAuthResDto {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: IUserData;
  };
}

interface ITokenReqDto {
  refreshToken: string;
}
