import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { niche, keywords } = await req.json();

  console.log("NICHE", niche);
  console.log("KEYWORDS:", keywords);

  //Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      {
        role: "user",
        content: `Please provide me with 3 content ideas for social media short-form videos in the niche ${niche}. The ideas should be arranged in the form of [{
          id: 1,
          hook: "insert catchy hook here that will draw the user's attention",
          idea: "the actual idea about the content I should make",
          script: "a 200-500 word summary of exactly what I should say in the video"
        },
      {
        id: 2,
        etc.
      }
      ]. Please also take into account using the following keywords: ${keywords}`,
      },
    ],
  });

  console.log("response:", response);

  // Extract the response content
  const responseData = response.choices[0].message.content;

  // Respond with the JSON data
  return new NextResponse(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
