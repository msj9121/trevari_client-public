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
              showReview={this.props.showReview}
              openBtnName={this.props.openBtnName}
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
          }
          #reviews-container {
            display: flex;
            flex-direction: column;
          }
          .more-btn {
            margin-top: 10px;
            margin-bottom: 5px;
            display: inline-block;
            background-color: white;
            color: black;
            font-weight: 500;
            padding: 5px 30px 5px 30px;
            cursor: pointer;
            font-size: 15px;
            width: 100%;
            border: solid 2px #ff8906;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .more-btn:hover {
            color: black;
            background-color: white;
            font-weight: 500;
            box-shadow: 0px 0px 0px 2px #ff8906;
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
