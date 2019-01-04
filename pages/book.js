import React, { Component } from 'react';
import fetch from 'isomorphic-unfetch';
import axios from 'axios';

class Book extends Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps(context) {
    const { id } = context.query
    const res = await axios.post(`http://3.16.58.104:5000/books/getBookById`, { id })
    const show = await res.data

    return { show }
  }

  _addBookmark = () => {
    if(this.props.ID) {
      console.log("북마크 : ", this.props.show.id)
      alert("북마크 POST 요청")
    } else {
      alert("로그인 해주세요!")
    }
  }

  render() {
    console.log("Book.js--ID : ", this.props.ID)
    return (
      <div id="book">

        <div id="book_box">
          <div className="book_titlebox">
            <div className="book_titlebox_img"><img src={this.props.show.image}></img></div>
            <div className="book_titlebox_title">
              <div className="book_titlebox_titleName">{this.props.show.title}</div>
              <div className="book_titlebox_author">저자 : {this.props.show.author}</div>
              <div className="book_titlebox_author">{this.props.show.publishedAt}</div>
              <div className="book_titlebox_author">ISBN : {this.props.show.isbn}</div>
              <div className="book_titlebox_grade">평점 ★★★★☆ 8(210명)</div>
              <span className="book_titlebox_bookmarkBtn" onClick={this._addBookmark}>+ 읽고싶어요</span>
              <span className="book_titlebox_gradeBtn">+ 평점주기</span>
            </div>
          </div>

          <p>{this.props.show.description}</p>
        </div>

        <style jsx>{`
          #book {
            
          }
          #book_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
            
          }
          .book_titlebox {
            border: 1px solid #DDD;
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
            border: 1px solid #DDD;
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
          .book_titlebox_bookmarkBtn {
            border: 1px solid #DDD;
            font-size: 20px;
            padding: 5px 15px 5px 15px;
            margin-top: 10px;
            margin-right: 15px;
            cursor: pointer;
          }
          .book_titlebox_gradeBtn {
            border: 1px solid #DDD;
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