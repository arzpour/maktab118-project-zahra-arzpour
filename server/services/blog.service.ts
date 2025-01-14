import { connectToDatabase, db } from "../database/connection";

type getBlogsType = () => Promise<any[]>;
export const getBlogs: getBlogsType = async () => {
  const db = await connectToDatabase();

  try {
    const response = await db?.collection("blog").find().toArray();

    return response || [];
  } catch (error) {
    console.log(error);

    return [];
  }
};

type addBlogType = (data: any) => Promise<any>;
export const addBlog: addBlogType = async (data) => {
  const db = await connectToDatabase();


  const date = new Date();
  try {
    const response = await db
      ?.collection("blog")
      .insertOne({ data, createdAt: date });

    console.log(response, "respons");

    return response;
  } catch (error) {
    console.log(error);
  }
};
