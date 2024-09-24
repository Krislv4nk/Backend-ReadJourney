import express from 'express';
import textGeneration from '../services/aiService.js';

const aiRouter = express.Router();

aiRouter.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const generatedText = await textGeneration(prompt);
    res.status(200).json({ generatedText });
  } catch (error) {
    res.status(500).json({ error: 'Error generating text' });
  }
});

export default aiRouter;