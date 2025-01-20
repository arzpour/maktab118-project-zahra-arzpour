export const urls = {
  auth: {
    login: "/auth/login",
    signup: "/auth/signup",
    token: "/auth/token",
    logout: "/auth/logout",
  },
  category: {
    list: "/categories",
    delete: (id: string) => `/categories/${id}`,
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
    edit: (id: string) => `/orders/${id}`,
    ById: (id: string) => `/orders/${id}`,
  },
  users: {
    list: "/users",
    userById: (id: string) => `/users/${id}`,
  },
  cart: {
    list: `${process.env.NEXT_PUBLIC_DATABASE_URL}/shopping-cart`,
    ById: (id: string) =>
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/shopping-cart/${id}`,
  },
  blog: {
    list: `${process.env.NEXT_PUBLIC_DATABASE_URL}/blog`,
    ById: (id: string) =>
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/blog/${id}`,
  },
};
