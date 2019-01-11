import React from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class BookmarkItem extends React.Component {
  constructor(props) {
    super(props);

    this._getBookImage = this._getBookImage.bind(this);
    this._deleteBtn_handler = this._deleteBtn_handler.bind(this);
  }

  _getBookImage = function() {
    const bareImage = JSON.stringify(this.props.book.Book.image);
    let bookImageURL;
    for (var i = 0; i < bareImage.length; i++) {
      if (bareImage[i] === "?") {
        bookImageURL = bareImage.slice(1, i);
      }
    }
    return bookImageURL;
  };

  _deleteBtn_handler = function() {
    const book = this.props.book;
    const _deleteBookmark = this.props._deleteBookmark;

    _deleteBookmark(book);

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/deleteBookmark`, {
        userId: book.user_id,
        bookmarkId: book.id
      })
      .then(res => {
        if (res.data) {
          console.log(`삭제된 북마크 : ${book.Book.title}`);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const book = this.props.book;

    return (
      <div id="bookmark_content">
        <div>
          <Link as={`/book/${book.Book.id}`} href={`/book?id=${book.Book.id}`}>
            <div className="image_container">
              <img
                className="image"
                align="center"
                src={this._getBookImage()}
                book_id={book.Book.id}
                book_isbn={book.Book.isbn}
              />
            </div>
          </Link>
        </div>
        <div className="btn_container">
          <button className="deleteBtn" onClick={this._deleteBtn_handler}>
            삭제
          </button>
        </div>
        <style jsx>{`
          #bookmark_content {
            margin: 5px 5px 10px 5px;
            width: 130px;
            height: 225px;
            position: relative;
          }
          .image_container {
            width: 100%;
          }
          .image {
            background: ;
            width: 100%;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .image:hover {
            cursor: pointer;
          }
          .btn_container {
            position: absolute;
            bottom: 0px;
            width: 100%;
          }
          .deleteBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .deleteBtn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 800px) {
            #bookmark_content {
              width: 80px;
              height: 130px;
              position: relative;
            }
            .deleteBtn {
              font-size: 12px;
              height: 20px;
              padding: 0px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default BookmarkItem;
