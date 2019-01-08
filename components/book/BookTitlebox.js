import React, { Component } from 'react';

class BookTitlebox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log("bookiTitlebox", this.props.book)
    return (
      <div className="book_titlebox">
        <div className="book_titlebox_img">
          <img src={this.props.book.image} />
        </div>
        <div className="book_titlebox_title">
          <div className="book_titlebox_titleName">{this.props.book.title}</div>
          <div className="book_titlebox_author">저자 : {this.props.book.author}</div>
          <div className="book_titlebox_author">{this.props.book.publishedAt}</div>
          <div className="book_titlebox_author">ISBN : {this.props.book.isbn}</div>
          <div className="book_titlebox_description">{this.props.book.description}</div>
          <div className="book_titlebox_review">평점 ★★★★☆ {this.props.book.averageScore}(0명)</div>
          {this.props._renderBookmarkBtn()}
          {this.props._renderReviewBtn()}
        </div>

        <style jsx>{`
          .book_titlebox {
            border: 1px solid #ddd;
            display: flex;
            margin: 0 auto;
            width: 90%;
          }
          .book_titlebox_img {
            width: 70%;
            margin: 50px;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .book_titlebox_title {
            margin-top: 50px;
            margin-bottom: 50px;
            margin-right: 50px;
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
          .book_titlebox_description {
            font-size: 15px;
          }
          .book_titlebox_review {
            font-size: 25px;
            margin-top: 10px;
            margin-bottom: 20px;
          }
          @media screen and (max-width: 600px) {
            .book_titlebox {
              width: 100%;
            }
            .book_titlebox_img {
              width: 170px;
              height: 200px;
              margin: 20px;
            }
            .book_titlebox_title {
              margin-top: 18px;
              margin-bottom: 17px;
              margin-right: 15px;
              padding-bottom: 15px;
            }
            .book_titlebox_titleName {
              font-size: 18px;
              margin-bottom: 5px;
            }
            .book_titlebox_review {
              font-size: 18px;
              margin-top: 5px;
              margin-bottom: 10px;
            }
            .book_titlebox_author {
              font-size: 13px;
              margin-bottom: 5px;
            }
            .book_titlebox_description {
              display: none;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookTitlebox;