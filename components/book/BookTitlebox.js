import React, { Component } from "react";

class BookTitlebox extends Component {
  constructor(props) {
    super(props);
  }

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

  render() {
    return (
      <div className="book_titlebox">
        <div className="book_titlebox_img">
          <img src={this._getBookImage()} />
        </div>
        <div className="book_titlebox_title">
          <div className="book_titlebox_titleName">{this.props.book.title}</div>
          <div className="book_titlebox_author">
            저자 : {this.props.book.author}
          </div>
          <div className="book_titlebox_author">
            {this.props.book.publishedAt}
          </div>
          <div className="book_titlebox_author">
            ISBN : {this.props.book.isbn}
          </div>
          <div className="book_titlebox_description">
            {this.props.book.description}
          </div>
          <div className="book_titlebox_review">
            평점 ★★★★☆ {this.props.book.averageScore}(0명)
          </div>
          {this.props._renderBookmarkBtn()}
          {this.props._renderReviewBtn()}
        </div>

        <style jsx>{`
          .book_titlebox {
            display: flex;
            margin: 0 auto;
            width: 90%;
          }
          .book_titlebox_img {
            width: 25%;
            margin: 50px;
            border: 1px solid #ddd;
            box-shadow: 0 7px 15px #999;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .book_titlebox_title {
            width: 75%;
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
              margin: 20px;
            }
            .book_titlebox_title {
              width: 70%;
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
