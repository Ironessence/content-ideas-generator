"use server";
import { NextResponse } from "next/server";
import { UserSchema } from "../../../schemas/user";
import db from "../../../utils/db";

export const PUT = async (req: Request) => {
  const body = await req.json();
  const { email, tokens } = body;

  try {
    await db();
    await UserSchema.findOneAndUpdate({ email: email }, { $inc: { tokens: -tokens } });

    return new NextResponse("Successfully used tokens", { status: 200 });
  } catch (err) {
    return new NextResponse("Error when using tokens", { status: 500 });
  }
};
