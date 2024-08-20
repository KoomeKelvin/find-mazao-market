import { OpenAI } from 'openai';

// This function generates an embedding vector from the input text
async function getEmbedding(text) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // Your OpenAI API key
    });

    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002', // Example model for generating embeddings
      input: text,
    });

    const embeddingVector = response.data[0].embedding; // Extract the embedding vector from the response

    return embeddingVector;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

export default getEmbedding;
