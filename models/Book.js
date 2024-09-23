import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";


const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required']
    },
    author: {
      type: String,
      required: [true, 'Author is required']
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required']
    },
    totalPages: {
      type: Number,
    },
    recommend: {
      type: Boolean,
      default: false
    }
  },
  { versionKey: false, timestamps: true }
);


bookSchema.post('save', handleSaveError);
bookSchema.pre('findOneAndUpdate', setUpdateSettings);
bookSchema.post('findOneAndUpdate', handleSaveError);

const Book = model('book', bookSchema);

export default Book;
