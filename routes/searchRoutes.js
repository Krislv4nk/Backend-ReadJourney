import express from 'express';
import { searchSimilarBooks } from '../services/searchService.js';
import { getBooksFromDB } from '../services/booksService.js'; 

const searchRouter = express.Router();

searchRouter.post('/search', async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

   
    const books = await getBooksFromDB();
    
    
    const results = await searchSimilarBooks(query, books);
    
    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: 'Error performing search' });
  }
});

export default searchRouter;