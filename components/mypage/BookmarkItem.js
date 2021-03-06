import React from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class BookmarkItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _getBookImage = () => {
    const Book = this.props.book.Book;
    const bareImage = Book.image;
    const targetIndex = bareImage.indexOf("?");
    let bookImageURL;

    if (targetIndex === -1) {
      bookImageURL = this.props.book.Book.image;
    } else {
      bookImageURL = bareImage.slice(0, targetIndex);
    }
    return bookImageURL;
  };

  _deleteBtn_handler = () => {
    const book = this.props.book;
    const _deleteBookmark = this.props._deleteBookmark;

    _deleteBookmark(book);

    axios
      .delete(`${BACKEND_ENDPOINT}/bookmarks/bookmark`, {
        params: {
          userId: book.user_id,
          bookmarkId: book.id
        }
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
    const ID = Number(this.props.id);

    return (
      <div id="bookmark_content">
        <div>
          <Link
            as={`/book/${book.Book.id}`}
            href={{
              pathname: "/book",
              query: {
                id: book.Book.id,
                ID: ID
              }
            }}
          >
            <div className="image_box">
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
            margin: 20px;
            width: 130px;
            height: 205px;
            position: relative;
          }
          .image_box {
            width: 130px;
            height: 170px;
            border: 1px solid #ddd;
          }
          .image {
            width: 100%;
            height: 100%;
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
            color: white;
            border: none;
            background-color: #ff8906;
            outline-style: none;
            font-weight: 600;
            cursor: pointer;
            border-radius: 0.15rem;
          }
          .deleteBtn:hover {
            background-color: #e07300;
          }
          @media screen and (max-width: 600px) {
            // #bookmark_content {
            //   margin: 15px;
            // }
            // .image_container {
            //   width: 80px;
            //   height: 130px;
            // }
            // .deleteBtn {
            //   font-size: 12px;
            //   height: 20px;
            //   padding: 0px;
            // }
          }
        `}</style>
      </div>
    );
  }
}

export default BookmarkItem;
