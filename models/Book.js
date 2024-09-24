import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";


const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  coverUrl: {
    type: String,
  },
  publishedDate: {
    type: String,
  },
  pages: {
    type: Number,
  },
  publisher: {
    type: String,
  },
  description: {
    type: String,
  },
},
{ versionKey: false, timestamps: true }
);



bookSchema.post('save', handleSaveError);
bookSchema.pre('findOneAndUpdate', setUpdateSettings);
bookSchema.post('findOneAndUpdate', handleSaveError);

const Book = model('book', bookSchema);

export default Book;
