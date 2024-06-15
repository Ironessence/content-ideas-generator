import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async ({ params }: any) => {
  const { email, platform, ideaId } = params;

  if (!email) {
    return new NextResponse("Email parameter is missing", { status: 400 });
  }

  if (!platform) {
    return new NextResponse("Platform parameter is missing", { status: 400 });
  }

  if (!ideaId) {
    return new NextResponse("IdeaId parameter is missing", { status: 400 });
  }

  try {
    await db();
    const user = await UserSchema.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Filter savedIdeas based on the platform
    const filteredIdeas = user.savedIdeas.filter((idea: any) => idea.platform === platform);

    // Find the idea with the given ideaId
    const idea = filteredIdeas.find((idea: any) => idea._id === ideaId);

    return new NextResponse(JSON.stringify(idea), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse("Error when retrieving saved Ideas", { status: 500 });
  }
};
