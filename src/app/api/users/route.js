"use server";
import { NextResponse } from "next/server";
import { UserSchema } from "../../../schemas/user";
import db from "../../../utils/db";

export const POST = async (req) => {
  const body = await req.json();

  try {
    await db();
    const existingUser = await UserSchema.findOne({ email: body.email });

    if (existingUser) {
      // User already exists, return a response indicating the conflict
      return new NextResponse("User already exists", { status: 200 });
    } else {
      // User does not exist, proceed with creating the user
      await UserSchema.create(body);
      return new NextResponse("Success adding user", { status: 200 });
    }
  } catch (err) {
    return new NextResponse("Error when setting a new user", { status: 500 });
  }
};
