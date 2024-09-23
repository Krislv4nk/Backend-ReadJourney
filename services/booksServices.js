import Book from "../models/Book.js";




export const getTopBooks = async (req, res) => {
  try {
    const url = `https://openlibrary.org/subjects/popular.json?limit=30`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ReadJourney (kris_lv4nk@ukr.net)'
      }
    });
      const data = await response.json();
      

    if (!data.works || data.works.length === 0) {
      throw HttpError(404,'No popular books found');
    }

    res.json(data.works);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ReadJourney (kris_lv4nk@ukr.net)'
      }
    });
    const data = await response.json();

    if (!data[`ISBN:${isbn}`]) {
      throw HttpError(404, 'Book not found' );
    }

    res.json(data[`ISBN:${isbn}`]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
