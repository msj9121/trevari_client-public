import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

class BookReviewScore extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="bookReviewScore">
        <div className="bookReviewScore_text">별점을 선택해주세요.</div>
        <div className="bookReviewScore_scorebox">
          <StarRatingComponent
            name="rating" 
            starCount={5}
            starColor={"red"}
            value={this.props.rating}
            onStarClick={this.props._onStarClickHover}
            onStarHover={this.props._onStarClickHover}
          />
          <div className="bookReviewScore_scorebox_score">{this.props.ratingValue}</div>
        </div>


        <style jsx>{`
          #bookReviewScore {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bookReviewScore_text {
            font-size: 20px;
          }
          .bookReviewScore_scorebox {
            font-size: 50px;
            margin-bottom: 20px;
            display: flex;
          }
          .bookReviewScore_scorebox_star {
            color: red;
            cursor: pointer;
            font-size: 50px;
          }
          .bookReviewScore_scorebox_score {
            margin-left: 15px;
            color: red;
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewScore;
