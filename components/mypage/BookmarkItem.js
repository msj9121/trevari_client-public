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
        <div>
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
        </div>
        <div className="btnContainer">
          <button className="deleteBtn" onClick={this.deleteBtn_handler}>
            삭제
          </button>
        </div>
        <style jsx>{`
          #bookmarkContent {
            box-shadow: 0px 0px 1px black;
            margin: 5px 5px 10px 5px;
            width: 130px;
            height: 225px;
            position: relative;
            
          }
          .imageContainer {
            width: 130px;
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
          .btnContainer {
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
        `}</style>
      </div>
    );
  }
}

export default BookmarkItem;
