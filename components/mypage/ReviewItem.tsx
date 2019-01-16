import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";
import EditReview from "./EditReview";

interface ReviewItemProps {
  review: IReview;
  key: Number;
  _deleteReview: Function;
  editedReview: String;
  _editReview: Function;
}

interface ReveiwItemState {
  editModalStatus: String;
  hiddenReviewStatus: String;
  openBtnName: String;
}

export interface IReview {
  Book: any;
  createdAt: string;
  user_id: Number;
  book_id: Number;
  score: Number;
  text: String;
  id: Number;
}

interface IBook {
  image: string;
}


class ReviewItem extends Component<ReviewItemProps, ReveiwItemState> {
  constructor(props: ReviewItemProps) {
    super(props);
    this.state = {
      editModalStatus: "none",
      hiddenReviewStatus: "none",
      openBtnName: "펼치기"
    };
  }

  _showEditModalBtn_clickHandler = () => {
    if (this.state.editModalStatus === "none") {
      this.setState({
        editModalStatus: "block"
      });
    } else if (this.state.editModalStatus === "block") {
      this.setState({
        editModalStatus: "none"
      });
    }
  };

  _getBookImage = () => {
    const Book: IBook = this.props.review.Book
    const bareImage = Book.image;
    const targetIndex = bareImage.indexOf("?");
    let bookImageURL: string;

    if (targetIndex === -1) {
      bookImageURL = bareImage;
    } else {
      bookImageURL = bareImage.slice(0, targetIndex);
    }
    return bookImageURL; 
  };

  _getDate = () => {
    const bareDate = this.props.review.createdAt;

    let year = bareDate.slice(0, 4);
    let month = bareDate.slice(5, 7);
    let day = bareDate.slice(8, 10);
    let time = bareDate.slice(11, 13);
    let minute = bareDate.slice(14, 16);
    let newDate = `${year}년 ${month}월 ${day}일  ${time}시 ${minute}분`;

    return newDate;
  };

  _deleteReviewBtn_handler = () => {
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

  _openReviewBtn_clickHandler = () => {
    if (this.state.openBtnName === "펼치기") {
      this.setState({
        hiddenReviewStatus: "block",
        openBtnName: "닫기"
      });
    } else if (this.state.openBtnName === "닫기") {
      this.setState({
        hiddenReviewStatus: "none",
        openBtnName: "펼치기"
      });
    }
  };

  render() {
    const review = this.props.review;

    return (
      <div id="reviewCard">
        <div id="outer_content">
          <Link
            as={`/book/${review.book_id}`}
            href={`/book?id=${review.book_id}`}
          >
            <div className="image_container">
              <img
                src={this._getBookImage()}
                className="oneImage"
              />
            </div>
          </Link>
          <div id="myRate">
            내가 준 평점 : {review.score}
          </div>
          <div id="averageRate">
            평균 평점 : {Number(review.Book.averageScore).toFixed(1)}
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
          <div className="name">
            {review.Book.title}
          </div>
          <div className="date">
            작성시간 : {this._getDate()}
          </div>
          <div className="reviewText_box">
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

          <EditReview
            _closeEditModalBtn_clickHandler={
              this._showEditModalBtn_clickHandler
            }
            modalStatus={this.state.editModalStatus}
            editedReview={this.props.editedReview}
            _editReview={this.props._editReview}
            review={this.props.review}
            openBtnName={this.state.openBtnName}
          />
        </div>

        <style jsx>{`
          #reviewCard {
            display: flex;
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
          }
          #outer_content {
            background: #fcfbf9;
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
          #myRate {
            margin: 15px 0px 10px 0px;
            background: white;
            width: 100%;
            text-align: start;
          }
          #averageRate {
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

          .openReviewBtn {
            display: none;
          }
          .hidden_editReviewBtn {
            display: none;
          }
          @media (max-width: 800px) {
            #reviewCard {
              display: flex;
              flex-direction: column;
              align-items: center;

              width: 90%;
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
            #myRate {
              font-size: 12px;
              margin: 10px 0px 5px 0px;
            }
            #averageRate {
              font-size: 12px;
            }
            #innerContent {
              display: ${this.state.hiddenReviewStatus};
            }
            .name {
              font-size: 12px;
            }
            .date {
              font-size: 5px;
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
              width: 140px;
              height: 20px;
              padding: ;
              margin-left: auto;
              margin-right: auto;
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
