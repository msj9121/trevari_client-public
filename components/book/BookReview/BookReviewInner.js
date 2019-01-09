import React, { Component } from "react";
import BookReviewAdd from "./BookReviewAdd";

class BookReviewInner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="bookReviewInner">
        {this.props.bookReviewData.sort((a, b)=>(b.id-a.id)).map((review, index) => {
          return (
            <BookReviewAdd
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
