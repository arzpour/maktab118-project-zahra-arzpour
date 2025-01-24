import { blogSchemaType } from "@/server/validations/blog.validation";
import { urls } from "@/utils/urls";
import axios from "axios";

type getBlogsType = (_: IParams) => Promise<IBlogResDto>;
export const getBlogs: getBlogsType = async ({ page, limit }) => {
  const response = await axios.get(urls.blog.list, {
    params: { page, limit },
  });
  return response.data;
};

type addBlogType = (data: FormData) => Promise<IBlog>;
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

type editBlogType = (_: {
  _id: string;
  data: blogSchemaType;
}) => Promise<IBlog>;
export const editBlog: editBlogType = async ({ data, _id }) => {
  const response = await axios.put(urls.blog.ById(_id), data);
  return response.data;
};
