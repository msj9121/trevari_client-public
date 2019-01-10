import React, { Component } from "react";
import BookReview from "./BookReview";

class BookReviewInner extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props._chackUserReview()
  }

  render() {
    return (
      <div id="bookReviewInner">
        {this.props.bookReviewData.sort((a, b)=>(b.id-a.id)).map((review, index) => {
          return (
            <BookReview
              ID={this.props.ID}
              user_id={review.user_id}
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
