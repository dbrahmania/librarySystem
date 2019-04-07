import { combineReducers } from "redux";

const bookListReducer = (books = [], action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [action.payload, ...books];
    case "UPDATE_BOOK": {
      return books.map(book => {
        return book.isbn !== action.payload.isbn ? book : action.payload;
      });
    }
    case "DELETE_BOOK":
      return books.filter(book => book.isbn !== action.payload.isbn);
    case "GET_ALL_BOOKS":
      return action.payload;
    default:
      return books;
  }
};

const errorReducer = (error = "", action) => {
  if (action.type === "ERROR") {
    return action.payload;
  }
  return error;
};

const bookReducer = (selectedBook = {}, action) => {
  if (action.type === "SELECTED_BOOK") {
    return action.payload;
  }
  return selectedBook;
};
export default combineReducers({
  library: bookListReducer,
  selectedBook: bookReducer,
  error: errorReducer
});
