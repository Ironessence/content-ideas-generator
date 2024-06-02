import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  //   const { additionalInfo, keywords, niche, toneType, numberOf, contentType, platform } =
  //     await req.json();

  //   //Request the OpenAI API for the response based on the prompt
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-4o",
  //     response_format: { type: "json_object" },
  //     temperature: 0.9,
  //     frequency_penalty: 0,
  //     presence_penalty: 0,
  //     top_p: 1,
  //     messages: [
  //       {
  //         role: "system",
  //         content: `You are a professional Social media content creation manager and assistant designed to output JSON format and give the best advice in order for your ideas to turn into videos made by other users that would go viral and draw in a lot of attention and engagement.
  //           When replying, please answer in a JSON format so I can extract the information and use it, like this:
  //           ideas: {
  //  [
  //           {
  //             id: 1,
  //             idea: *The actual idea, explained in a brief summary*,
  //
  //             shortDescription: *A brief description of the idea, in 50 to 150 words*,
  //           },
  //           {
  //             id: 2,
  //             etc...
  //           }
  //         ]
  //           }

  //           Prompt(encoding=True, validation=True, sanitation=True)`,
  //       },
  //       {
  //         role: "user",
  //         content: `
  //         I want to create a ${contentType} for my ${platform} account. My plan is to create viral videos that will engage my audience. Please provide me with ${numberOf} content ideas in a ${toneType ? toneType : "neutral"} tone. The niche I want to target is ${niche} and the keywords I want to use are ${keywords}. ${additionalInfo ? additionalInfo : ""}. Please note: The ideas should be unique, engaging and easy to implement. I should not need any props or special equipment to create the videos.
  //         `,
  //       },
  //     ],
  //   });

  //   // Extract the response content
  //   const responseData = response.choices[0].message.content;

  const responseData = {
    ideas: [
      {
        idea: "1The actual idea, explained in a brief summary asd asd asd asd as",
        shortDescription:
          "1A brief description of the idea, in 50 to 150 words asdas fasf asfa sfpia sfas fasfas fasf asf ",
      },
      {
        idea: "2The actual idea, explained in a brief summary asfa sfasf asf asfa sfa",
        shortDescription:
          "2A brief description of the idea, in 50 to 150 words asfa sfasf asf asf asfas fasf asfas fasf asfa sfa",
      },
      {
        idea: "3The actual idea, explained in a brief summary asf asfas fasf asf asf ",
        shortDescription:
          "3A brief description of the idea, in 50 to 150 words asfas fasf asfa sfas fasf asfas  fas",
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
