import React, { Component } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../constant";
import StarRatingComponent from "react-star-rating-component";

class BookReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      rating: 0,
      editRatingValue: this.props.score,
      editReviewText: this.props.text
    };
  }

  _changeReviewText = e => {
    this.setState({
      editReviewText: e.target.value
    });
  };

  _renderStar = () => {
    if (this.props.score === 10) {
      return (
        <div>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <style jsx>{`
            .star-a {
              font-style: normal;
              color: red;
            }
          `}</style>
        </div>
      );
    } else if (this.props.score === 8) {
      return (
        <div>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
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
    } else if (this.props.score === 6) {
      return (
        <div>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
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
    } else if (this.props.score === 4) {
      return (
        <div>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
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
    } else if (this.props.score === 2) {
      return (
        <div>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
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
    } else if (this.props.score === 0) {
      return (
        <div>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    }
  };

  _onStarClickHover = (nextValue, prevValue, name) => {
    this.setState({
      rating: nextValue,
      editRatingValue: nextValue * 2
    });
  };

  _edit = () => {
    this.setState({
      edit: true
    });
  };

  _cancel = () => {
    this.setState({
      edit: false
    });
  };

  _editReview = () => {
    axios
      .post(`${BACKEND_ENDPOINT}/reviews/editReview`, {
        userId: this.props.ID,
        bookId: this.props.book_id,
        score: this.state.editRatingValue,
        text: this.state.editReviewText
      })
      .then(res => {
        console.log("수정 성공 : ", res.data);
        this.setState({
          edit: false
        });
        this.props._getReviewChange(res.data, true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  _deleteReview = () => {
    axios
      .post(`${BACKEND_ENDPOINT}/reviews/deleteReview`, {
        userId: this.props.ID,
        bookId: this.props.book_id
      })
      .then(res => {
        console.log("삭제 성공 : ", res.data);
        this.props._getReviewChange(res.data, false);
        console.log("score", this.props.score);
        console.log("text", this.props.text);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("editReviewText", this.state.editReviewText);
    console.log("editRatingValue", this.state.editRatingValue);
    return (
      <div id="bookReview">
        <div className="bookReview_scorebox">
          {this.state.edit ? (
            <div className="bookReview_scorebox2">
              <div className="bookReview_scorebox2_star">
                <StarRatingComponent
                  name="rating"
                  starCount={5}
                  starColor={"red"}
                  value={this.state.rating}
                  onStarClick={this._onStarClickHover}
                  onStarHover={this._onStarClickHover}
                />
              </div>
              <div className="bookReview_scorebox2_score">
                {this.state.editRatingValue}
              </div>
            </div>
          ) : (
            <div className="bookReview_scorebox1">
              <div className="bookReview_scorebox1_star">
                {this._renderStar()}
              </div>
              <div className="bookReview_scorebox1_score">
                {this.props.score}
              </div>
            </div>
          )}
        </div>

        <div className="bookReview_textbox">
          {this.state.edit ? (
            <textarea
              maxLength={300}
              defaultValue={this.props.text}
              onChange={this._changeReviewText}
            />
          ) : (
            <div className="bookReview_textbox_text">{this.props.text}</div>
          )}

          <div className="bookReview_textbox_userEmailbox">
            <div className="bookReview_textbox_userEmail">
              {this.props.email} | {this.props.createdAt}
            </div>

            {this.props.ID === this.props.user_id &&
            this.state.edit === false ? (
              <div className="bookReview_textbox_editDeletebox">
                <div className="bookReview_textbox_editbox">
                  <div className="bookReview_textbox_edit" onClick={this._edit}>
                    수정
                  </div>
                </div>
                <div
                  className="bookReview_textbox_deletebox"
                  onClick={this._deleteReview}
                >
                  <div className="bookReview_textbox_delete">삭제</div>
                  <div className="bookReview_textbox_X">X</div>
                </div>
              </div>
            ) : (
              <div />
            )}

            {this.props.ID === this.props.user_id &&
            this.state.edit === true ? (
              <div className="bookReview_textbox_postCancelbox">
                <div
                  className="bookReview_textbox_postbox"
                  onClick={this._editReview}
                >
                  <div className="bookReview_textbox_post">수정</div>
                </div>
                <div
                  className="bookReview_textbox_cancelbox"
                  onClick={this._cancel}
                >
                  <div className="bookReview_textbox_cancel">취소</div>
                </div>
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>

        <style jsx>{`
          #bookReview {
            display: flex;
            margin-bottom: 30px;
          }
          .bookReview_scorebox {
          }
          .bookReview_scorebox1 {
            display: flex;
            font-size: 20px;
          }
          .bookReview_scorebox1_star {
          }
          .bookReview_scorebox1_score {
            margin-left: 10px;
            margin-right: 10px;
          }
          .bookReview_scorebox2 {
            display: flex;
            font-size: 20px;
          }
          .bookReview_scorebox2_star {
          }
          .bookReview_scorebox2_score {
            margin-left: 10px;
            margin-right: 10px;
          }
          .bookReview_textbox {
          }
          .bookReview_textbox_text {
          }
          textarea {
            border: 1px solid #ddd;
            width: 100%;
            background-color: white;
            font-size: 16px;
            resize: none;
            outline-style: none;
            padding: 5px;
          }
          .bookReview_textbox_userEmail {
            color: gray;
            font-size: 13px;
          }
          .bookReview_textbox_userEmailbox {
            display: flex;
          }
          .bookReview_textbox_editDeletebox {
            display: flex;
          }
          .bookReview_textbox_editbox {
            border: 1px solid #ddd;
            margin-left: 5px;
            padding: 0px 2px 0px 2px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
          }
          .bookReview_textbox_edit {
            font-size: 13px;
            color: gray;
          }
          .bookReview_textbox_deletebox {
            display: flex;
            border: 1px solid #ddd;
            margin-left: 3px;
            padding: 0px 2px 0px 2px;
            border-radius: 2px;
            cursor: pointer;
          }
          .bookReview_textbox_delete {
            font-size: 13px;
            color: gray;
          }
          .bookReview_textbox_X {
            font-size: 14px;
            margin-left: 2px;
            color: red;
          }

          .bookReview_textbox_postCancelbox {
            display: flex;
          }
          .bookReview_textbox_postbox {
            margin-left: 5px;
            padding: 0px 3px 2px 3px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            background-color: #ff8906;
          }
          .bookReview_textbox_post {
            font-size: 13px;
            font-weight: 600;
            color: white;
          }
          .bookReview_textbox_cancelbox {
            margin-left: 5px;
            padding: 0px 3px 2px 3px;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            background-color: #ff8906;
          }
          .bookReview_textbox_cancel {
            font-size: 13px;
            font-weight: 600;
            color: white;
          }
          @media screen and (max-width: 600px) {
            #bookReview {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookReview;
