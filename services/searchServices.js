import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/paraphrase-MiniLM-L6-v2';
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; 

const getEmbeddings = async (texts) => {
  try {
    const response = await axios.post(HUGGING_FACE_API_URL, { inputs: texts }, {
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting embeddings:', error);
    throw new Error('Failed to get embeddings');
  }
};

export const searchSimilarBooks = async (query, books) => {
  const bookTitles = books.map((book) => book.title);
  
 
  const queryEmbedding = await getEmbeddings([query]);
  

  const bookEmbeddings = await getEmbeddings(bookTitles);
  
  
  const similarities = bookEmbeddings.map((embedding, index) => ({
    title: books[index].title,
    similarity: cosineSimilarity(queryEmbedding[0], embedding),
  }));

 
  similarities.sort((a, b) => b.similarity - a.similarity);
  
  return similarities.slice(0, 5); 
};


function cosineSimilarity(vecA, vecB) {
  const dotProduct = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
  const norm = (a) => Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  return dotProduct(vecA, vecB) / (norm(vecA) * norm(vecB));
}