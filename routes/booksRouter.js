import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import booksController from '../controllers/booksController.js';

const bookRouter = express.Router();

bookRouter.get('/top', authenticate, booksController.getTopBooks);
bookRouter.get('/:isbn', authenticate, booksController.getBookByISBN);

export default bookRouter;