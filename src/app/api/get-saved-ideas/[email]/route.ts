import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any) => {
  const { email } = params;

  if (!email) {
    return new NextResponse("Email parameter is missing", { status: 400 });
  }

  try {
    await db();
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const savedIdeas = user.savedIdeas;
    const sortedSavedIdeas = savedIdeas.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return new NextResponse(JSON.stringify(sortedSavedIdeas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse("Error when retrieving saved Ideas", { status: 500 });
  }
};
