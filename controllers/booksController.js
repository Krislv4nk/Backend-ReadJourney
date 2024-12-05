
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import * as booksServices from '../services/booksServices.js';


const getBooksByGenre = async (req, res) => {
  const { genre } = req.query; 

  if (!genre) {
    return res.status(400).json({ error: 'Genre is required' });
  }

  try {
    const books = await getBooksByGenre(genre);

    return res.status(200).json({ genre, books });
  } catch (error) {
    console.error('Error in getBooksByGenreController:', error.message);
    return res.status(500).json({
      error: 'Failed to fetch books. Please try again later.',
    });
  }
};

const getBooksByAuthor = async (req, res) => {
  const { author } = req.query;

  try {
    const books = await getBooksByAuthor(author);
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error in searchBooksByAuthor:', error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};


const getBooksByTitle = async (req, res) => {
  const { title } = req.query;

  try {
    const books = await getBooksByTitle(title);
    res.status(200).json({ books });
  } catch (error) {
    console.error('Error in searchBooksByTitle:', error.message);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};



// 
const addBook = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.body;

  const user = await booksServices.addBookToFavorites(userId, bookId);
  res.status(201).json({ message: 'Book added to favorites', favorites: user.favorites });
};

// 
const removeBook = async (req, res) => {
  const { userId } = req.user;
  const { bookId } = req.params;

  const user = await booksServices.removeBookFromFavorites(userId, bookId);
  res.status(200).json({ message: 'Book removed from favorites', favorites: user.favorites });
};

//
const getFavorites = async (req, res) => {
  const { userId } = req.user;
  const favorites = await booksServices.getFavoriteBooks(userId);
  res.status(200).json(favorites);
};



// 
const fetchBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const book = await booksServices.getBookByISBN(isbn);
  res.status(200).json(book);
};

// 
const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await booksServices.getBookById(id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book);
};

// 
const updateCurrentPage = async (req, res) => {
  const { userId } = req.user;
  const { bookId, currentPage } = req.body;

  const favorite = await booksServices.updateCurrentPage(userId, bookId, currentPage);
  res.status(200).json({ message: 'Page updated', currentPage: favorite.currentPage });
};

// 
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
  getBooksByTitle: ctrlWrapper(getBooksByTitle),
  getBooksByAuthor: ctrlWrapper(getBooksByAuthor),
  fetchBookByISBN: ctrlWrapper(fetchBookByISBN),
  getBookById: ctrlWrapper(getBookById),
  updateCurrentPage: ctrlWrapper(updateCurrentPage), 
  getCurrentPage: ctrlWrapper(getCurrentPage), 
};







