
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as booksServices from '../services/booksServices.js';


const getBooksByGenre = async (req, res) => {
  const { genre } = req.query; // отримуємо жанр із запиту

  if (!genre) {
    return res.status(400).json({ error: 'Genre is required' });
  }

  try {
    // Викликаємо сервіс для пошуку книг за жанром
    const books = await getBooksByGenre(genre);

    return res.status(200).json({ genre, books });
  } catch (error) {
    console.error('Error in getBooksByGenreController:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch books. Please try again later.',
    });
  }
};

const searchBooksByAuthor = async (req, res) => {
  const { author } = req.query;

  try {
    const books = await getBooksByAuthor(author);
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error in searchBooksByAuthor:', error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};


const searchBooksByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const books = await getBooksByTitle(title);
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error in searchBooksByTitle:', error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};



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



// Отримання книги за ISBN
const fetchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const book = await booksServices.getBookByISBN(isbn);
  res.status(200).json(book);
};

// Отримання книги за ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await booksServices.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

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
  getBooksByGenre: ctrlWrapper(getBooksByGenre),
  searchBooksByTitle: ctrlWrapper(searchBooksByTitle),
  searchBooksByAuthor: ctrlWrapper(searchBooksByAuthor),
  fetchBookByISBN: ctrlWrapper(fetchBookByISBN),
  getBookById: ctrlWrapper(getBookById),
  updateCurrentPage: ctrlWrapper(updateCurrentPage), 
  getCurrentPage: ctrlWrapper(getCurrentPage), 
};







