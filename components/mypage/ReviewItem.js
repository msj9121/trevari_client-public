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
      openBtnName: "펼치기",
    };
  }

  showModal = () => {
    this.setState({
      modalStatus: "block"
    });
  };

  closeModal = () => {
    this.setState({
      modalStatus: "none"
    });
  };

  getBookImage = () => {
    const bareImage = JSON.stringify(this.props.review.Book.image);
    let bookImageURL;
    for (var i = 0; i < bareImage.length; i++) {
      if (bareImage[i] === "?") {
        bookImageURL = bareImage.slice(1, i);
      }
    }
    return bookImageURL;
  };

  getDate = () => {
    const bareDate = JSON.stringify(this.props.review.createdAt);

    let year = bareDate.slice(1, 5);
    let month = bareDate.slice(6, 8);
    let day = bareDate.slice(9, 11);
    let time = bareDate.slice(12, 14);
    let minute = bareDate.slice(15, 17);
    let second = bareDate.slice(18, 20);
    let newDate = `${year}년 ${month}월 ${day}일  ${time}시 ${minute}분 ${second}초`;

    return newDate;
  };

  deleteBtn_handler = () => {
    const review = this.props.review;
    const deleteReview = this.props.deleteReview;

    deleteReview(review);

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

  openReviewBtn_clickHandler = () => {
    if (this.state.reviewStatus === "block") {
      this.props.showReview(this.state.reviewStatus)
      this.setState({
        reviewStatus: "none"
      })
    } else if (this.state.reviewStatus === "none") {
      this.props.showReview(this.state.reviewStatus)
      this.setState({
        reviewStatus: "block"
      })
    }
  }

  openAndShowBtnHandler = () => {
    if (this.state.reviewStatus === "block") {
      document.getElementsByClassName(openReviewBtn).innerHTML = "닫기"
    } else if (this.state.reviewStatus === "none") {
      document.getElementsByClassName(openReviewBtn).innerHTML = "펼치기"
    }
  }

  render() {
    const review = this.props.review;

    return (
      <div id="reviewCard">

        <div id="basicContent">

          <div id="outerContent">
            <Link
              as={`/book/${review.book_id}`}
              href={`/book?id=${review.book_id}`}
            >
              <div className="imageContainer">
                <img
                  src={this.getBookImage()}
                  className="oneImage"
                  align="center"
                />
              </div>
            </Link>
            <div className="myRate" align="center">
              내가 준 평점 : {review.score}
            </div>
            <div className="averageRate" align="center">
              평균 평점 : {review.Book.averageScore}
            </div>
            <div>
              <button className="deleteBtn" onClick={this.deleteBtn_handler}>
                삭제
              </button>
            </div>
            <div>
              <button className="openReviewBtn" onClick={this.openReviewBtn_clickHandler}>
                {this.props.openBtnName}
              </button>
            </div>
            <div>
              <button className="editReviewBtn" onClick={this.showModal}>
                수정하기
              </button>
            </div>
          </div>

          <div id="innerContent">
            <div className="name" type="text">
              {review.Book.title}
            </div>
            <div className="date" type="text">
              작성시간 : {this.getDate()}
            </div>
            <div className="review-box" type="text">
              {review.text}
            </div>
            <div>
              <button className="editReviewBtn2" onClick={this.showModal}>
                수정하기
              </button>
            </div>
          </div>
          
          <EditReview
            closeModal={this.closeModal}
            modalStatus={this.state.modalStatus}
            editedReview={this.props.editedReview}
            editReview={this.props.editReview}
            review={this.props.review}
          />
        </div>
        <style jsx>{`
          #reviewCard {
            display: flex;
            flex-direction: column;
            background: #fcfbf9;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: auto;
            margin-right: auto;
            padding: 20px;
            border-radius: 12px;
            width: 90%;
            
          }
          #basicContent {
            display: flex;
          }
          #outerContent,
          .imageContainer,
          .myRate,
          .averageRate {
            box-shadow: 0px 0px 0px 0px black;
          }
          #innerContent,
          .name,
          .date,
          .review-box {
            box-shadow: 0px 0px 0px 0px red;
          }
          #outerContent {
            background: #fcfbf9;
          }
          .imageContainer {
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
          .myRate {
            margin: 15px 0px 10px 0px;
            background: white;
            width: 100%;
          }
          .averageRate {
            margin-left: 0px;
            margin-right: 0px;
            margin-top: 0px;
            background: white;
            width: 100%;
          }
          .deleteBtn {
            margin-top: 10px;
            display: inline-block;
            background-color: #ff8906;
            color: white;
            font-weight: 500;
            padding: 5px 30px 5px 30px;
            cursor: pointer;
            font-size: 15px;
            width: 100%;
            border: none;
          }
          .deleteBtn:hover {
            color: black;
            background-color: white;
            font-weight: 500;
            box-shadow: 0px 0px 0px 2px #ff8906; 

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
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            width: 100%;
            color: grey;
          }
          .review-box {
            background: white;
            margin-top: 15px;
            height: 250px;
            width: 100%;
            overflow: scroll;
            font-size: 13px;
          }
          .editReviewBtn {
            display: inline-block;
            background-color: #ff8906;
            color: white;
            margin-top: 10px;
            margin-bottom: 10px;
            font-weight: 500;
            padding: 5px 30px 5px 30px;
            cursor: pointer;
            font-size: 15px;
            width: 100%;
            border: none;
          }
          .editReviewBtn:hover {
            color: black;
            background-color: white;
            font-weight: 500;
            box-shadow: 0px 0px 0px 2px #ff8906; 
          }
          .openReviewBtn {
            display: none;
          }
          .editReviewBtn2 {
            display: none;
          }
          @media (max-width: 800px) {
            .openReviewBtn {
              display: inline-block;
              background-color: #ffadff;
              color: white;
              margin-top: 10px;
              margin-bottom: ;
              font-weight: 500;
              padding: 5px 30px 5px 30px;
              cursor: pointer;
              font-size: 15px;
              width: 100%;
              border: none;
            }
            .openReviewBtn:hover {
              color: black;
              background-color: white;
              font-weight: 500;
              box-shadow: 0px 0px 0px 2px #ffadff; 
            }
            #basicContent {
              display: flex;    
              flex-direction: column; 
            }
            .imageContainer {
              width: 150px;
              margin-left: auto;
              margin-right: auto;
            }
            #innerContent {
              display: ${this.state.reviewStatus};
            }
            .editReviewBtn {
              display: none;
            }
            .editReviewBtn2 {
              display: block;
              display: inline-block;
              background-color: #ff8906;
              color: white;
              margin-top: 10px;
              margin-bottom: ;
              font-weight: 500;
              padding: 5px 30px 5px 30px;
              cursor: pointer;
              font-size: 15px;
              width: 100%;
              border: none;
            }
            .editReviewBtn2:hover {
              color: black;
              background-color: white;
              font-weight: 500;
              box-shadow: 0px 0px 0px 2px #ff8906; 
            }
          }
        `}</style>
      </div>
    );
  }
}

export default ReviewItem;
