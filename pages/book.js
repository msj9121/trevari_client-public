import React, { Component } from "react";
import axios from "axios";

class Book extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps(context) {
    const { id } = context.query;
    const res = await axios.post(`http://3.16.58.104:5000/books/getBookById`, {
      id
    });
    const book = await res.data;

    return { book };
  }

  _addBookmark = async () => {
    if (this.props.ID) {
      const { userId, bookId } = {
        userId: this.props.ID,
        bookId: this.props.book.id
      };
      const res = await axios.post(
        `http://3.16.58.104:5000/bookmarks/addBookmark`,
        { userId, bookId }
      );
      const data = await res.data;
      console.log("POST-addBookmark response : ", data);
      alert("addBookmark POST 요청");

      /* --------------------------------------App state change--------------------------------------------------------- */

      // const res = await axios.post(`http://3.16.58.104:5000/bookmarks/getMyBookmarks`, {
      //   userId: this.props.ID
      // })
      // const changeBookmarkDatas = await res.data
      // console.log("GET-changeBookmarkDatas response : ", filterBookmarkId())
    } else {
      alert("로그인 해주세요!");
    }
  };

  _deleteBookmark = async () => {
    if (this.props.ID) {
      const bookId = this.props.book.id;
      const bookmarkDatas = this.props.bookMarkData;
      const filterBookmarkId = () => {
        for (let i = 0; i < bookmarkDatas.length; i++) {
          if (bookmarkDatas[i].book_id === bookId) {
            return bookmarkDatas[i].id;
          }
        }
      };

      const bookmark_Id = filterBookmarkId();
      console.log("bookmark_id :", bookmark_Id);

      const res = await axios.post(
        `http://3.16.58.104:5000/bookmarks/deleteBookmark`,
        {
          userId: this.props.ID,
          bookmarkId: bookmark_Id
        }
      );

      const data = await res.data;
      console.log("POST-deleteBookmark response : ", data);

      alert("deleteBookmark POST 요청");

      /* --------------------------------------App state change--------------------------------------------------------- */

      // const res = await axios.post(`http://3.16.58.104:5000/bookmarks/getMyBookmarks`, {
      //   userId: this.props.ID
      // })
      // const changeBookmarkDatas = await res.data
      // console.log("GET-changeBookmarkDatas response : ", filterBookmarkId())
    } else {
      alert("로그인 해주세요!");
    }
  };

  render() {
    console.log("Book.js--bookMarkData : ", this.props.bookMarkData);
    return (
      <div id="book">
        <div id="book_box">
          <div className="book_titlebox">
            <div className="book_titlebox_img">
              <img src={this.props.book.image} />
            </div>
            <div className="book_titlebox_title">
              <div className="book_titlebox_titleName">
                {this.props.book.title}
              </div>
              <div className="book_titlebox_author">
                저자 : {this.props.book.author}
              </div>
              <div className="book_titlebox_author">
                {this.props.book.publishedAt}
              </div>
              <div className="book_titlebox_author">
                ISBN : {this.props.book.isbn}
              </div>
              <div className="book_titlebox_grade">평점 ★★★★☆ 8(210명)</div>
              <span
                className="book_titlebox_addBookmarkBtn"
                onClick={this._addBookmark}
              >
                + 읽고싶어요
              </span>
              <span
                className="book_titlebox_addBookmarkBtn"
                onClick={this._deleteBookmark}
              >
                - 읽고싶어요
              </span>
              <span className="book_titlebox_gradeBtn">+ 평점주기</span>
            </div>
          </div>

          <p>{this.props.book.description}</p>
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
          .book_titlebox_grade {
            font-size: 25px;
            margin-bottom: 20px;
          }
          .book_titlebox_addBookmarkBtn {
            border: 1px solid #ddd;
            font-size: 20px;
            padding: 5px 15px 5px 15px;
            margin-top: 10px;
            margin-right: 15px;
            cursor: pointer;
          }
          .book_titlebox_gradeBtn {
            border: 1px solid #ddd;
            font-size: 20px;
            padding: 5px 25px 5px 25px;
            cursor: pointer;
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
