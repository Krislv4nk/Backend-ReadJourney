import fetch from 'node-fetch';
import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getTopBooks = async (req, res) => {
  try {
    const url = `https://openlibrary.org/subjects/popular.json?limit=30`;
    const response = await fetch(url);
      const data = await response.json();
      

    if (!data.works || data.works.length === 0) {
      return res.status(404).json({ message: 'No popular books found' });
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
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(data[`ISBN:${isbn}`]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



export default {
getTopBooks: ctrlWrapper(getTopBooks),
    getBookByISBN: ctrlWrapper(getBookByISBN),
}