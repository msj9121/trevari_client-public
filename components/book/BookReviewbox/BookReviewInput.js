import React, { Component } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../constant";

class BookReviewInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: ""
    };
  }

  _changeReviewText = e => {
    this.setState({
      reviewText: e.target.value
    });
  };

  _checkUserid = () => {
    if (this.props.ID === undefined) {
      alert("로그인 해주세요!");
    }
  };

  _addReview = async () => {
    if (this.props.ID && this.props.isReviewed === false) {
      console.log("평점을 올릴 수 있습니다.")
      this.props._PushLoading()
      this.setState({
        reviewText: ""
      })
      const bookReviews = await axios
        .post(`${BACKEND_ENDPOINT}/reviews/review`, {
          userId: this.props.ID,
          bookId: this.props.bookId,
          text: this.state.reviewText,
          score: this.props.ratingValue
        })
        .then(res => {
          if (res.data) {
            console.log("Review---POST 요청성공", res.data);
            return res.data;
          } else {
            console.log("Review---POST 요청실패", res.data);
          }
        })
        .catch(err => console.log(err));
      this.props._getReviewChange(bookReviews);
    } else if (this.props.ID && this.props.isReviewed === true) {
      alert("이미 평점이 있습니다.")
    } else {
      alert("로그인 해주세요!");
    }
  };

  _handleKeyPress = e => {
    if (e.charCode === 13) {
      this._addReview();
    }
  };

  render() {
    return (
      <div id="bookReviewInput">
        <textarea
          placeholder="평점은 최대 300자까지 등록 가능합니다."
          type="text"
          maxLength={300}
          value={this.state.reviewText}
          onChange={this._changeReviewText}
          onClick={this._checkUserid}
          onKeyPress={this._handleKeyPress}
        />
        <div className="bookReviewInput_btnbox">
          <div className="bookReviewInput_btnbox_count">
            {this.state.reviewText.length} / 300
          </div>
          <div
            className="bookReviewInput_btnbox_submit"
            onClick={this._addReview}
          >
            등록
          </div>
        </div>

        <style jsx>{`
          #bookReviewInput {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bookReviewInput_input {
            border: none;
            width: 100%;
            height: 80px;
            outline-style: none;
          }
          textarea {
            border: 1px solid #ddd;
            width: 100%;
            background-color: white;
            height: 100px;
            font-size: 16px;
            resize: none;
            outline-style: none;
            padding: 0px;
          }
          .bookReviewInput_input::placeholder {
            color: #aaa;
          }
          .bookReviewInput_btnbox {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            border-right: 1px solid #ddd;
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
          }
          .bookReviewInput_btnbox_count {
            padding: 10px 20px 10px 20px;
            color: gray;
          }
          .bookReviewInput_btnbox_submit {
            background-color: #ff8906;
            color: white;
            font-size: 16px;
            font-weight: 700;
            padding: 10px 30px 10px 30px;
            cursor: pointer;
          }
          @media screen and (max-width: 600px) {
            textarea {
              height: 200px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewInput;
