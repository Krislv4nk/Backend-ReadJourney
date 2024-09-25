
import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import { generateSummary } from '../services/openaiService.js';
import { recommendBooks } from '../services/recommendationService.js';
import { convertTextToAudio } from '../services/textToSpeechService.js';

const aiRouter = express.Router();

// Генерація резюме
aiRouter.post('/generate-summary', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await generateSummary(text);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Рекомендації книг
aiRouter.get('/recommendations', authenticate, async (req, res) => {
  try {
    const userPreferences = req.user.preferences; // наприклад, жанри
    const recommendations = await recommendBooks(userPreferences);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Перетворення тексту в аудіо
aiRouter.post('/convert-to-audio', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const audioFile = await convertTextToAudio(text, 'output.mp3');
    res.json({ audioFile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default aiRouter;
