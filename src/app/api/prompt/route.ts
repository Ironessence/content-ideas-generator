import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { niche, keywords, tone, format } = await req.json();

  console.log("niche:", niche, "keywords:", keywords, "tone:", tone, "format:", format);

  //Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
    temperature: 0,
    frequency_penalty: 0,
    presence_penalty: 0,
    top_p: 1,
    messages: [
      {
        role: "system",
        content:
          "You are a professional Instagram content creation manager and assistant designed to output JSON and give the best advice in order for your ideas to turn into videos made by other users that would go viral and draw in a lot of attention and engagement. Prompt(encoding=True, validation=True, sanitation=True)",
      },
      {
        role: "user",
        content: `Please provide me with 3 content ideas for my Instagram Reels. Please also ensure the ideas you provide me with bring in the most engagement from users, prioritizing average watch time. The niche I want to make the videos is ${niche}, and we should target the following keywords: ${keywords}. Please use the tone ${tone} and the format should be ${format}. When replying, please answer in a JSON format so I can extract the information and use it, like this:
        [
          {
            id: 1,
            hook: *Provide me with a 10-30 word hook that will immediately make the user stop scrolling and pay attention to my video*,
            idea: *The actual idea, explained in a brief summary*,
            viralityScore: *Your own estimation of how likely it is for a video that displays the idea to go viral on Instagram*,
          },
          {
            id: 2,
            etc...
          }
        ]
        `,
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
