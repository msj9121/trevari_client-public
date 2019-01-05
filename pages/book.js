import React, { Component } from "react";
import axios from "axios";

class Book extends Component {
  static async getInitialProps(context) {
    const { id, ID } = context.query;
    const res = await axios.post(`http://3.16.58.104:5000/books/getBookById`, { id });
    const book = await res.data;
    if (ID) {
      const bookMarkDatas = await axios.post(`http://3.16.58.104:5000/bookmarks/getMyBookmarks`, {
        userId: ID
      })
      .then((response) => {
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
      return { book, bookMarkDatas };
    }

    return { book };
  }

  constructor(props) {
    super(props);
    this.state = {
      bookMarkData: this.props.bookMarkDatas,
      review: false
    }
  }

  _startReview = () => {
    this.setState({
      review: true
    })
  }

  _endReview = () => {
    this.setState({
      review: false
    })
  }

  _renderReviewBtn = () => {
    if (this.state.review) {
      return (
        <span className="book_titlebox_endReviewBtn" onClick={this._endReview}>
          - 평점보기
          <style jsx>{`
            .book_titlebox_endReviewBtn {
              background-color: blue;
              color: white;
              font-size: 20px;
              padding: 5px 25px 5px 25px;
              cursor: pointer;
            }
          `}</style>
        </span>
      )
    } else {
      return (
        <span className="book_titlebox_startReviewBtn" onClick={this._startReview}>
          + 평점보기
          <style jsx>{`
            .book_titlebox_startReviewBtn {
              background-color: #ff8906;
              color: white;
              font-size: 20px;
              padding: 5px 25px 5px 25px;
              cursor: pointer;
            }
          `}</style>
        </span>
      )
    }
  }

  _bookStateChange = async () => {
    const res = await axios.post(`http://3.16.58.104:5000/bookmarks/getMyBookmarks`, {
      userId: this.props.ID
    })
    const changeBookmark = await res.data
    console.log("GET-changeBookmarkDatas response : ", changeBookmark)
    this.setState({
      bookMarkData: changeBookmark
    })
  }

  _filterBookmarkId = () => {
    if (this.props.ID && this.state.bookMarkData) {
      const bookId = this.props.book.id
      const bookmarkData = this.state.bookMarkData
      for (let i = 0; i < bookmarkData.length; i++) {
        if (bookmarkData[i].book_id === bookId) {
          return bookmarkData[i].id
        }
      }
    } else {
      console.log("유저정보가 없습니다.")
    }
  }

  _renderBookmarkBtn = () => {
    const bookmark_Id = this._filterBookmarkId()
    if (this.props.ID && bookmark_Id) {
      return (
        <span className="book_titlebox_deleteBookmarkBtn" onClick={this._deleteBookmark}>
          - 읽고싶어요
          <style jsx>{`
            .book_titlebox_deleteBookmarkBtn {
              background-color: blue;
              color: white;
              font-size: 20px;
              padding: 5px 15px 5px 15px;
              margin-top: 10px;
              margin-right: 15px;
              cursor: pointer;
            }
          `}</style>
        </span>
      )
    }
    else {
      return (
        <span className="book_titlebox_addBookmarkBtn" onClick={this._addBookmark}>
          + 읽고싶어요
          <style jsx>{`
            .book_titlebox_addBookmarkBtn {
              background-color: #ff8906;
              color: white;
              font-size: 20px;
              padding: 5px 15px 5px 15px;
              margin-top: 10px;
              margin-right: 15px;
              cursor: pointer;
            }
          `}</style>
        </span>
      )
    }
  }

  _addBookmark = async () => {
    if (this.props.ID) {
      const res = await axios.post(`http://3.16.58.104:5000/bookmarks/addBookmark`, {
        userId: this.props.ID,
        bookId: this.props.book.id
      })
      const data = await res.data
      console.log("POST-addBookmark response : ", data)
      alert("addBookmark POST 요청")

      /* --------------------------------------Book state change--------------------------------------------------------- */

      this._bookStateChange()
    }
    else {
      alert("로그인 해주세요!")
    }
  };

  _deleteBookmark = async () => {
    if (this.props.ID) {
      const bookmark_Id = this._filterBookmarkId()
      const res = await axios.post(`http://3.16.58.104:5000/bookmarks/deleteBookmark`, {
        userId: this.props.ID,
        bookmarkId: bookmark_Id
      })
      const data = await res.data
      console.log("POST-deleteBookmark response : ", data)
      alert("deleteBookmark POST 요청")

      /* --------------------------------------Book state change--------------------------------------------------------- */

      this._bookStateChange()
    }
    else {
      alert("로그인 해주세요!")
    }
  }

  render() {
    console.log("Book.js--bookMarkDatas : ", this.state.bookMarkData);
    return (
      <div id="book">
        <div id="book_box">
          <div className="book_titlebox">
            <div className="book_titlebox_img">
              <img src={this.props.book.image} />
            </div>
            <div className="book_titlebox_title">
              <div className="book_titlebox_titleName">{this.props.book.title}</div>
              <div className="book_titlebox_author">저자 : {this.props.book.author}</div>
              <div className="book_titlebox_author">{this.props.book.publishedAt}</div>
              <div className="book_titlebox_author">ISBN : {this.props.book.isbn}</div>
              <div className="book_titlebox_review">평점 ★★★★☆ {this.props.book.averageScore}(0명)</div>
              {this._renderBookmarkBtn()}
              {this._renderReviewBtn()}
            </div>
          </div>

          {/* <p>{this.props.book.description}</p> */}
          <div className="book_reviewbox">

          </div>
        </div>

        <style jsx>{`
          #book {
          }
          #book_box {
            border: 1px solid #ddd;
            margin: 0 auto;
            width: 60%;
          }
          .book_titlebox {
            border: 1px solid #ddd;
            display: flex;
            margin: 0 auto;
            margin: 80px;
          }
          .book_titlebox_img {
            width: 30%;
          }
          img {
            width: 100%;
          }
          .book_titlebox_title {
            border: 1px solid #ddd;
            margin-left: 40px;
            margin-top: 30px;
            margin-bottom: 30px;
          }
          .book_titlebox_titleName {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .book_titlebox_author {
            margin-bottom: 10px;
          }
          .book_titlebox_review {
            font-size: 25px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 600px) {
            #book_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Book;
