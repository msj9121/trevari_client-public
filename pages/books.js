import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/books/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";
import Filter from "../containers/Filter";

class Books extends Component {
  static async getInitialProps(context) {
    const { input } = context.query;

    const books = await axios
      .post(`${BACKEND_ENDPOINT}/books/searchByTitle`, { input })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });

    return {
      books
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate--nextProps", nextProps.books);
    // console.log("shouldComponentUpdate--nextState", nextState.books);
    // console.log("shouldComponentUpdate--thisState", this.state.books);
    if (nextProps.books !== this.state.books) {
      this.setState({
        books: nextProps.books
      });
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Filter />
        <div id="books">
          <div id="books_box">
            {this.state.books.map((book, index) => {
              return (
                <Bookcollection book={book} key={index} ID={this.props.ID} />
              );
            })}
          </div>

          <style jsx>{`
            #books {
              background: rgba(0, 0, 0, 0.03);
            }
            #books_box {
              margin: 0 auto;
              max-width: 1140px;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              background-color: white;
              border-left: 1px solid #ddd;
              border-right: 1px solid #ddd;
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
