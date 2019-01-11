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
    // this.openAndShowBtnHandler = this.openAndShowBtnHandler.bind(this);
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
    let bookImageURL;
    for (var i = 0; i < bareImage.length; i++) {
      if (bareImage[i] === "?") {
        bookImageURL = bareImage.slice(1, i);
      }
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

    _deleteReview(review);

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/deleteReview`, {
        userId: review.user_id,
        bookId: review.book_id
      })
      .then(res => {
        if (res.data) {
          console.log(`삭제된 리뷰 : ${review.Book.title}`);
        }
      })
      .catch(err => console.log(err));
  };

  _openReviewBtn_clickHandler = function() {
    // 및의 메소드와 하나로 합치자
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

  render() {
    const review = this.props.review;

    return (
      <div id="reviewCard">
        <div id="basic_content">
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
            <div id="myRate" align="center">
              내가 준 평점 : {review.score}
            </div>
            <div id="averageRate" align="center">
              평균 평점 : {review.Book.averageScore}
            </div>
            <div className="deleteBtn_container">
              <button
                className="deleteBtn"
                onClick={this._deleteReviewBtn_handler}
              >
                삭제
              </button>
            </div>
            <div>
              <button
                className="openReviewBtn"
                onClick={this._openReviewBtn_clickHandler}
              >
                {this.state.openBtnName}
              </button>
            </div>
            <div>
              <button
                className="editReviewBtn"
                onClick={this._showEditModalBtn_clickHandler}
              >
                수정
              </button>
            </div>
          </div>

          <div id="innerContent">
            <div className="name" type="text">
              {review.Book.title}
            </div>
            <div className="date" type="text">
              작성시간 : {this._getDate()}
            </div>
            <div className="reviewText_box" type="text">
              {review.text}
            </div>
            <div>
              <button
                className="hidden_editReviewBtn"
                onClick={this._showEditModalBtn_clickHandler}
              >
                수정
              </button>
            </div>
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
        <style jsx>{`
          #reviewCard {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #fcfbf9;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1),
              0 3px 10px 0 rgba(0, 0, 0, 0.09);
            margin-top: 10px;
            margin-bottom: 20px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            width: 90%;
          }
          #basic_content {
            display: flex;
          }
          #outer_content {
            background: #fcfbf9;
          }
          .image_container {
            width: 150px;
          }
          .oneImage {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 100%;
          }
          .oneImage:hover {
            cursor: pointer;
          }
          #myRate {
            margin: 15px 0px 10px 0px;
            background: white;
            width: 100%;
            text-align: start;
          }
          #averageRate {
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            background: white;
            width: 100%;
            text-align: start;
          }
          .deleteBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .deleteBtn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          #innerContent {
            padding-left: 10px;
            padding-right: 10px;
            width: 100%;
          }
          .name {
            margin-top: 10px;
            font-size: 20px;
            width: 100%;
            font-weight: bold;
            text-align: center;
            float: end;
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            width: 100%;
            color: grey;
            text-align: end;
          }
          .reviewText_box {
            background: white;
            margin-top: 15px;
            height: 250px;
            width: 100%;
            overflow: scroll;
            font-size: 13px;
          }
          .editReviewBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .editReviewBtn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          .openReviewBtn {
            display: none;
          }
          .hidden_editReviewBtn {
            display: none;
          }
          @media (max-width: 800px) {
            #reviewCard {
              width: 100%;
            }
            .openReviewBtn {
              display: block;
              font-size: 12px;
              width: 100%;
              height: 20px;
              margin-top: 5px;
              color: whitesmoke;
              border: orange solid 1px;
              background-color: orange;
            }
            .openReviewBtn:hover {
              cursor: pointer;
              background-color: #ff7f00;
            }
            #basic_content {
              display: flex;
              flex-direction: column;
              align-items: center;
              width: 100%;
            }
            .image_container {
              width: 150px;
              margin-left: auto;
              margin-right: auto;
            }
            #myRate {
              font-size: 12px;
              margin: 10px 0px 5px 0px;
            }
            #averageRate {
              font-size: 12px;
            }
            #innerContent {
              display: ${this.state.reviewStatus};
            }
            .name {
              font-size: 12px;
            }
            .date {
              font-size: 5px;
            }
            .deleteBtn_container {
            }
            .deleteBtn {
              font-size: 12px;
              height: 20px;
              padding: 0px;
            }
            .editReviewBtn {
              display: none;
            }
            .hidden_editReviewBtn {
              display: block;
              font-size: 12px;
              width: 100%;
              height: 20px;
              padding: ;
              margin-top: 10px;
              color: whitesmoke;
              border: orange solid 1px;
              background-color: orange;
            }
            .hidden_editReviewBtn:hover {
              cursor: pointer;
              background-color: #ff7f00;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ReviewItem;
