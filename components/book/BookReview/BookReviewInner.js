import React, { Component } from "react";
import BookReviewAdd from "./BookReviewAdd";
class BookReviewInner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("BookReviewInner", this.props.bookReviewData);
    return (
      <div id="bookReviewInner">
        {this.props.bookReviewData.reverse().map((review, index) => {
          return (
            <BookReviewAdd
              score={review.score}
              text={review.text}
              email={review.User.email}
              createdAt={review.createdAt}
              key={index}
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
