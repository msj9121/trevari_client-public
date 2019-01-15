import React from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";
import EditReview from "./EditReview";

class ReviewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: "none",
      reviewStatus: "none",
      openBtnStatus: "none",
      openBtnName: "펼치기"
    };

    this._showEditModalBtn_clickHandler = this._showEditModalBtn_clickHandler.bind(
      this
    );
    this._closeEditModalBtn_clickHandler = this._closeEditModalBtn_clickHandler.bind(
      this
    );
    this._getBookImage = this._getBookImage.bind(this);
    this._getDate = this._getDate.bind(this);
    this._deleteReviewBtn_handler = this._deleteReviewBtn_handler.bind(this);
    this._openReviewBtn_clickHandler = this._openReviewBtn_clickHandler.bind(
      this
    );
  }

  _showEditModalBtn_clickHandler = function() {
    this.setState({
      modalStatus: "block"
    });
  };

  _closeEditModalBtn_clickHandler = function() {
    this.setState({
      modalStatus: "none"
    });
  };

  _getBookImage = function() {
    const bareImage = JSON.stringify(this.props.review.Book.image);
    const targetIndex = bareImage.indexOf("?");
    let bookImageURL;

    if (targetIndex === -1) {
      bookImageURL = this.props.review.Book.image;
    } else {
      bookImageURL = bareImage.slice(1, targetIndex);
    }
    return bookImageURL;
  };

  _getDate = function() {
    const bareDate = JSON.stringify(this.props.review.createdAt);

    let year = bareDate.slice(1, 5);
    let month = bareDate.slice(6, 8);
    let day = bareDate.slice(9, 11);
    let time = bareDate.slice(12, 14);
    let minute = bareDate.slice(15, 17);
    let newDate = `${year}년 ${month}월 ${day}일  ${time}시 ${minute}분`;

    return newDate;
  };

  _deleteReviewBtn_handler = function() {
    const review = this.props.review;
    const _deleteReview = this.props._deleteReview;

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/deleteReview`, {
        userId: review.user_id,
        bookId: review.book_id
      })
      .then(res => {
        if (res.data) {
          console.log(`삭제된 리뷰 : ${review.Book.title}`);
          _deleteReview(review);
        }
      })
      .catch(err => console.log(err));
  };

  _openReviewBtn_clickHandler = function() {
    if (this.state.openBtnName === "펼치기") {
      this.props._showReview(this.state.reviewStatus);
      this.setState({
        reviewStatus: "block",
        openBtnName: "닫기"
      });
    } else if (this.state.openBtnName === "닫기") {
      this.props._showReview(this.state.reviewStatus);
      this.setState({
        reviewStatus: "none",
        openBtnName: "펼치기"
      });
    }
  };

  _renderMyStar = () => {
    if (this.props.review.score === 10) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
          `}</style>
        </div>
      );
    } else if (this.props.review.score === 8) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (this.props.review.score === 6) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (this.props.review.score === 4) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (this.props.review.score === 2) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (this.props.review.score === 0) {
      return (
        <div className="star">
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    }
  };

  _renderAverageStar = () => {
    if (
      9 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore <= 10
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
          `}</style>
        </div>
      );
    } else if (
      8 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore < 9
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      6 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore < 8
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      4 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore < 6
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      2 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore < 4
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      0 <= this.props.review.Book.averageScore &&
      this.props.review.Book.averageScore < 2
    ) {
      return (
        <div className="star">
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    }
  };

  render() {
    const review = this.props.review;

    return (
      <div id="reviewCard">
        <div className="reviewCard_box">
          <div id="outer_content">
            <Link
              as={`/book/${review.book_id}`}
              href={`/book?id=${review.book_id}`}
            >
              <div className="image_container">
                <img
                  src={this._getBookImage()}
                  className="oneImage"
                  align="center"
                />
              </div>
            </Link>
            <div>
              <button
                className="openReviewBtn"
                onClick={this._openReviewBtn_clickHandler}
              >
                {this.state.openBtnName}
              </button>
            </div>
          </div>

          <div id="innerContent">
            <div className="top">
              <div className="name" type="text">
                {review.Book.title}
              </div>
              <div className="date" type="text">
                작성시간 : {this._getDate()}
              </div>
            </div>
            <div className="reviewText_box" type="text">
              <div className="reviewText">{review.text}</div>
              <div className="bottom">
                <div>
                  <div className="myRate">
                    <div>내가 남긴 평점 : </div>
                    {this._renderMyStar()}
                    <div>{review.score}</div>
                  </div>
                  <div className="averageRate">
                    <div>평균 평점 : </div>
                    {this._renderAverageStar()}
                    <div>{Number(review.Book.averageScore).toFixed(1)}</div>
                  </div>
                </div>
                <div className="editDelete_container">
                  <div className="editReviewBtn_container">
                    <button
                      className="editReviewBtn"
                      onClick={this._showEditModalBtn_clickHandler}
                    >
                      수정
                    </button>
                  </div>
                  <div className="deleteBtn_container">
                    <button
                      className="deleteBtn"
                      onClick={this._deleteReviewBtn_handler}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="hidden_editReviewBtn"
                onClick={this._showEditModalBtn_clickHandler}
              >
                수정
              </button>
            </div>

            <EditReview
              _closeEditModalBtn_clickHandler={
                this._closeEditModalBtn_clickHandler
              }
              modalStatus={this.state.modalStatus}
              editedReview={this.props.editedReview}
              _editReview={this.props._editReview}
              review={this.props.review}
              openBtnName={this.props.openBtnName}
            />
          </div>
        </div>

        <div className="reviewText-hidden">{review.text}</div>

        <style jsx>{`
          #reviewCard {
            display: flex;
            flex-wrap: wrap;
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
          }
          .reviewCard_box {
            display: flex;
            width: 100%;
          }
          #outer_content {
            height: 200px;
          }
          .image_container {
            width: 150px;
            height: 200px;
          }
          .oneImage {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 100%;
            height: 100%;
          }
          .oneImage:hover {
            cursor: pointer;
          }
          .myRate {
            display: flex;
            flex-wrap: wrap;
            font-size: 16px;
            font-weight: 500;
          }
          .averageRate {
            display: flex;
            flex-wrap: wrap;
            font-size: 16px;
            font-weight: 500;
          }
          .editDelete_container {
            display: flex;
            align-items: flex-end;
            margin-top: 10px;
          }
          .deleteBtn {
            font-size: 15px;
            font-weight: 600;
            padding: 3px 20px 3px 20px;
            color: white;
            background-color: #ff8906;
            border: none;
            cursor: pointer;
            border-radius: .15rem;
          }
          .deleteBtn:hover {
            background-color: #e07300;
          }
          
          .editReviewBtn {
            font-size: 15px;
            font-weight: 600;
            padding: 3px 20px 3px 20px;
            outline-style: none;
            color: white;
            background-color: #ff8906;
            margin-right: 10px;
            border: none;
            cursor: pointer;
            border-radius: .15rem;
          }
          .editReviewBtn:hover {
            background-color: #e07300;
          }
          #innerContent {
            margin: 10px 0px 0px 30px;
            width: 100%;
          }
          .top {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-bottom: 10px;
          }
          .name {
            font-size: 16px;
            font-weight: 600;
          }
          .date {
            font-size: 12px;
            color: grey;
            margin-top: 5px;
          }
          .reviewText_box {
            font-size: 13px;
            
          }
          .reviewText {
            margin-bottom: 20px;
            height: 70px;
            
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
          }
          .openReviewBtn {
            display: none;
          }
          .hidden_editReviewBtn {
            display: none;
          }
          .reviewText-hidden {
            margin-top: 15px;
            font-size: 13px;
            display: none;
          }
          @media (max-width: 600px) {
            .top {
              
            }
            .reviewText {
              display: none;
            }
            .reviewText-hidden {
              display: block;
            }
            .myRate {
              font-size: 14px;
            }
            .averageRate {
              font-size: 14px;
            }
            // #reviewCard {
            //   display: flex;
            //   flex-direction: column;
            //   align-items: center;

            //   width: 90%;
            // }
            // .openReviewBtn {
            //   display: block;
            //   font-size: 12px;
            //   width: 100%;
            //   height: 20px;
            //   margin-top: 5px;
            //   color: whitesmoke;
            //   border: orange solid 1px;
            //   background-color: orange;
            // }
            // .openReviewBtn:hover {
            //   cursor: pointer;
            //   background-color: #ff7f00;
            // }
            // #myRate {
            //   font-size: 12px;
            //   margin: 10px 0px 5px 0px;
            // }
            // #averageRate {
            //   font-size: 12px;
            // }
            // #innerContent {
            //   display: ${this.state.reviewStatus};
            // }
            // .name {
            //   font-size: 12px;
            // }
            // .date {
            //   font-size: 5px;
            // }
            // .deleteBtn {
            //   font-size: 12px;
            //   height: 20px;
            //   padding: 0px;
            // }
            // .editReviewBtn {
            //   display: none;
            // }
            // .hidden_editReviewBtn {
            //   display: block;
            //   font-size: 12px;
            //   width: 140px;
            //   height: 20px;
            //   padding: ;
            //   margin-left: auto;
            //   margin-right: auto;
            //   margin-top: 10px;
            //   color: whitesmoke;
            //   border: orange solid 1px;
            //   background-color: orange;
            // }
            // .hidden_editReviewBtn:hover {
            //   cursor: pointer;
            //   background-color: #ff7f00;
            // }
          }
        `}</style>
      </div>
    );
  }
}

export default ReviewItem;
