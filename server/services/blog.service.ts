import connectMongoDB from "../database/connection";

type getBlogsType = () => Promise<IBlogResDto[]>;
export const getBlogs: getBlogsType = async () => {
  const db = await connectMongoDB();

  try {
    const response = await db?.collection("blog").find().toArray();

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
