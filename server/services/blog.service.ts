import { ObjectId, UpdateResult } from "mongodb";
import connectMongoDB from "../database/connection";
import { blogSchemaType } from "../validations/blog.validation";

type getBlogsType = (_: IParams) => Promise<{
  blogs: IBlog[];
  total: number | undefined;
  totalPages: number;
}>;
export const getBlogs: getBlogsType = async ({ limit, page }) => {
  const db = await connectMongoDB();

  const skip = (page - 1) * limit;

  const total = await db?.collection("blog").countDocuments();

  const totalPages = Math.ceil((total || 0) / limit);

  try {
    const response = await db
      ?.collection("blog")
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();

    const blogs: IBlog[] = (response || []).map((blog) => ({
      _id: blog._id.toString(),
      title: blog.title,
      thumbnail: blog.thumbnail,
      description: blog.description,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));

    return { blogs, total, totalPages };
  } catch (error) {
    console.log(error);
    return { blogs: [], total: 0, totalPages: 0 };
  }
};

type addBlogType = (_: IBlogReqDto) => Promise<IBlog>;
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

type editBlogType = (_: {
  data: blogSchemaType;
  _id: string;
}) => Promise<UpdateResult<Document> | undefined>;

export const editBlog: editBlogType = async ({ _id, data }) => {
  const db = await connectMongoDB();

  try {
    return await db?.collection("blog").updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: { data },
      }
    );
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
