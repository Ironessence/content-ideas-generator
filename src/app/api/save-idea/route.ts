import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { idea, email } = body;

  try {
    if (req.method !== "POST") {
      return new NextResponse("Only POST Requests allowed", { status: 200 });
    }
    await db();
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    try {
      if (!idea.isSaved) {
        await UserSchema.findOneAndUpdate(
          { email: email },
          { $push: { savedIdeas: { ...idea, isSaved: true, createdAt: new Date() } } },
          { new: true },
        );
      } else {
        await UserSchema.findOneAndUpdate(
          { email: email },
          { $pull: { savedIdeas: { _id: idea._id } } },
          { new: true },
        );
      }
    } catch (err) {
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }

    return new NextResponse(JSON.stringify(idea), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Error when saving idea", { status: 500 });
  }
};
