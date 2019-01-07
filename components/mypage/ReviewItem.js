import React from "react";
import Link from "next/link";
import axios from "axios";

const URL = "http://3.16.58.104:5000";
// const URL = "http://localhost:5000";

class ReviewItem extends React.Component {
  render() {
    const review = this.props.review;
    
    return (
      <div id="content">
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
              <button
                className="deleteBtn"
                onClick={this.deleteBtn_handler}
              >
                삭제
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
            <div className="summary" type="text	7">
              {review.text}
            </div>
            <div>
              <button className="editReviewBtn">수정하기</button>
            </div>
          </div>
        </div>

        <div className="hideContent">
          <div className="editContainer">
            <input className="editReview" placeholder="내용을 작성해 주세요"></input>
          </div>
          <div>
            <button className="editReviewBtn">수정하기</button>
          </div>
        </div>

        <style jsx>{`
          #content {
            display: flex;
            flex-direction: column;
            background: #fff3e8;
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 0px 0px 0px 1px red;
          }
          #basicContent {
            display: flex;
          }
          #content,
          #outerContent,
          .imageContainer,
          .deleteBtn,
          .myRate,
          .averageRate,
          #innerContent,
          .name,
          .date,
          .summary,
          .hideContent {
            box-shadow: 0px 0px 0px 1px red;
          }
          #outerContent {
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #fcfbf9;
          }
          .imageContainer {
            width: 150px;
            margin: auto;
          }
          .oneImage {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            width: 100%;
          }
          .myRate {
            margin: 15px 0px 10px 0px;
          }
          .averageRate {
            margin: 0px 0px 10px 0px;
          }
          .deleteBtn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
          }
          #innerContent {
            margin-left: 10px;
            margin-right: 10px;
          }
          .name {
            background: ;
            margin-top: 10px;
            font-size: 25px;
            height: 15%;
            font-weight: bold;
            text-align: center;
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            height: 5%;
            color: grey;
          }
          .summary {
            background: ;
            margin-top: 15px;
            height: 50%;
            overflow: scroll;
          }
          .editReviewBtn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
          }
          #hideContent {
            width: 100%;
          }
          .editContainer {
            width: 100%;
            height: 150px;
          }
          .editReview {
            width: 100%;
            height: 100%;
          }
          @media (max-width: 800px) {
            .container {
              display: flex;
              flex-direction: column;
            }
            #content {
              display: flex;
              flex-direction: column;
              background: ;
              margin-bottom: 20px;
            }
            #basicContent {
              display: flex;
              flex-direction: column;
            }

            #content,
            .imageContainer,
            .name,
            .summary {
              border: solid 1px #ced4da;
            }
            #outerContent {
              background: ;
            }
            .oneImage {
              display: block;
              margin: auto;
            }
            .name {
              background: ;
            }
            .summary {
              background: ;
              height: 50%;
              overflow: scroll;
            }
          }
        `}</style>
      </div>
    );
  }

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
    const bareDate = JSON.stringify(this.props.review.createdAt)
    let year = bareDate.slice(1, 5)
    let month = bareDate.slice(6, 8)
    let day = bareDate.slice(9, 11)
    let time = bareDate.slice(12, 14)
    let minute = bareDate.slice(15, 17)
    let second = bareDate.slice(18, 20)
    let newDate = `${year}년 ${month}월 ${day}일  ${time}시 ${minute}분 ${second}초`
    console.log(`year : ${year}`, `month : ${month}`, `day : ${day}`, `time : ${time}`, `minute : ${minute}`, `second : ${second}`)
    console.log(`newDate : ${newDate}`)

    return newDate
  }

  deleteBtn_handler = async () => {
    const review = this.props.review;
    const deleteReview = this.props.deleteReview;

    await axios
      .post(`${URL}/reviews/deleteReview`, {
        userId: review.user_id,
        bookId: review.book_id
      })
      .then(res => {
        if (res.data) {
          axios
            .post(`${URL}/reviews/getMyReviews`, { userId: review.user_id })
            .then(response => {
              const newReviews = response.data;
              deleteReview(newReviews);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
}

export default ReviewItem;
