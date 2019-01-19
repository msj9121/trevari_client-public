import React, { Component } from "react";
import BookReviewScore from "./BookReviewbox/BookReviewScore";
import BookReviewInput from "./BookReviewbox/BookReviewInput";
import BookReviewInner from "./BookReviewbox/BookReviewInner";

class BookReviewbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      ratingValue: 0
    };
  }

  _onStarClick = (nextValue, prevValue, name) => {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  render() {
    return (
      <div className="book_reviewbox">
        {this.props.review ? (
          <div>
            <BookReviewScore
              _onStarClick={this._onStarClick}
              rating={this.state.rating}
              ratingValue={this.state.ratingValue}
            />
            <BookReviewInput
              ID={this.props.ID}
              bookId={this.props.bookId}
              _getReviewChange={this.props._getReviewChange}
              isReviewed={this.props.isReviewed}
              ratingValue={this.state.ratingValue}
              _PushLoading={this.props._PushLoading}
            />
          </div>
        ) : (
          <div />
        )}
        <BookReviewInner
          ID={this.props.ID}
          bookId={this.props.bookId}
          bookReviewData={this.props.bookReviewData}
          _chackUserReview={this.props._chackUserReview}
          _getReviewChange={this.props._getReviewChange}
          _Loading={this.props._Loading}
          isLoaded={this.props.isLoaded}
          pushLoaded={this.props.pushLoaded}
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
