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
      review: false,
      isReviewed: false,
      bookReviewData: this.props.bookReviewData
    };
  }

  _chackUserReview = () => {
    if (this.props.ID) {
      const userId = this.props.ID;
      const reviewData = this.state.bookReviewData;
      for (let i = 0; i < reviewData.length; i++) {
        if (reviewData[i].user_id === userId) {
          console.log("_chackUserReview", "평점이 있습니다.")
          this.setState({
            isReviewed: true
          });
          console.log("_chackUserReview---isReviewed : ", true)
        }
      }
    } else {
      console.log("평점이 없습니다.")
    }
  };

  _toggle = () => {
		this.setState({
			review: !this.state.review
		});
	}

  _getReviewChange = async check => {
    if (check) {
      const changeBookReviews = await axios
        .post(`${BACKEND_ENDPOINT}/reviews/getReviewsForBookId`, {
          bookId: this.props.book.id
        })
        .then(res => {
          console.log("get 성공", res.data);
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });
      console.log("getReviewChange", changeBookReviews)
      this.setState({
        bookReviewData: changeBookReviews,
        isReviewed: true
      });
    } else {
      console.log("get 실패");
    }
  };

  render() {
    return (
      <div id="book">
        <div id="book_box">
          <BookTitlebox
            book={this.props.book}
            review={this.state.review}
            _toggle={this._toggle}
            bookMarkData={this.props.bookMarkData}
            ID={this.props.ID}
          />
          {this.state.review ? (
            <BookReviewbox
              ID={this.props.ID}
              bookId={this.props.book.id}
              // bookReviewData={this.props.bookReviewData}
              bookReviewData={this.state.bookReviewData}
              _getReviewChange={this._getReviewChange} //
              isReviewed={this.state.isReviewed} //
              _chackUserReview={this._chackUserReview} //
            />
          ) : (
            console.log("reviewbox---hide")
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
