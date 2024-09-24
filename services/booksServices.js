
 
import User from '../models/User.js';
import Book from '../models/Book.js';
import HttpError from '../helpers/HttpError.js';

const { OPEN_LIBRARY_URL_BOOK, OPEN_LIBRARY_URL_POPULAR, USER_AGENT } = process.env;

// Додавання книги до улюблених
export const addBookToFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  // Перевіряємо, чи книга є в базі даних
  let book = await Book.findOne({ isbn: bookId });
  if (!book) {
    // Отримуємо книгу з Open Library API
    const bookData = await getBookByISBN(bookId);
    // Зберігаємо книгу в базу даних
    book = new Book({
      title: bookData.title,
      author: bookData.authors[0].name,
      isbn: bookId,
      coverUrl: bookData.cover?.large || '',
      publishedDate: bookData.publish_date,
      pages: bookData.number_of_pages,
      publisher: bookData.publishers[0].name,
      description: bookData.description?.value || '',
    });
    await book.save();
  }

  // Додаємо книгу до улюблених з початковою сторінкою, якщо вона ще не додана
  const favorite = user.favorites.find(fav => fav.book.equals(book._id));
  if (!favorite) {
    user.favorites.push({ book: book._id, currentPage: 1 });
    await user.save();
  }

  return user;
};

// Видалення книги з улюблених
export const removeBookFromFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  user.favorites = user.favorites.filter(fav => fav.book.toString() !== bookId);
  await user.save();
  return user;
};

// Отримання улюблених книг користувача
export const getFavoriteBooks = async (userId) => {
  const user = await User.findById(userId).populate('favorites.book');
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return user.favorites;
};

// Оновлення поточної сторінки книги
export const updateCurrentPage = async (userId, bookId, currentPage) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const favorite = user.favorites.find(fav => fav.book.equals(bookId));
  if (!favorite) {
    throw new HttpError(404, 'Book not found in favorites');
  }

  favorite.currentPage = currentPage;
  await user.save();

  return favorite;
};

// Отримання поточної сторінки книги для користувача
export const getCurrentPageForBook = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  const favorite = user.favorites.find(fav => fav.book.equals(bookId));
  if (!favorite) {
    throw new HttpError(404, 'Book not found in favorites');
  }

  return favorite.currentPage;
};

// Отримання популярних книг
export const getTopBooks = async () => {
  const url = OPEN_LIBRARY_URL_POPULAR;
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (!data.works || data.works.length === 0) {
    throw new HttpError(404, 'No popular books found');
  }

  return data.works;
};

// Отримання книги за ISBN
export const getBookByISBN = async (isbn) => {
  const url = OPEN_LIBRARY_URL_BOOK.replace('${isbn}', isbn);
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  if (!data[`ISBN:${isbn}`]) {
    throw new HttpError(404, 'Book not found');
  }

  return data[`ISBN:${isbn}`];
};
