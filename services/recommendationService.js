import Book from '../models/Book.js';


export const recommendBooks = async(userPreferences) =>{
  const recommendedBooks = await Book.find({ genre: { $in: userPreferences.genres } });
  return recommendedBooks;
}