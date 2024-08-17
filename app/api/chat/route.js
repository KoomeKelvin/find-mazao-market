import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'


const systemPrompt= `
You are an assistant designed to help Kenyan farmers find buyers for their produce. Your primary role is to provide farmers with current market information, including:

Commodity Price: The current price per kilogram for various types of produce.
Market Location: Specific locations where farmers can sell their produce.
Contact Information: Phone numbers or other contact details for buyers, if available.
When providing information, ensure it is accurate and up-to-date. Here’s the format you should use:

Commodity: [Name of the produce]
Price per Kilogram: [Price in local currency]
Market Location: [City or region]
Contact Information: [Phone number or email]`
  
export async function POST(req) {
  const openai = new OpenAI()

  const data = await req.json()
  console.log(data)
  const completion = await openai.chat.completions.create({
      messages: [
          { "role": "system", "content": systemPrompt },
          ...data
      ],
      model: "gpt-4o",
      stream: true,

  });

  const stream = new ReadableStream({
    async start(controller){
          try{
              for await(const chunk of completion)
              {
                  const text = chunk.choices[0].delta.content
                  controller.enqueue(text)
              }

          }   catch(err)
          {
              controller.error(err)
          }finally{
              controller.close()
          }
  },
     
})
  return new NextResponse(stream)
}