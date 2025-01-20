import connectMongoDB from "../database/connection";
import { ObjectId } from "mongodb";

type getBlogsType = (_: IParams) => Promise<IBlogResDto[]>;
export const getBlogs: getBlogsType = async ({ limit, page }) => {
  const db = await connectMongoDB();

  const skip = (page - 1) * limit;

  try {
    const response = await db
      ?.collection("blog")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const blogs: IBlogResDto[] = (response || []).map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      thumbnail: blog.thumbnail,
      description: blog.description,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    return blogs;
  } catch (error) {
    console.log(error);
    return [];
  }
};

type addBlogType = (_: IBlogReqDto) => Promise<IBlogResDto>;
export const addBlog: addBlogType = async ({
  description,
  title,
  thumbnail,
}) => {
  const db = await connectMongoDB();

  const date = new Date();
  try {
    const response = await db?.collection("blog").insertOne({
      title,
      description,
      thumbnail: thumbnail?.name,
      createdAt: date,
      updatedAt: date,
    });

    if (response?.insertedId) {
      const newBlog = {
        _id: response.insertedId.toString(),
        title,
        thumbnail: thumbnail?.name || "",
        description,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      };

      return newBlog;
    }

    throw new Error("Something went wrong");
  } catch (error) {
    console.log(error);
    throw new Error("error!");
  }
};

type deleteBlogType = (id: string) => Promise<string | undefined>;
export const deleteBlog: deleteBlogType = async (id) => {
  const db = await connectMongoDB();

  if (!db) {
    console.log("Database connection failed");
    return undefined;
  }

  try {
    await db?.collection("blog").deleteOne({ _id: new ObjectId(id) });
    return "deleted";
  } catch (error) {
    console.log(error);
  }
};
