
import  HttpError  from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

export const getTop = async (req, res) => {
  
}

export const getBook = async (req, res) => {
  
};



export default {
getTopBooks: ctrlWrapper(getTop),
    getBookByISBN: ctrlWrapper(getBook),
}