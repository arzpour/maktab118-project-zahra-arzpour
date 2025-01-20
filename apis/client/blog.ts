import { urls } from "@/utils/urls";
import axios from "axios";

// type getBlogsType = () => Promise<IBlogResDto[]>;
// export const getBlogs: getBlogsType = async () => {
//   const response = await axios.get(urls.blog.list);
//   return response.data.data;
// };

type getBlogsType = (_: IParams) => Promise<IBlogResDto[]>;
export const getBlogs: getBlogsType = async ({ page, limit }) => {
  const response = await axios.get(urls.blog.list, {
    params: { page, limit },
  });
  return response.data.data;
};

type addBlogType = (data: FormData) => Promise<IBlogResDto>;
export const addBlog: addBlogType = async (data) => {
  const response = await axios.post(urls.blog.list, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

type deleteBlogType = (id: string) => Promise<string>;
export const deleteBlog: deleteBlogType = async (id) => {
  const response = await axios.delete(urls.blog.ById(id));
  return response.data;
};
