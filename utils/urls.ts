export const urls = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    token: "/auth/token",
    logout: "/auth/logout",
  },
  category: {
    list: "/categories",
  },
  subcategories: {
    list: "/subcategories",
  },
  products: {
    list: "/products",
    delete: (id: string) => `/products/${id}`,
    edit: (id: string) => `/products/${id}`,
    productById: (id: string) => `/products/${id}`,
  },
  orders: {
    list: "/orders",
  },
  users: {
    list: "/users",
  },
  cart: {
    list: "/shopping-cart",
    ById: (id: string) => `http://localhost:3000/server/shopping-cart/${id}`,
  },
};
