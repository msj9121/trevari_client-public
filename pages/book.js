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
      bookMarkData: this.props.bookMarkData,
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

  _changeBookMarkData = async () => {
    const res = await axios.post(
      `${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`,
      {
        userId: this.props.ID
      }
    );
    const changeBookmark = await res.data;
    console.log("GET-changeBookmarkDatas response : ", changeBookmark);
    this.setState({
      bookMarkData: changeBookmark
    });
  };

  _filterBookmarkId = () => {
    if (this.props.ID && this.state.bookMarkData) {
      const bookId = this.props.book.id;
      const bookmarkData = this.state.bookMarkData;
      for (let i = 0; i < bookmarkData.length; i++) {
        if (bookmarkData[i].book_id === bookId) {
          return bookmarkData[i].id;
        }
      }
    } else {
      console.log("유저정보가 없습니다.");
    }
  };

  _renderBookmarkBtn = () => {
    const bookmark_Id = this._filterBookmarkId();
    if (this.props.ID && bookmark_Id) {
      return (
        <span
          className="book_titlebox_deleteBookmarkBtn"
          onClick={this._deleteBookmark}
        >
          - 읽고싶어요
          <style jsx>{`
            .book_titlebox_deleteBookmarkBtn {
              background-color: #246db7;
              color: white;
              font-size: 20px;
              padding: 5px 15px 5px 15px;
              margin-top: 10px;
              margin-right: 15px;
              cursor: pointer;
            }
            @media screen and (max-width: 600px) {
              .book_titlebox_deleteBookmarkBtn {
                font-size: 15px;
              }
            }
          `}</style>
        </span>
      );
    } else {
      return (
        <span
          className="book_titlebox_addBookmarkBtn"
          onClick={this._addBookmark}
        >
          + 읽고싶어요
          <style jsx>{`
            .book_titlebox_addBookmarkBtn {
              background-color: #ff8906;
              color: white;
              font-size: 20px;
              padding: 5px 15px 5px 15px;
              margin-top: 10px;
              margin-right: 15px;
              cursor: pointer;
            }
            @media screen and (max-width: 600px) {
              .book_titlebox_addBookmarkBtn {
                font-size: 15px;
              }
            }
          `}</style>
        </span>
      );
    }
  };

  _addBookmark = async () => {
    if (this.props.ID) {
      const res = await axios.post(
        `${BACKEND_ENDPOINT}/bookmarks/addBookmark`,
        {
          userId: this.props.ID,
          bookId: this.props.book.id
        }
      );
      const data = await res.data;
      console.log("POST-addBookmark response : ", data);
      /* --------------------------------------BookMark state change--------------------------------------------------------- */
      this._changeBookMarkData();
    } else {
      alert("로그인 해주세요!");
    }
  };

  _deleteBookmark = async () => {
    if (this.props.ID) {
      const bookmark_Id = this._filterBookmarkId();
      const res = await axios.post(
        `${BACKEND_ENDPOINT}/bookmarks/deleteBookmark`,
        {
          userId: this.props.ID,
          bookmarkId: bookmark_Id
        }
      );
      const data = await res.data;
      console.log("POST-deleteBookmark response : ", data);
      /* --------------------------------------BookMark state change--------------------------------------------------------- */
      this._changeBookMarkData();
    } else {
      alert("로그인 해주세요!");
    }
  };

  _renderBookReviewbox = () => {
    if (this.state.review) {
      return (
        <BookReviewbox
          ID={this.props.ID}
          bookId={this.props.book.id}
          bookReviewData={this.props.bookReviewData}
        />
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
            _renderBookmarkBtn={this._renderBookmarkBtn}
            _renderReviewBtn={this._renderReviewBtn}
          />
          {this._renderBookReviewbox()}
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
