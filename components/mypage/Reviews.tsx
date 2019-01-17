import React, { Component } from "react";
import ReviewItem, { IReview } from "./ReviewItem";
import Spinner from "../books/Spinner";
import { IReviews } from "../../pages/Mypage";

interface ReviewsProps {
  reviews: IReviews
  _deleteReview: Function
  _getMoreReviews: Function
  editedReview: String
  _editReview: Function
  loading: Boolean
  _changeLoadingState: Function
}

class Reviews extends Component<ReviewsProps> {
  constructor(props: ReviewsProps) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let scrollHeight = document.documentElement.scrollHeight;
    let scrollTop = document.documentElement.scrollTop;
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.props._getMoreReviews();
    }
  };

  _moreBtn_clickHandler = () => {
    this.props._getMoreReviews();
  };

  render() {
    return (
      <div id="reviews">
        <div id="reviews_container">
          {this.props.reviews.map((review: IReviews, id: any) => {
            <ReviewItem
              review={review}
              key={id}
              _deleteReview={this.props._deleteReview}
              editedReview={this.props.editedReview}
              _editReview={this.props._editReview}
            />;
          })}
        </div>
        <div className="spinner">
          {this.props.loading === true ? <Spinner /> : <div />}
        </div>
        <style jsx>{`
          #reviews_container {
            margin: 10px;
          }
          .moreViewBtn_container {
            display: flex;
            justify-content: center;
            margin: 0px 10px 10px 10px;
          }
          .moreViewBtn {
            font-size: 16px;
            font-weight: 600;
            width: 100%;
            height: 30px;
            color: white;
            border: none;
            background-color: #ff8906;
            cursor: pointer;
            outline-style: none;
          }
          .moreViewBtn:hover {
            background-color: #e07300;
          }
          .spinner {
            height: 100px;
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
