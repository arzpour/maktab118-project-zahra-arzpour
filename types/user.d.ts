interface IUserResDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    users: [
      {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        phoneNumber: string;
        address: string;
        role: string;
        createdAt: string;
        updatedAt: string;
      }
    ];
  };
}

interface IUser {
  status?: string;
  data?: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

interface IEditUserReqDto {
  firstname?: string;
  lastname?: string;
  username?: string;
  password?: string;
  phoneNumber?: string;
  address?: string;
}
