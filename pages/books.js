import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/books/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";
import Filter from "../containers/Filter";
import Spinner from "../components/books/Spinner";

class Books extends Component {
  static async getInitialProps(context) {
    const { input, recommend, userId } = context.query;
    if (input === "") {
      const books = [];
      return { books: books };
    } else if (recommend) {
      if (userId) {
        const res = await axios.get(`${BACKEND_ENDPOINT}${recommend}`, {
          params: {
            userId: userId
          }
        });
        const books = res.data;
        return {
          books
        };
      } else {
        const res = await axios.get(`${BACKEND_ENDPOINT}${recommend}`);
        const books = res.data;

        return {
          books
        };
      }
    } else {
      return {
        input
      };
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      input: this.props.input,
      offset: 0,
      isLoaded: false,
      isFinish: false,
      booksSearch: false
    };
  }

  componentDidMount() {
    if (this.state.input) {
      this._initBooks();
      window.onscroll = this._onScrollGetData;
    }
  }

  _initBooks = () => {
    axios
      .get(`${BACKEND_ENDPOINT}/books/search/title`, {
        params: {
          input: this.state.input,
          offset: this.state.offset
        }
      })
      .then(res => {
        console.log("getBooks :", res.data);
        this.setState({
          books: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  _changeInput = () => {
    this.setState({
      booksSearch: true
    });
  };

  _getBooks = async () => {
    if(this.state.isFinish) {
      return;
    }

    this.setState({
      isLoaded: true
    });

    console.log(this.state.offset, "offset");
    const changeOffset = this.state.offset + 30;

    const res = await axios.get(`${BACKEND_ENDPOINT}/books/search/title`, {
      params: {
        input: this.state.input,
        offset: changeOffset
      }
    });
    const books = res.data;
    console.log("GET BOOKS", books);

    if (books.length === 0) {
      this.setState({
        isFinish: true,
        isLoaded: false
      });
      console.log("데이터가 없습니다.");
      return;
    } else {
      this.setState({
        books: this.state.books.concat(books),
        offset: changeOffset,
        isLoaded: false
      });
      return;
    }
  };

  _onScrollGetData = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop - 4 <= clientHeight) {
      this._getBooks();
    }
  };

  render() {
    if(this.state.booksSearch) {
      location.reload();
    }
    return (
      <React.Fragment>
        <Filter _changeInput={this._changeInput} />
        <div id="books">
          <div id="books_box">
            {this.state.books ? (
              this.state.books.map((book, index) => {
                return (
                  <Bookcollection book={book} key={index} ID={this.props.ID} />
                );
              })
            ) : (
              <Spinner />
            )}

            {this.state.isLoaded ? <Spinner /> : <div />}
          </div>

          <style jsx>{`
            #books {
              background: rgba(0, 0, 0, 0.03);
              padding-top: 60px;
              padding-bottom: 5px;
            }
            #books_box {
              margin: 0 auto;
              max-width: 1140px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              background-color: white;
              border: 1px solid #ddd;
            }
            @media screen and (max-width: 600px) {
              #books_box {
                width: 100%;

                
              }
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}

export default Books;
