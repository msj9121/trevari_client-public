import React, { Component } from "react";
import axios from "axios";
import BookTitlebox from "../components/book/BookTitlebox";
import BookReviewbox from "../components/book/BookReviewbox";
import { BACKEND_ENDPOINT } from "../constant";

class Book extends Component {
  static async getInitialProps(context) {
    const { id, ID } = context.query;

    const book = await axios
      .post(`${BACKEND_ENDPOINT}/books/getBookById`, { id })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      });

    const bookReviewData = await axios
      .post(`${BACKEND_ENDPOINT}/reviews/getReviewsForBookId`, {
        bookId: id
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      });

    if (ID) {
      const bookMarkData = await axios
        .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, {
          userId: ID
        })
        .then(response => response.data)
        .catch(err => {
          console.log(err);
        });

      return { book, bookMarkData, bookReviewData };
    }

    return { book, bookReviewData };
  }

  constructor(props) {
    super(props);
    this.state = {
      review: false
    };
  }

  _startReview = () => {
    this.setState({
      review: true
    });
  };

  _endReview = () => {
    this.setState({
      review: false
    });
  };

  _renderReviewBtn = () => {
    if (this.state.review) {
      return (
        <span className="book_titlebox_endReviewBtn" onClick={this._endReview}>
          - 평점보기
          <style jsx>{`
            .book_titlebox_endReviewBtn {
              color: white;
              background-color: #246db7;
              font-size: 20px;
              padding: 5px 25px 5px 25px;
              cursor: pointer;
            }
            @media screen and (max-width: 600px) {
              .book_titlebox_endReviewBtn {
                font-size: 15px;
                padding: 5px 20px 5px 20px;
              }
            }
          `}</style>
        </span>
      );
    } else {
      return (
        <span
          className="book_titlebox_startReviewBtn"
          onClick={this._startReview}
        >
          + 평점보기
          <style jsx>{`
            .book_titlebox_startReviewBtn {
              background-color: #ff8906;
              color: white;
              font-size: 20px;
              padding: 5px 25px 5px 25px;
              cursor: pointer;
            }
            @media screen and (max-width: 600px) {
              .book_titlebox_startReviewBtn {
                font-size: 15px;
                padding: 5px 20px 5px 20px;
              }
            }
          `}</style>
        </span>
      );
    }
  };

  render() {
    // console.log("Book.js--bookMarkData : ", this.state.bookMarkData);
    // console.log("Book.js--bookReviewData : ", this.props.bookReviewData);
    return (
      <div id="book">
        <div id="book_box">
          <BookTitlebox
            book={this.props.book}
            _renderReviewBtn={this._renderReviewBtn}
            bookMarkData={this.props.bookMarkData}
            ID={this.props.ID}
          />
          {this.state.review ? (
            <BookReviewbox
              ID={this.props.ID}
              bookId={this.props.book.id}
              bookReviewData={this.props.bookReviewData}
            />
          ) : (
            console.log("review---hide")
          )}
        </div>

        <style jsx>{`
          #book {
            background: rgba(0, 0, 0, 0.03);
          }
          #book_box {
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            margin: 0 auto;
            width: 60%;
            background: white;
          }
          @media screen and (max-width: 600px) {
            #book_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Book;
