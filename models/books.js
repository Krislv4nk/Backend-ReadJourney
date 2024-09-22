import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSettings } from "./hooks.js";

const bookSchema = {

} 


const Book = model('book', bookSchema);

export default Book;