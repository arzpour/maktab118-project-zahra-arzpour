import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getBlogsType = (_: IParams) => Promise<IBlogResDto>;
export const getBlogs: getBlogsType = async ({ page, limit }) => {
  const response = await generateAxiosInstance.get(urls.blog.list, {
    params: { page, limit },
  });
  return response.data;
};

type getBlogByIdType = (id: string) => Promise<IBlogByIdRes>;
export const getBlogById: getBlogByIdType = async (id) => {
  const response = await generateAxiosInstance.get(urls.blog.ById(id));
  return response.data;
};

type addBlogType = (data: FormData) => Promise<IBlog>;
export const addBlog: addBlogType = async (data) => {
  const response = await generateAxiosInstance.post(urls.blog.list, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

type deleteBlogType = (id: string) => Promise<string>;
export const deleteBlog: deleteBlogType = async (id) => {
  const response = await generateAxiosInstance.delete(urls.blog.ById(id));
  return response.data;
};

type editBlogType = (_: { id: string; data: FormData }) => Promise<IBlog>;
export const editBlog: editBlogType = async ({ data, id }) => {
  const response = await generateAxiosInstance.patch(urls.blog.ById(id), data);
  return response.data;
};
