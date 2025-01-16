import { addBlog, getBlogs } from "@/server/services/blog.service";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { blogSchema } from "@/server/validations/blog.validation";

export const GET = async () => {
  const blogs = await getBlogs();

  if (!blogs) {
    Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({ data: blogs });
};

export const POST = async (req: Request) => {
  const cookies = req.headers.get("cookie");

  if (!cookies) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const parseCookies = parse(cookies);

  const token = parseCookies["accsess-token-store"];

  if (!token) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const body = await req.formData();

  const thumbnail = body.get("thumbnail");

  const blog: IBlogReqDto = {
    title: body.get("title")?.toString() || "",
    description: body.get("description")?.toString() || "",
    thumbnail: thumbnail instanceof File ? thumbnail : undefined,
  };

  const validationResult = blogSchema.safeParse(blog);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      { status: 400 }
    );
  }

  const addNewBlog = await addBlog(blog);

  if (!addNewBlog) {
    Response.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({ data: addNewBlog });
};
