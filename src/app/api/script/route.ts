import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { idea, shortDescription } = await req.json();

  //Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    response_format: { type: "json_object" },
    temperature: 0.9,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 1,
    messages: [
      {
        role: "system",
        content: `You are a professional Social media content creation manager and assistant designed to output JSON format and give the best advice in order for your ideas to turn into videos made by other users that would go viral and draw in a lot of attention and engagement.
          When replying, please answer in a JSON format so I can extract the information and use it, like this:
          script: [
            {
              scene: *short scene description*,
              visualus: *visual description*,
              dialogue: *What I should say*,
            }
          ]
          Prompt(encoding=True, validation=True, sanitation=True)`,
      },
      {
        role: "user",
        content: `
       You have previously generated an idea for my instagram reel. The idea is: ${idea}. The short description is: ${shortDescription}. Please generate the actual script I can use for the video, in great detail.
        `,
      },
    ],
  });

  // Extract the response content
  const responseData = response.choices[0].message.content;

  // Respond with the JSON data
  return new NextResponse(JSON.stringify(responseData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
