import { urls } from "@/utils/urls";
import axios from "axios";

type getBlogsType = () => Promise<IBlogResDto[]>;
export const getBlogs: getBlogsType = async () => {
  const response = await axios.get(urls.blog.list);
  console.log(response.data);

  return response.data;
};

type addBlogType = (data: FormData) => Promise<IBlogResDto>;
export const addBlog: addBlogType = async (data) => {
  const response = await axios.post(urls.blog.list, data);
  console.log(response.data);

  return response.data;
};
