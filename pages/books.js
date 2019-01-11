import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/books/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";

class Books extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    console.log("Books", context.query.input);
    const res = await axios.post(
      `${BACKEND_ENDPOINT}/books/searchByTitle`,
      { input: context.query.input }
    );
    const data = res.data.slice(0, 30);

    return {
      books: data
    };
  }

  render() {
    return (
      <div id="books">
        <div id="books_box">
          {this.props.books.map((book, index) => {
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
            width: 60%;
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
    );
  }
}

export default Books;
