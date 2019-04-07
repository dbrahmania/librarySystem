export const addBook = book => {
  return async dispatch => {
    const promise = await fetch("http://localhost:3001/books/addBook", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });
    const data = await promise.json();
    dispatch({
      type: data.status === "SUCCESS" ? "ADD_BOOK" : "ERROR",
      payload: data.status === "SUCCESS" ? book : data.message
    });
  };
};

export const selectBook = book => {
  console.log(book);
  return {
    type: "SELECTED_BOOK",
    payload: book
  };
};
export const updateBook = book => {
  return async dispatch => {
    const promise = await fetch("http://localhost:3001/books/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    });
    const data = await promise.json();
    dispatch({
      type: data.status === "SUCCESS" ? "UPDATE_BOOK" : "ERROR",
      payload: data.status === "SUCCESS" ? book : data.message
    });
  };
};

export const getBook = isbn => {
  return {
    type: "GET_BOOK",
    payload: {
      isbn
    }
  };
};

export const getBooks = () => async dispatch => {
  const booksPromise = await fetch("http://localhost:3001/books", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const library = await booksPromise.json();
  dispatch({
    type: "GET_ALL_BOOKS",
    payload: library.data.books
  });
};

export const deleteBook = book => {
  return async dispatch => {
    const promise = await fetch(`http://localhost:3001/books/${book.isbn}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await promise.json();
    dispatch({
      type: data.status === "SUCCESS" ? "DELETE_BOOK" : "ERROR",
      payload: data.status === "SUCCESS" ? book : data.message
    });
  };
};
