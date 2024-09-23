
 
import HttpError from './../helpers/HttpError.js'; 

const { OPEN_LIBRARY_URL_POPULAR, OPEN_LIBRARY_URL_BOOK, USER_AGENT } = process.env;

export const getTopBooks = async (req, res) => {
  try {
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

    res.json(data.works);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
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

    res.json(data[`ISBN:${isbn}`]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
