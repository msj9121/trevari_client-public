import React, { Component } from "react";
import BookReview from "./BookReview";
import Spinner from "../../books/Spinner";

class BookReviewInner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props._chackUserReview();
  }

  render() {
    return (
      <div id="bookReviewInner">
        {this.props.pushLoaded ? <Spinner /> : <div />}
        {this.props.bookReviewData
          .sort((a, b) => b.id - a.id)
          .map((review, index) => {
            return (
              <BookReview
                ID={this.props.ID}
                user_id={review.user_id}
                book_id={review.book_id}
                score={review.score}
                text={review.text}
                email={review.User.email}
                createdAt={review.createdAt}
                key={index}
                _getReviewChange={this.props._getReviewChange}
                _Loading={this.props._Loading}
                isLoaded={this.props.isLoaded}
              />
            );
          })}
        <style jsx>{`
          #bookReviewInner {
            padding: 15px;
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewInner;
