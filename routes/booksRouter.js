import express from 'express';
import authenticate from '../middlewares/authenticate.js';
import booksController from '../controllers/booksController.js';

const bookRouter = express.Router();


bookRouter.get('/books/genre', authenticate, booksController.getBooksByGenre);
bookRouter.get('/books/byAuthor', authenticate, booksController.getBooksByAuthor);
bookRouter.get('/books/byTitle', authenticate, booksController.getBooksByTitle);
bookRouter.get('/books/isbn/:isbn', authenticate, booksController.fetchBookByISBN);


bookRouter.get('/books/favorites', authenticate, booksController.getFavorites);
bookRouter.get('/books/favorites/:bookId', authenticate, booksController.getBookById);
bookRouter.post('/books/favorites/:bookId', authenticate, booksController.addBookToFavorites);
bookRouter.delete('/books/favorites/:bookId', authenticate, booksController.removeBookFromFavorites);


bookRouter.patch('/books/favorites/:bookId/page', authenticate, booksController.updateCurrentPage);
bookRouter.get('/books/favorites/:bookId/page', authenticate, booksController.getCurrentPage);

export default bookRouter;







