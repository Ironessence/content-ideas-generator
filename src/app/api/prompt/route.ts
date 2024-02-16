import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
 

export const runtime = 'edge';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export async function POST(req: Request) {
  

  
  const { niche, keywords } = await req.json();

  console.log('NICHE', niche);
  console.log('KEYWORDS:', keywords);
 
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [{'role': 'user', 'content': `Please give me a very short, 200 word story in the niche ${niche} using the word: ${keywords}`}],
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  console.log('STREAM:', stream);
 
  // Respond with the stream
   return new StreamingTextResponse(stream);

}