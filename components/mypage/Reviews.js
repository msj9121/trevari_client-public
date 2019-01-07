import React from "react";
import ReviewItem from "./ReviewItem";

class Reviews extends React.Component {
  render() {
    return (
      <div id="ratedBooks">
        <div id="ratedCardContainer">
          {this.props.reviews.map((review, id) => (
            <ReviewItem
              review={review}
              key={id}
              deleteReview={this.props.deleteReview}
            />
          ))}
        </div>
        <div>
          <button className="viewMore" onClick={this.clickHandler}>더보기</button>
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

  clickHandler = () => {
    this.props.getMoreReviews()
  }
}

export default Reviews;
