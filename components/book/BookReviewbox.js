import React, { Component } from "react";
import BookReviewScore from "./BookReview/BookReviewScore";
import BookReviewInput from "./BookReview/BookReviewInput";
import BookReviewInner from "./BookReview/BookReviewInner";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class BookReviewbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookReviewData: this.props.bookReviewData,
      rating: 0,
      ratingValue: 0
    };
  }

  _onStarClick = (nextValue, preValue, name) => {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _onStarHover = (nextValue, prevValue, name) => {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _getReviewChange = async chack => {
    if (chack) {
      const changeBookReviews = await axios
        .post(`${BACKEND_ENDPOINT}/reviews/getReviewsForBookId`, {
          bookId: this.props.bookId
        })
        .then(res => {
          console.log("get 성공", res.data);
          return res.data;
        })
        .catch(err => {
          console.log(err);
        });

      this.setState({
        bookReviewData: changeBookReviews
      });
    } else {
      console.log("get 실패");
    }
  };

  render() {
    return (
      <div className="book_reviewbox">
        <BookReviewScore
          _onStarClick={this._onStarClick}
          _onStarHover={this._onStarHover}
          rating={this.state.rating}
          ratingValue={this.state.ratingValue}
        />
        <BookReviewInput
          ID={this.props.ID}
          bookId={this.props.bookId}
          _getReviewChange={this._getReviewChange}
          ratingValue={this.state.ratingValue}
        />
        <BookReviewInner
          ID={this.props.ID}
          bookId={this.props.bookId}
          bookReviewData={this.state.bookReviewData}
        />

        <style jsx>{`
          .book_reviewbox {
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
          }
          @media screen and (max-width: 600px) {
            .book_reviewbox {
              width: 97%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewbox;
