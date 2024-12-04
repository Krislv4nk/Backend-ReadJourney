
 
import User from '../models/User.js';
import Book from '../models/Book.js';
import HttpError from '../helpers/HttpError.js';
import axios from 'axios';

const { OPEN_LIBRARY_URL_BOOK, OPEN_LIBRARY_API_URL, USER_AGENT } = process.env;


export const getBooksByGenre = async (genre) => {
  if (!genre) {
    throw new Error('Genre is required');
  }

  try {
    
    const response = await axios.get(`${OPEN_LIBRARY_API_URL}/${genre.toLowerCase()}.json`, {
      headers: {
        'User-Agent': 'YourAppName/1.0',
      },
    });

    
    return response.data.works.map((book) => ({
      title: book.title,
      author: book.authors?.[0]?.name || 'Unknown Author',
      cover: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : null,
      key: book.key, 
    }));
  } catch (error) {
    console.error('Error fetching books by genre:', error.message);
    throw new Error('Failed to fetch books. Please try again later.');
  }
};


export const getBooksByAuthor = async (author) => {
  if (!author) {
    throw new HttpError(400, 'Author is required');
  }

  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_URL}/search.json?author=${encodeURIComponent(author)}`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );

    return response.data.docs.map((book) => ({
      title: book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      key: book.key,
      publishYear: book.first_publish_year || 'Unknown Year',
    }));
  } catch (error) {
    console.error('Error fetching books by author:', error.message);
    throw new HttpError(500, 'Failed to fetch books by author');
  }
};



export const getBooksByTitle = async (title) => {
  if (!title) {
    throw new HttpError(400, 'Title is required');
  }

  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_URL}/search.json?title=${encodeURIComponent(title)}`,
      {
        headers: {
          'User-Agent': USER_AGENT,
        },
      }
    );

    return response.data.docs.map((book) => ({
      title: book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : null,
      key: book.key,
      publishYear: book.first_publish_year || 'Unknown Year',
    }));
  } catch (error) {
    console.error('Error fetching books by title:', error.message);
    throw new HttpError(500, 'Failed to fetch books by title');
  }
};






// 
export const addBookToFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  // 
  let book = await Book.findOne({ isbn: bookId });
  if (!book) {
    // 
    const bookData = await getBookByISBN(bookId);
    // 
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

  // 
  const favorite = user.favorites.find(fav => fav.book.equals(book._id));
  if (!favorite) {
    user.favorites.push({ book: book._id, currentPage: 1 });
    await user.save();
  }

  return user;
};

// 
export const removeBookFromFavorites = async (userId, bookId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, 'User not found');
  }

  user.favorites = user.favorites.filter(fav => fav.book.toString() !== bookId);
  await user.save();
  return user;
};

// 
export const getFavoriteBooks = async (userId) => {
  const user = await User.findById(userId).populate('favorites.book');
  if (!user) {
    throw new HttpError(404, 'User not found');
  }
  return user.favorites;
};


//
export const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id); 

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book); 
};

// 
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

// 
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


// 
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





