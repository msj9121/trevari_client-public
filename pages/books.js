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
      const res = await axios.get(`${BACKEND_ENDPOINT}/books/search/title`, {
        params: {
          input: input,
          offset: 0
        }
      });
      const books = res.data;
      return {
        books,
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
      isLoaded: false
    };
    console.log("constructor", this.state.books)
  }

  componentDidMount() {
    if (this.state.input && this.state.books.length !== 0) {
      // this._initBooks();
      window.onscroll = this._onScrollGetData;
    }
    console.log("did", this.state.books)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("shouldComponentUpdate--nextProps", nextProps.input);
  //   console.log("shouldComponentUpdate--nextState", nextState.input);
  //   console.log("shouldComponentUpdate--thisState", this.state.input);
  //   console.log("shouldComponentUpdate--thisProps", this.props.input);
  //   console.log("shouldComponentUpdate--nextProps", nextProps.books);
  //   console.log("shouldComponentUpdate--nextState", nextState.books);
  //   console.log("shouldComponentUpdate--thisProps", this.props.books);
  //   if(nextProps.input !== this.state.input) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  //   if (nextProps.books !== this.state.books) {
  //     this.setState({
  //       books: nextProps.books
  //     });
  //     return false;
  //   } else {
  //     return false;
  //   }

  //   if (nextProps.input !== this.state.input) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  // _initBooks = () => {
  //   axios
  //     .get(`${BACKEND_ENDPOINT}/books/search/title`, {
  //       params: {
  //         input: this.state.input,
  //         offset: this.state.offset
  //       }
  //     })
  //     .then(res => {
  //       console.log("getBooks :", res.data);
  //       this.setState({
  //         books: res.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  _getBooks = async () => {
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
        isLoaded: false
      });
      console.log("데이터가 없습니다.");
      return;
    } else {
      this.setState({
        books: this.state.books.concat(books),
        offset: changeOffset
      });
      return;
    }
  };

  _onScrollGetData = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollHeight - scrollTop === clientHeight) {
      this.setState({
        isLoaded: true
      });
      this._getBooks();
    }
  };

  render() {
    console.log("render", this.state.books)
    return (
      <React.Fragment>
        <Filter />
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
