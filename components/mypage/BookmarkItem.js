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
            box-shadow: 0px 0px 0px black;
          }
          #bookmarkContent {
            margin: 15px;
            width: 150px;
          }
          .imageContainer {
            width: 150px;
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
        
          }
          .deleteBtn {
            margin-top: 10px;
            margin-bottom: 5px;
            display: inline-block;
            background-color: white;
            color: black;
            font-weight: 500;
            padding: 5px 30px 5px 30px;
            cursor: pointer;
            font-size: 15px;
            width: 100%;
             
          }
          .deleteBtn:hover {
            color: black;
            background-color: white;
            font-weight: 500;
            box-shadow: 0px 0px 0px 1px #ff8906
            

          }
        `}</style>
      </div>
    );
  }
}

export default BookmarkItem;
