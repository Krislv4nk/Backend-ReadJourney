
 
import User from '../models/User.js';
import HttpError from '../helpers/HttpError.js';

const { OPEN_LIBRARY_URL_BOOK, OPEN_LIBRARY_URL_POPULAR, USER_AGENT } = process.env;


export const addBookToFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  if (!user.favorites.includes(bookId)) {
    user.favorites.push(bookId);
    await user.save();
  }
  return user;
};


export const removeBookFromFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  user.favorites = user.favorites.filter(id => id !== bookId);
  await user.save();
  return user;
};


export const getFavoriteBooks = async (userId) => {
  const user = await User.findById(userId).populate('favorites');
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return user.favorites;
};


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

