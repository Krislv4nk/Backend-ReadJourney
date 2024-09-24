import axios from 'axios';

const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B';
const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; 

const textGeneration = async (prompt) => {
  try {
    const response = await axios.post(HUGGING_FACE_API_URL, { inputs: prompt }, {
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
      },
    });

    return response.data[0].generated_text; 
  } catch (error) {
    console.error('Error generating text:', error);
    throw new Error('Failed to generate text');
  }
};

export default textGeneration;