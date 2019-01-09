import React, { Component } from "react";

class BookReviewAdd extends Component {
  constructor(props) {
    super(props);
  }
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

  _renderRevieweEditDelete = () => {
    if (this.props.ID === this.props.user_id) {
      return (
        <div className="bookReviewAdd_textbox_editDeletebox">
          <div className="bookReviewAdd_textbox_editbox">
            <div className="bookReviewAdd_textbox_edit">수정</div>
          </div>
          <div className="bookReviewAdd_textbox_deletebox">
            <div className="bookReviewAdd_textbox_delete">삭제</div>
            <div className="bookReviewAdd_textbox_X">X</div>
          </div>
          <style jsx>{`
            .bookReviewAdd_textbox_editDeletebox {
              display: flex;
            }
            .bookReviewAdd_textbox_deletebox {
              display: flex;
              border: 1px solid #ddd;
              margin-left: 3px;
              padding: 0px 2px 0px 2px;
              border-radius: 2px;
            }
            .bookReviewAdd_textbox_delete {
              font-size: 13px;
              color: gray;
            }
            .bookReviewAdd_textbox_X {
              font-size: 14px;
              margin-left: 2px;
              color: red;
            }
            .bookReviewAdd_textbox_editbox {
              border: 1px solid #ddd;
              margin-left: 5px;
              padding: 0px 2px 0px 2px;
              border-radius: 2px;
              text-align: center;
            }
            .bookReviewAdd_textbox_edit {
              font-size: 13px;
              color: gray;
            }
          `}</style>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="bookReviewAdd">
        <div className="bookReviewAdd_scorebox">
          <div className="bookReviewAdd_scorebox_star">
            {this._renderStar()}
          </div>
          <div className="bookReviewAdd_scorebox_score">{this.props.score}</div>
        </div>
        <div className="bookReviewAdd_textbox">
          <div className="bookReviewAdd_textbox_text">{this.props.text}</div>
          <div className="bookReviewAdd_textbox_userEmailbox">
            <div className="bookReviewAdd_textbox_userEmail">
              {this.props.email} | {this.props.createdAt}
            </div>
            {this._renderRevieweEditDelete()}
          </div>
        </div>

        <style jsx>{`
          #bookReviewAdd {
            display: flex;
            margin-bottom: 30px;
          }
          .bookReviewAdd_scorebox {
            display: flex;
            font-size: 20px;
          }
          .bookReviewAdd_scorebox_star {
          }
          .bookReviewAdd_scorebox_score {
            margin-left: 10px;
            margin-right: 10px;
          }
          .bookReviewAdd_textbox {
          }
          .bookReviewAdd_textbox_text {
          }
          .bookReviewAdd_textbox_userEmail {
            color: gray;
            font-size: 13px;
          }
          .bookReviewAdd_textbox_userEmailbox {
            display: flex;
          }
          @media screen and (max-width: 600px) {
            #bookReviewAdd {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookReviewAdd;
