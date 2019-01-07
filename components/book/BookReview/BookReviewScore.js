import React, { Component } from 'react';

class BookReviewScore extends Component {
  render() {
    return (
      <div id="bookReviewScore">
        <div className="bookReviewScore_text">별점을 선택해주세요.</div>
        <div className="bookReviewScore_scorebox">
          <span className="bookReviewScore_scorebox_star"><i className="fas fa-star"></i></span>
          <span className="bookReviewScore_scorebox_star"><i className="fas fa-star"></i></span>
          <span className="bookReviewScore_scorebox_star"><i className="fas fa-star"></i></span>
          <span className="bookReviewScore_scorebox_star"><i className="far fa-star"></i></span>
          <span className="bookReviewScore_scorebox_star"><i className="far fa-star"></i></span>
          <span className="bookReviewScore_scorebox_score">6</span>
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
          }
          .bookReviewScore_scorebox_star {
            color: red;
            cursor: pointer;
            font-size: 50px;
          }
          .bookReviewScore_scorebox_score {
            margin-left: 10px;
            color: red;
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewScore;
