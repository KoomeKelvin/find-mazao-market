// lib/pinecone.js
import { Pinecone} from '@pinecone-database/pinecone';

export async function createPineconeClient() {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
  });

  return pinecone;
}
