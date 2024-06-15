import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  const responseData = {
    script: [
      {
        scene: "SCENE 666",
        visuals: "VISUALS 5",
        dialogue: "DIALOGUE 3",
      },
      {
        scene: "SCENE 6666",
        visuals: "VISUALS 4",
        dialogue: "DIALOGUE 4",
      },
    ],
  };

  // Respond with the JSON data
  return new NextResponse(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
