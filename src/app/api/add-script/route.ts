import { UserSchema } from "@/schemas/user";
import db from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { generatedScript, ideaId, userEmail } = body;

  try {
    if (req.method !== "POST") {
      return new NextResponse("Only POST Requests allowed", { status: 200 });
    }
    await db();
    const user = await UserSchema.findOne({ email: userEmail });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    try {
      // Find the specific idea within savedIdeas and update it
      const updatedUser = await UserSchema.findOneAndUpdate(
        { email: userEmail, "savedIdeas._id": ideaId },
        { $set: { "savedIdeas.$.script": generatedScript.script } },
        { new: true },
      );

      // Check if the idea was found and updated
      if (!updatedUser) {
        return new NextResponse("Idea not found", { status: 404 });
      }

      // Extract the updated idea
      const updatedIdea = updatedUser.savedIdeas.find(
        (idea: any) => idea._id.toString() === ideaId,
      );

      return new NextResponse(JSON.stringify(updatedIdea), { status: 200 });
    } catch (err) {
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }
  } catch (err) {
    return new NextResponse("Error when saving idea", { status: 500 });
  }
};
