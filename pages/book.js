import React, { Component } from "react";
import axios from "axios";
import BookTitlebox from "../components/book/BookTitlebox";
import BookReviewbox from "../components/book/BookReviewbox";
import { BACKEND_ENDPOINT } from "../constant";
import Filter from "../containers/Filter";
import Router from "next/router";

class Book extends Component {
  static async getInitialProps(context) {
    const { id, ID } = context.query;

    const book = await axios
      .get(`${BACKEND_ENDPOINT}/books/id`, {
        params: {
          id: id
        }
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      });

    const bookReviewData = await axios
      .get(`${BACKEND_ENDPOINT}/reviews/book-id`, {
        params: {
          bookId: id
        }
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
      });

    if (ID) {
      const bookMarkData = await axios
        .get(`${BACKEND_ENDPOINT}/bookmarks/my-bookmarks/all`, {
          params: {
            userId: ID
          }
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
      review: false,
      isReviewed: false,
      book: this.props.book,
      bookReviewData: this.props.bookReviewData,
      bookReviewLength: this.props.bookReviewData.length,
      bookMarkData: this.props.bookMarkData,
      isLoaded: false,
      pushLoaded: false
    };
  }

  _Loading = () => {
    this.setState({
      isLoaded: true
    });
  };

  _PushLoading = () => {
    this.setState({
      pushLoaded: true
    });
  }

  _onSearchBookTitle = title => {
    Router.push("/books?input=" + title);
  };

  //------------------BookReview----------------------------//

  _toggle = () => {
    this.setState({
      review: !this.state.review
    });
  };

  _chackUserReview = () => {
    if (this.props.ID) {
      const userId = this.props.ID;
      const reviewData = this.state.bookReviewData;
      for (let i = 0; i < reviewData.length; i++) {
        if (reviewData[i].user_id === userId) {
          console.log("_chackUserReview", "평점이 있습니다.");
          this.setState({
            isReviewed: true
          });
        }
      }
    } else {
      console.log("평점이 없습니다.");
    }
  };

  _getReviewChange = async (check, del) => {
    if (check) {
      const changeBookReviews = await axios
        .get(`${BACKEND_ENDPOINT}/reviews/book-id`, {
          params: {
            bookId: this.state.book.id
          }
        })
        .then(res => {
          console.log("GET BookReviews 성공");
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });
      const changeBook = await axios
        .get(`${BACKEND_ENDPOINT}/books/id`, {
          params: {
            id: this.state.book.id
          }
        })
        .then(res => {
          console.log("GET Book 성공");
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });

      this.setState({
        bookReviewData: changeBookReviews,
        bookReviewLength: changeBookReviews.length,
        book: changeBook,
        pushLoaded: false,
        isLoaded: false,
        isReviewed: del === false ? false : true
      });
      console.log("Change BookReviews, Book 성공");
    } else {
      console.log("GET 실패");
    }
  };

  //------------------BookMark----------------------------//

  _changeBookMarkData = async () => {
    const res = await axios.get(`${BACKEND_ENDPOINT}/bookmarks/my-bookmarks/all`, {
      params: {
        userId: this.props.ID
      }
    });
    const changeBookmark = res.data;
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
          const bookmarkId = bookmarkData[i].id;
          return bookmarkId;
        }
      }
    } else {
      console.log("유저정보가 없습니다.");
    }
  };

  render() {
    return (
      <React.Fragment>
        <Filter _onSearchBookTitle={this._onSearchBookTitle}/>
        <div id="book">
          <div id="book_box">
            <BookTitlebox
              ID={this.props.ID}
              book={this.state.book}
              review={this.state.review}
              bookMarkData={this.state.bookMarkData}
              bookReviewLength={this.state.bookReviewLength}
              _toggle={this._toggle}
              _changeBookMarkData={this._changeBookMarkData}
              _filterBookmarkId={this._filterBookmarkId}
            />
            <BookReviewbox
              ID={this.props.ID}
              review={this.state.review}
              bookId={this.props.book.id}
              isReviewed={this.state.isReviewed}
              bookReviewData={this.state.bookReviewData}
              _getReviewChange={this._getReviewChange}
              _chackUserReview={this._chackUserReview}
              _Loading={this._Loading}
              isLoaded={this.state.isLoaded}
              _PushLoading={this._PushLoading}
              pushLoaded={this.state.pushLoaded}
            />
          </div>

          <style jsx>{`
            #book {
              background: rgba(0, 0, 0, 0.03);
              padding-top: 60px;
              padding-bottom: 5px;
            }
            #book_box {
              border: 1px solid #ddd;
              margin: 0 auto;
              max-width: 1140px;
              background: white;
            }
            @media screen and (max-width: 600px) {
              #book_box {
                width: 100%;
              }
            }
          `}</style>
        </div>
      </React.Fragment>
    );
  }
}

export default Book;
