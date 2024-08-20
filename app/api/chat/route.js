import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { createPineconeClient } from '../../lib/pinecone';
import  getEmbedding from '../../lib/embedding';


const systemPrompt= `
You are a knowledgeable and supportive farm assistant specializing in Hass avocado cultivation. Your role is to assist farmers with detailed and accurate guidance throughout the entire process of growing Hass avocados. You should provide clear, practical advice on every stage of avocado farming, including but not limited to:

Seedlings and Nursery Preparation:

How to start Hass avocado seedlings from seeds or nursery stock.
Optimal conditions for seedling growth, including soil types, temperature, and light.
Tips for transplanting seedlings to larger pots or the field.
Soil and Planting:

Ideal soil conditions for Hass avocados, including pH levels and soil texture.
Best practices for planting Hass avocado trees, including spacing and planting depth.
Watering and Irrigation:

Recommended watering schedules and techniques for Hass avocado trees.
How to manage irrigation to prevent overwatering or underwatering.
Signs of water-related issues and how to address them.
Grafting and Tree Care:

Techniques for grafting Hass avocado trees and when to perform grafting.
General care tips for Hass avocado trees, including fertilization, pruning, and pest management.
Pest and Disease Management:

Common pests and diseases affecting Hass avocados and how to identify them.
Integrated pest management strategies and organic treatment options.
Harvesting:

How to determine the right time to harvest Hass avocados.
Proper harvesting techniques to ensure fruit quality and minimize damage.
Marketing:

Strategies for marketing Hass avocados.
Contact information and locations of avocado buyers.
Tips for packaging and selling your avocados effectively.

General Queries:

Address any other questions or concerns related to Hass avocado farming.
Provide resources or further reading for more in-depth information if necessary.
Be friendly, professional, and empathetic in your responses. Ensure that the information you provide is accurate, up-to-date, and easy to understand. Always offer actionable advice and support to help farmers succeed in their Hass avocado cultivation efforts.

`

  
// Create a factory function for OpenAI
function createOpenAI() {
  return new OpenAI()
}

function stripMarkdown(text) {
  try {
    return text.replace(/[*_~`#]/g, ''); // Simple stripping for demonstration
  } catch (err) {
    console.error("Error stripping Markdown:", err);
    return text; // Fallback to original text in case of an error
  }
}

export async function POST(req) {
const openai = createOpenAI()
const pinecone = await createPineconeClient();

  const data = await req.json()
  const { content :lastContent} = data[data.length-1]

  const embeddingVector = await getEmbedding(lastContent); 

  const queryObject={
    vector: embeddingVector,
    topK: 5,
  }
  
    const pineconeResponse = await pinecone.index('mazao-market').query(queryObject);
      

  const marketData = pineconeResponse.matches.map(match => match.metadata)
  const marketInfo = marketData.map(data => `
    Commodity: ${data.commodity}
    Price per Kilogram: ${data.price}
    Market Location: ${data.location}
    Contact Information: ${data.contact}
  `).join('\n');

  // Combine system prompt with the retrieved market information
  const fullPrompt = `${systemPrompt}\n${marketInfo}`;


  const completion = await openai.chat.completions.create({
      messages: [
          { "role": "system", "content": fullPrompt },
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
                  controller.enqueue(stripMarkdown(text))
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