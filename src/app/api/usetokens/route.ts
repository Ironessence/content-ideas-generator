"use server";
import db from "../../../utils/db";
import { UserSchema } from "../../../schemas/user";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  const body = await req.json();
  const { email, tokens } = body;

  try {
    await db();
    const schema = await UserSchema.findOneAndUpdate(
      { email: email },
      { $inc: { tokens: -tokens } },
    );
    console.log("Successfully used tokens");
    console.log("SCHEMA:", schema);
    return new NextResponse("Successfully used tokens", { status: 200 });
  } catch (err) {
    console.log("err entered");
    return new NextResponse("Error when using tokens", { status: 500 });
  }
};
