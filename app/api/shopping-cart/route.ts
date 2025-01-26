import {
  addToShoppingCart,
  getShoppingCart,
} from "@/server/services/shoppingCart.service";
import { NextResponse } from "next/server";
import { parse } from "cookie";
import { addShoppingCartProductSchema } from "@/server/validations/shoppingCart.validation";

export const GET = async () => {
  const products = await getShoppingCart();

  if (!products) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return Response.json({ data: products });
};

export const POST = async (req: Request) => {
  const body = await req.json();

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

  const validationResult = addShoppingCartProductSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      { status: 400 }
    );
  }

  const userId = parseCookies["user-id"];

  const addToDatabase = await addToShoppingCart({
    data: body,
    userId: userId || "",
  });

  if (!addToDatabase) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ data: body });
};
