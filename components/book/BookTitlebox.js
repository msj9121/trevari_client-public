import React, { Component } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class BookTitlebox extends Component {
  constructor(props) {
    super(props);
  }

  _renderStar = () => {
    if (
      9 <= this.props.book.averageScore &&
      this.props.book.averageScore <= 10
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
      8 <= this.props.book.averageScore &&
      this.props.book.averageScore < 9
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
      6 <= this.props.book.averageScore &&
      this.props.book.averageScore < 8
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
      4 <= this.props.book.averageScore &&
      this.props.book.averageScore < 6
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
      2 <= this.props.book.averageScore &&
      this.props.book.averageScore < 4
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
      0 <= this.props.book.averageScore &&
      this.props.book.averageScore < 2
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

  _getBookImage = () => {
    const getBookImage = this.props.book.image;
    for (let i = 0; i < getBookImage.length; i++) {
      if (getBookImage[i] === "?") {
        const changeBookImage = getBookImage.slice(0, i);
        return changeBookImage;
      }
    }
    return getBookImage;
  };

  _addBookmark = async () => {
    if (this.props.ID) {
      const res = await axios.post(`${BACKEND_ENDPOINT}/bookmarks/bookmark`, {
        userId: this.props.ID,
        bookId: this.props.book.id
      });
      const data = await res.data;
      console.log("POST-addBookmark response : ", data);
      /* --------------------------------------BookMark state change--------------------------------------------------------- */
      this.props._changeBookMarkData();
    } else {
      alert("로그인 해주세요!");
    }
  };

  _deleteBookmark = async () => {
    if (this.props.ID) {
      const bookmarkId = this.props._filterBookmarkId();
      const res = await axios.delete(`${BACKEND_ENDPOINT}/bookmarks/bookmark`, {
        params: {
          userId: this.props.ID,
          bookmarkId: bookmarkId
        }
      });
      const data = await res.data;
      console.log("POST-deleteBookmark response : ", data);
      /* --------------------------------------BookMark state change--------------------------------------------------------- */
      this.props._changeBookMarkData();
    } else {
      alert("로그인 해주세요!");
    }
  };

  _getDate = () => {
    const bareDate = JSON.stringify(this.props.book.publishedAt);

    let year = bareDate.slice(0, 4);
    let month = bareDate.slice(4, 6);
    let day = bareDate.slice(6, 8);
    let newDate = `${year}-${month}-${day}.`;

    return newDate;
  };

  render() {
    const Author = this.props.book.author.replace(/<[^>]*>/g, "");
    const Description = this.props.book.description.replace(/<[^>]*>/g, "");
    return (
      <div className="book_titlebox">
        <div className="book_titlebox_img">
          <img src={this._getBookImage()} />
        </div>
        <div className="book_titlebox_title">
          <div className="book_titlebox_titleName">{this.props.book.title}</div>
          <div className="book_titlebox_author">저자 : {Author}</div>
          <div className="book_titlebox_author">
            {this._getDate()}
          </div>
          <div className="book_titlebox_isbn">
            ISBN : {this.props.book.isbn}
          </div>
          <div className="book_titlebox_description">{Description}</div>
          <div className="book_titlebox_review">
            평점 : {this._renderStar()} {Number(this.props.book.averageScore).toFixed(1)}(
            {this.props.bookReviewLength}명)
          </div>
          {this.props.ID && this.props._filterBookmarkId() ? (
            <span
              className="book_titlebox_deleteBookmarkBtn"
              onClick={this._deleteBookmark}
            >
              - 읽고싶어요
            </span>
          ) : (
            <span
              className="book_titlebox_addBookmarkBtn"
              onClick={this._addBookmark}
            >
              + 읽고싶어요
            </span>
          )}
          {this.props.review ? (
            <span
              className="book_titlebox_endReviewBtn"
              onClick={this.props._toggle}
            >
              - 평점주기
            </span>
          ) : (
            <span
              className="book_titlebox_startReviewBtn"
              onClick={this.props._toggle}
            >
              + 평점주기
            </span>
          )}
        </div>

        <style jsx>{`
          .book_titlebox {
            display: flex;
            margin: 0 auto;
            width: 90%;
            border-bottom: 1px solid #ddd;
          }
          .book_titlebox_img {
            width: 280px;
            height: 400px;
            margin: 50px;
            border: 1px solid #ddd;
            box-shadow: 0 7px 15px #999;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .book_titlebox_title {
            width: 580px;
            margin-top: 50px;
            margin-bottom: 50px;
            margin-right: 50px;
            padding-top: 15px;
            padding-bottom: 15px;
          }
          .book_titlebox_titleName {
            font-size: 25px;
            font-weight: 600;
            margin-bottom: 10px;
          }
          .book_titlebox_author {
            margin-bottom: 10px;
          }
          .book_titlebox_isbn {
            margin-bottom: 10px;
          }
          .book_titlebox_description {
            font-size: 15px;
          }
          .book_titlebox_review {
            font-size: 25px;
            margin-top: 10px;
            margin-bottom: 20px;
            display: flex;
          }
          .book_titlebox_startReviewBtn {
            background-color: #ff8906;
            color: white;
            font-size: 20px;
            font-weight: 600;
            padding: 9px 20px 7px 20px;
            cursor: pointer;
            border-radius: .15rem;
          }
          .book_titlebox_startReviewBtn:hover {
            background-color: #e07300;
          }

          .book_titlebox_endReviewBtn {
            color: white;
            background-color: #246db7;
            font-size: 20px;
            font-weight: 600;
            padding: 9px 20px 7px 20px;
            cursor: pointer;
            border-radius: .15rem;
          }
          .book_titlebox_endReviewBtn:hover {
            background-color: #1e5791;
          }
          .book_titlebox_addBookmarkBtn {
            background-color: #ff8906;
            color: white;
            font-size: 20px;
            font-weight: 600;
            padding: 9px 15px 7px 15px;
            margin-top: 10px;
            margin-right: 15px;
            cursor: pointer;
            border-radius: .15rem;
          }
          .book_titlebox_addBookmarkBtn:hover {
            background-color: #e07300;
          }
          .book_titlebox_deleteBookmarkBtn {
            background-color: #246db7;
            color: white;
            font-size: 20px;
            font-weight: 600;
            padding: 9px 15px 7px 15px;
            margin-top: 10px;
            margin-right: 15px;
            cursor: pointer;
            border-radius: .15rem;
          }
          .book_titlebox_deleteBookmarkBtn:hover {
            background-color: #1e5791;
          }
          @media screen and (max-width: 600px) {
            .book_titlebox {
              width: 100%;
            }
            .book_titlebox_img {
              width: 150px;
              height: 150px;
              margin: 20px;
            }
            .book_titlebox_title {
              width: 70%;
              margin-top: 18px;
              margin-bottom: 17px;
              margin-right: 15px;
              padding-top: 8px;
              padding-bottom: 8px;
            }
            .book_titlebox_titleName {
              font-size: 16px;
              margin-bottom: 5px;
            }
            .book_titlebox_review {
              font-size: 16px;
              margin-top: 5px;
              margin-bottom: 10px;
            }
            .book_titlebox_author {
              font-size: 12px;
              margin-bottom: 5px;
            }
            .book_titlebox_isbn {
              display: none;
            }
            .book_titlebox_description {
              display: none;
            }
            .book_titlebox_startReviewBtn {
              font-size: 13px;
              font-weight: 700;
              padding: 8px 15px 6px 15px;
            }
            .book_titlebox_endReviewBtn {
              font-size: 13px;
              font-weight: 700;
              padding: 8px 15px 6px 15px;
            }
            .book_titlebox_addBookmarkBtn {
              font-size: 13px;
              font-weight: 700;
              margin-right: 5px;
              padding: 8px 13px 6px 13px;
            }
            .book_titlebox_deleteBookmarkBtn {
              font-size: 13px;
              font-weight: 700;
              margin-right: 5px;
              padding: 8px 13px 6px 13px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookTitlebox;
