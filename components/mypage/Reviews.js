import React from "react";
import ReviewItem from "./ReviewItem";

class Reviews extends React.Component {
  clickHandler = () => {
    this.props.getMoreReviews();
  };

  render() {
    return (
      <div id="ratedBooks">
        <div id="ratedCardContainer">
          {this.props.reviews.map((review, id) => (
            <ReviewItem
              review={review}
              key={id}
              deleteReview={this.props.deleteReview}
              reviewsCount={this.props.reviewsCount}
            />
          ))}
        </div>
        <div>
          <button className="viewMore" onClick={this.clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          #ratedBooks {
            border: solid 1px #ced4da;
          }
          #ratedCardContainer {
            display: flex;
            flex-direction: column;
          }
          .viewMore {
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
