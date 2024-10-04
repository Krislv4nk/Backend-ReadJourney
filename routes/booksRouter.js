import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import booksController from "../controllers/booksController.js";

const bookRouter = express.Router();

bookRouter.get('/books/popular', authenticate, booksController.fetchTopBooks);

bookRouter.get('/books/:isbn', authenticate, booksController.fetchBookByISBN);

bookRouter.get('/books/favorites', authenticate, booksController.getFavorites);

bookRouter.get('/books/favorites/:bookId', authenticate, booksController.getBookById);

bookRouter.post('/books/favorites/:bookId', authenticate, booksController.addBook);

bookRouter.delete('/books/favorites/:bookId', authenticate, booksController.removeBook);

bookRouter.patch('/books/favorites/:bookId/page', authenticate, booksController.updateCurrentPage);

bookRouter.get('/books/favorites/:bookId/page', authenticate, booksController.getCurrentPage);

export default bookRouter;






