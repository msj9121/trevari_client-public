import React from "react";
import ReviewItem from "./ReviewItem";

class Reviews extends React.Component {
  clickHandler = () => {
    this.props.getMoreReviews();
  };

  render() {
    return (
      <div id="reviews">
        <div id="reviews-container">
          {this.props.reviews.map((review, id) => (
            <ReviewItem
              review={review}
              key={id}
              deleteReview={this.props.deleteReview}
              reviewsCount={this.props.reviewsCount}
              editedReview={this.props.editedReview}
              editReview={this.props.editReview}
            />
          ))}
        </div>
        <div>
          <button className="more-btn" onClick={this.clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          #reviews {
            border: solid 1px #ced4da;
          }
          #reviews-container {
            display: flex;
            flex-direction: column;
          }
          .more-btn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
            margin-top: 15px;
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
