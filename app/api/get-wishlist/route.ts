import { getUserToken } from "@/app/Helpers/getUserToken";
import { CartResponse } from "@/interfaces";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    // const token = await getUserToken()
    const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/wishlist`, {
        headers: {
            token: token!
        },
      cache: "no-store"
    });
    const data:CartResponse = await response.json()
    return NextResponse.json(data)
}