"use server";
import db from "@/utils/db";
import { NextResponse } from "next/server";
import { UserSchema } from "../../../../schemas/user";

export const GET = async (req, { params }) => {
  const { email } = params;

  try {
    await db();
    const user = await UserSchema.findOne({ email });

    if (user) {
      // User found, return the user document
      return new NextResponse(JSON.stringify(user), { status: 200 });
    } else {
      // User not found, return a response indicating not found
      return new NextResponse("User not found", { status: 404 });
    }
  } catch (err) {
    return new NextResponse("Error fetching user", { status: 500 });
  }
};
