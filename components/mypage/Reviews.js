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
        <style jsx>{`
          #ratedBooks {
            border: solid 1px #ced4da;
          }
          #ratedCardContainer {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
