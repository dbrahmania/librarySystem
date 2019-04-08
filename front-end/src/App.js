import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addBook,
  deleteBook,
  updateBook,
  getBooks,
  selectBook
} from "./actions";
import Modal from "./components/common/Modal";
import "./App.css";

class App extends Component {
  state = {
    searchInput: "",
    action: "",
    isbn: "",
    title: "",
    subtitle: "",
    author: "",
    published: "",
    publisher: "",
    pages: "",
    description: ""
  };
  componentDidMount() {
    this.props.getBooks();
  }
  componentWillReceiveProps = nextProps => {
    if (
      Object.keys(nextProps.selectedBook).length !== 0 &&
      nextProps.selectedBook.isbn !== this.props.selectedBook.isbn
    ) {
      this.setState({
        isbn: nextProps.selectedBook.isbn,
        title: nextProps.selectedBook.title,
        subtitle: nextProps.selectedBook.subtitle,
        author: nextProps.selectedBook.author,
        published: nextProps.selectedBook.published,
        publisher: nextProps.selectedBook.publisher,
        pages: nextProps.selectedBook.pages,
        description: nextProps.selectedBook.description
      });
    }
  };
  crudOperation = name => {
    let {
      isbn,
      title,
      subtitle,
      author,
      published,
      publisher,
      pages,
      description
    } = this.state;

    switch (name) {
      case "Add": {
        this.props.addBook({
          isbn,
          title,
          subtitle,
          author,
          published,
          publisher,
          pages,
          description
        });
        this.setState({
          action: ""
        });
        break;
      }
      case "Edit": {
        this.props.updateBook({
          isbn,
          title,
          subtitle,
          author,
          published,
          publisher,
          pages,
          description
        });
        this.setState({
          action: ""
        });
        break;
      }
      default:
        return;
    }
  };
  reset = () => {
    this.setState(
      {
        action: "",
        isbn: "",
        title: "",
        subtitle: "",
        author: "",
        published: "",
        publisher: "",
        pages: "",
        description: ""
      },
      () => this.props.selectBook({})
    );
  };
  handleEvent = e => {
    const obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  };

  search = key =>
    this.props.library.filter(
      book =>
        book.isbn.toLowerCase().includes(key.toLowerCase()) ||
        book.author.toLowerCase().includes(key.toLowerCase()) ||
        book.title.toLowerCase().includes(key.toLowerCase()) ||
        book.subtitle.toLowerCase().includes(key.toLowerCase()) ||
        book.published.toLowerCase().includes(key.toLowerCase()) ||
        book.publisher.toLowerCase().includes(key.toLowerCase()) ||
        book.description.toLowerCase().includes(key.toLowerCase())
    );
  render() {
    const { library, headers } = this.props;
    const { action, searchInput } = this.state;
    // console.clear();
    const books = searchInput ? this.search(searchInput) : library;
    return (
      <Fragment>
        <div className="App">
          <header className="App-header">Book Library System</header>
          <div className="book-action">
            <input
              placeholder="search ...."
              value={this.state.search}
              name="searchInput"
              className="searchBar"
              onChange={this.handleEvent}
            />
            <button
              name="action"
              value="Add"
              onClick={e => {
                this.reset();
                this.handleEvent(e);
              }}
            >
              ADD BOOK
            </button>
          </div>
          <table className="book-list">
            <thead>
              <tr>
                {headers.map(item => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={`book-${book.isbn}`}>
                  <td>{book.isbn}</td>
                  <td>
                    <b>{book.title}</b>
                    <br />
                    <i>{book.subtitle}</i>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <p>{book.description}</p>
                  </td>
                  <td>
                    <button
                      name="action"
                      value="Edit"
                      onClick={e => {
                        this.props.selectBook(book);
                        this.handleEvent(e);
                      }}
                    >
                      UPDATE
                    </button>
                    <button
                      name="action"
                      value="Delete"
                      onClick={e => this.props.deleteBook(book)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {action.length > 0 && (
          <Modal
            title={action}
            onSubmit={() => this.crudOperation(action)}
            reset={this.reset}
          >
            <div className="form-field">
              <label htmlFor="isbn">ISBN</label>
              <input
                name="isbn"
                onChange={this.handleEvent}
                value={this.state.isbn}
              />
            </div>
            <div className="form-field">
              <label htmlFor="title">TITILE</label>
              <input
                name="title"
                onChange={this.handleEvent}
                value={this.state.title}
              />
            </div>
            <div className="form-field">
              <label htmlFor="title">SUB TITILE</label>
              <input
                name="subtitle"
                onChange={this.handleEvent}
                value={this.state.subtitle}
              />
            </div>
            <div className="form-field">
              <label htmlFor="author">AURTHOR</label>
              <input
                name="author"
                onChange={this.handleEvent}
                value={this.state.author}
              />
            </div>
            <div className="form-field">
              <label htmlFor="published">PUBLISHED</label>
              <input
                name="published"
                onChange={this.handleEvent}
                value={this.state.published}
              />
            </div>
            <div className="form-field">
              <label htmlFor="publisher">PUBLISHER</label>
              <input
                name="publisher"
                onChange={this.handleEvent}
                value={this.state.publisher}
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">DESCRIPTION</label>
              <textarea
                rows={3}
                name="description"
                onChange={this.handleEvent}
                value={this.state.description}
              />
            </div>
          </Modal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    library: state.library,
    selectedBook: state.selectedBook
  };
};

const mapDispatcherToProps = dispatch => {
  return bindActionCreators(
    {
      addBook,
      deleteBook,
      updateBook,
      getBooks,
      selectBook
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(App);

App.defaultProps = {
  headers: ["ISBN", "TITLE", "AURTHOR", "DESCRIPTION", "ACTIONS"]
};
