import { NextResponse } from "next/server";
import { parse } from "cookie";
import { editShoppingCartProductSchema } from "@/server/validations/shoppingCart.validation";
import {
  deleteShoppingCart,
  editShoppingCart,
  getShoppingCartByUserId,
} from "@/server/services/shoppingCart.service";

export const GET = async (req: Request) => {
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

  const userId = parseCookies["user-id"];

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unathorized",
      },
      {
        status: 401,
      }
    );
  }

  const userShoppingCart = await getShoppingCartByUserId(userId);

  if (!userShoppingCart) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ data: userShoppingCart });
};

export const PUT = async (req: Request) => {
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

  const validationResult = editShoppingCartProductSchema.safeParse(body);

  if (!validationResult.success) {
    return NextResponse.json(
      { error: validationResult.error },
      { status: 400 }
    );
  }

  const userId = parseCookies["user-id"];

  const editDataBase = await editShoppingCart({
    data: body,
    userId: userId || "",
  });

  if (!editDataBase) {
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

export const DELETE = async (req: Request) => {
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

  const userId = parseCookies["user-id"];

  if (!userId) {
    return NextResponse.json(
      {
        error: "Unathorized",
      },
      {
        status: 401,
      }
    );
  }

  if (!(await deleteShoppingCart(userId))) {
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }

  return NextResponse.json({ data: "deleted" });
};
