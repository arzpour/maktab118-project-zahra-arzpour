import { urls } from "@/utils/urls";
import axios from "axios";

type getBlogsType = () => Promise<IBlogResDto[]>;
export const getBlogs: getBlogsType = async () => {
  const response = await axios.get(urls.blog.list);
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
