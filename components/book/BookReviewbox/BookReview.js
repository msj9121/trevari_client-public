import React, { Component } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../../constant";
import StarRatingComponent from "react-star-rating-component";
import Spinner from "../../books/Spinner";

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

  _onStarClick = (nextValue, prevValue, name) => {
    this.setState({
      rating: nextValue,
      editRatingValue: nextValue * 2
    });
  };

  _edit = () => {
    this.setState({
      edit: true,
      editRatingValue: 0,
      rating: 0
    });
  };

  _cancel = () => {
    this.setState({
      edit: false
    });
  };

  _editReview = () => {
    this.props._Loading()
    axios
      .put(`${BACKEND_ENDPOINT}/reviews/review`, {
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
    this.props._Loading()
    axios
      .delete(`${BACKEND_ENDPOINT}/reviews/review`, {
        params: {
          userId: this.props.ID,
          bookId: this.props.book_id
        }
      })
      .then(res => {
        console.log("삭제 성공 : ", res.data);

        this.props._getReviewChange(res.data, false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  _getEmail = () => {
    const bareEmail = JSON.stringify(this.props.email);
    const email = bareEmail.slice(1, 5) + "***";
    return email;
  };

  _getDate = () => {
    const bareDate = JSON.stringify(this.props.createdAt);

    let year = bareDate.slice(1, 5);
    let month = bareDate.slice(6, 8);
    let day = bareDate.slice(9, 11);
    let time = bareDate.slice(12, 14);
    let minute = bareDate.slice(15, 17);
    let newDate = `${year}-${month}-${day}. ${time}: ${minute}`;

    return newDate;
  };

  render() {
    return (
      <React.Fragment>
        {Number(this.props.ID) === this.props.user_id && this.props.isLoaded ? (
          <Spinner />
        ) : (
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
                      onStarClick={this._onStarClick}
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
                  {this._getEmail()}
                  <span id="a">|</span>
                  {this._getDate()}
                </div>

                {Number(this.props.ID) === this.props.user_id &&
                this.state.edit === false ? (
                  <div className="bookReview_textbox_editDeletebox">
                    <div className="bookReview_textbox_editbox">
                      <div
                        className="bookReview_textbox_edit"
                        onClick={this._edit}
                      >
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

                {Number(this.props.ID) === this.props.user_id &&
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
              #a {
                margin-left: 5px;
                margin-right: 5px;
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
                width: 100px;
              }
              .bookReview_scorebox2_score {
                margin-left: 10px;
                margin-right: 10px;
              }
              .bookReview_textbox {
                width: 100%;
              }
              .bookReview_textbox_text {
              }
              textarea {
                border: 1px solid #ddd;
                width: 100%;
                height: 100px;
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
                padding: 1px 1px 0px 1px;
                border-radius: 2px;
                text-align: center;
                cursor: pointer;
                width: 30px;
                height: 20px;
              }
              .bookReview_textbox_edit {
                font-size: 13px;
                color: gray;
                margin-top: 3px;
              }
              .bookReview_textbox_deletebox {
                display: flex;
                border: 1px solid #ddd;
                margin-left: 3px;
                padding: 1px 1px 0px 1px;
                border-radius: 2px;
                cursor: pointer;
                width: 38px;
                height: 20px;
              }
              .bookReview_textbox_delete {
                font-size: 13px;
                color: gray;
                margin-top: 3px;
              }
              .bookReview_textbox_X {
                font-size: 14px;
                margin-top: 2px;
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
                width: 30px;
                height: 20px;
              }
              .bookReview_textbox_post {
                font-size: 13px;
                font-weight: 600;
                color: white;
                margin-top: 4px;
              }
              .bookReview_textbox_cancelbox {
                margin-left: 5px;
                padding: 0px 3px 2px 3px;
                border-radius: 2px;
                text-align: center;
                cursor: pointer;
                background-color: #ff8906;
                width: 30px;
                height: 20px;
              }
              .bookReview_textbox_cancel {
                font-size: 13px;
                font-weight: 600;
                color: white;
                margin-top: 4px;
              }
              @media screen and (max-width: 600px) {
                #bookReview {
                  flex-direction: column;
                }
                .bookReview_textbox_postbox {
                  padding: 0px 3px 0px 3px;
                }
                .bookReview_textbox_cancelbox {
                  padding: 0px 3px 0px 3px;
                }
                textarea {
                  height: 180px;
                }
              }
            `}</style>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default BookReview;
