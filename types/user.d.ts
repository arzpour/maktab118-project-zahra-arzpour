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
