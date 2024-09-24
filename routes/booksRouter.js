import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import booksController from "../controllers/booksController.js";

const bookRouter = express.Router();


bookRouter.get('/favorites', authenticate, booksController.getFavorites);

bookRouter.post('/favorites', authenticate, booksController.addBook);

bookRouter.delete('/favorites/:bookId', authenticate, booksController.removeBook);

bookRouter.get('/books/popular', authenticate, booksController.fetchTopBooks);

bookRouter.get('/books/:isbn', authenticate, booksController.fetchBookByISBN);

bookRouter.patch('/favorites/:bookId/page', authenticate, booksController.updateCurrentPage);

bookRouter.get('/favorites/:bookId/page', authenticate, booksController.getCurrentPage);

export default bookRouter;






