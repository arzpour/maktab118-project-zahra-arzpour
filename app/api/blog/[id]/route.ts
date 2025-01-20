import { deleteBlog } from "@/server/services/blog.service";
import { parse } from "cookie";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
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

  const id = (await params).id;

  if (!id) {
    NextResponse.json(
      {
        error: "Blog not found",
      },
      {
        status: 404,
      }
    );
  }

  const deleteBlogById = await deleteBlog(id);

  if (!deleteBlogById) {
    NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({ message: "deleted" });
};
