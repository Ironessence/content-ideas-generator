import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: any) => {
  const { email, platform } = params;

  if (!email) {
    return new NextResponse("Email parameter is missing", { status: 400 });
  }

  if (!platform) {
    return new NextResponse("Platform parameter is missing", { status: 400 });
  }

  try {
    await db();
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Filter savedIdeas based on the platform
    const filteredIdeas = user.savedIdeas.filter((idea: any) => idea.platform === platform);

    // Sort the filtered ideas by createdAt
    const sortedFilteredIdeas = filteredIdeas.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return new NextResponse(JSON.stringify(sortedFilteredIdeas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse("Error when retrieving saved Ideas", { status: 500 });
  }
};
