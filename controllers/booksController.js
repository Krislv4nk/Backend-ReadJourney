import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as booksServices from '../services/booksServices.js';


 const addBook = async (req, res) => {
  try {
    const { userId } = req.user;
    const { bookId } = req.body;

    const user = await booksServices.addBookToFavorites(userId, bookId);
    res.status(201).json({ message: 'Book added to favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


 const removeBook = async (req, res) => {
  try {
    const { userId } = req.user;
    const { bookId } = req.params;

    const user = await booksServices.removeBookFromFavorites(userId, bookId);
    res.status(200).json({ message: 'Book removed from favorites', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


 const getFavorites = async (req, res) => {
  try {
    const { userId } = req.user;
    const favorites = await booksServices.getFavoriteBooks(userId);
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


 const fetchTopBooks = async (req, res) => {
  try {
    const books = await booksServices.getTopBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


 const fetchBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await booksServices.getBookByISBN(isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default {
    addBook: ctrlWrapper(addBook),
    removeBook: ctrlWrapper(removeBook),
    getFavorites: ctrlWrapper(getFavorites),
    fetchTopBooks: ctrlWrapper(fetchTopBooks),
    fetchBookByISBN: ctrlWrapper(fetchBookByISBN),
};







