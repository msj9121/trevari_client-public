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
        <div className="moreBtn-container">
          <button className="more-btn" onClick={this.clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          #reviews {
            
          }
          #reviews-container {
            
          }
          .moreBtn-container {
            display: flex;
          }
          .more-btn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .more-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
