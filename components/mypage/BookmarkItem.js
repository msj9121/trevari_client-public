import React from "react";
import Link from "next/link";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class BookmarkItem extends React.Component {
  getBookImage = () => {
    const bareImage = JSON.stringify(this.props.book.Book.image);
    let bookImageURL;
    for (var i = 0; i < bareImage.length; i++) {
      if (bareImage[i] === "?") {
        bookImageURL = bareImage.slice(1, i);
      }
    }
    return bookImageURL;
  };

  deleteBtn_handler = () => {
    const book = this.props.book;
    const deleteBookmark = this.props.deleteBookmark;

    deleteBookmark(book);

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
      <div id="bookmarkContent">
        <Link as={`/book/${book.Book.id}`} href={`/book?id=${book.Book.id}`}>
          <div className="imageContainer">
            <img
              className="image"
              align="center"
              src={this.getBookImage()}
              book_id={book.Book.id}
              book_isbn={book.Book.isbn}
            />
          </div>
        </Link>
        <div className="btnContainer">
          <button className="deleteBtn" onClick={this.deleteBtn_handler}>
            삭제
          </button>
        </div>
        <style jsx>{`
          #bookmarkContent, .imageContainer, .image, .deleteBtn {
            box-shadow: 0px 0px 1px black;
          }
          #bookmarkContent {
            display: flex;
            flex-direction: column;
            margin: 15px;
          }
          .imageContainer {
            margin: 10px;
            height: ;
          }
          .image {
            background: ;
            height: ;
            width: 100px;
            margin: 10px 10px 5px 10px;
          }
          .btnContainer {
          }
          .deleteBtn {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
            bottom: 0px;
          }
        `}</style>
      </div>
    );
  }
}

export default BookmarkItem;
