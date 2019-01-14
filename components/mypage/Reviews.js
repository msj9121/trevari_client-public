import React from "react";
import ReviewItem from "./ReviewItem";

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    
    this._moreBtn_clickHandler = this._moreBtn_clickHandler.bind(this);
  }

  _moreBtn_clickHandler = function() {
    this.props._getMoreReviews();
  };

  render() {
    return (
      <div id="reviews">
        <div id="reviews_container">
          {this.props.currentReviews.map((review, id) => (
            <ReviewItem
              review={review}
              key={id}
              _deleteReview={this.props._deleteReview}
              editedReview={this.props.editedReview}
              _editReview={this.props._editReview}
              _showReview={this.props._showReview}
              openBtnName={this.props.openBtnName}
            />
          ))}
        </div>
        <div className="moreViewBtn_container">
          <button className="moreViewBtn" onClick={this._moreBtn_clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          #reviews_container {
            margin: 10px;
          }
          .moreViewBtn_container {
            display: flex;
            justify-content: center;
          }
          .moreViewBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .moreViewBtn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 800px) {
            .moreViewBtn {
              font-size: 12px;
              height: 20px;
              padding: 0px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
