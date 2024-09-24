
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as booksServices from '../services/booksServices.js';

// Додавання книги до улюблених
const addBook = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.body;

  const user = await booksServices.addBookToFavorites(userId, bookId);
  res.status(201).json({ message: 'Book added to favorites', favorites: user.favorites });
};

// Видалення книги з улюблених
const removeBook = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.params;

  const user = await booksServices.removeBookFromFavorites(userId, bookId);
  res.status(200).json({ message: 'Book removed from favorites', favorites: user.favorites });
};

// Отримання списку улюблених книг
const getFavorites = async (req, res) => {
  const { userId } = req.user;
  const favorites = await booksServices.getFavoriteBooks(userId);
  res.status(200).json(favorites);
};

// Отримання популярних книг
const fetchTopBooks = async (req, res) => {
  const books = await booksServices.getTopBooks();
  res.status(200).json(books);
};

// Отримання книги за ISBN
const fetchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const book = await booksServices.getBookByISBN(isbn);
  res.status(200).json(book);
};

// Оновлення поточної сторінки, де користувач зупинився читати
const updateCurrentPage = async (req, res) => {
  const { userId } = req.user;
  const { bookId, currentPage } = req.body;

  const favorite = await booksServices.updateCurrentPage(userId, bookId, currentPage);
  res.status(200).json({ message: 'Page updated', currentPage: favorite.currentPage });
};

// Отримання останньої сторінки, де користувач зупинився
const getCurrentPage = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.params;

  const currentPage = await booksServices.getCurrentPageForBook(userId, bookId);
  res.status(200).json({ currentPage });
};

export default {
  addBook: ctrlWrapper(addBook),
  removeBook: ctrlWrapper(removeBook),
  getFavorites: ctrlWrapper(getFavorites),
  fetchTopBooks: ctrlWrapper(fetchTopBooks),
  fetchBookByISBN: ctrlWrapper(fetchBookByISBN),
  updateCurrentPage: ctrlWrapper(updateCurrentPage), 
  getCurrentPage: ctrlWrapper(getCurrentPage), 
};







