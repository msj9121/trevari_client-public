import React from "react";
import Link from "next/link";
import axios from "axios";

const URL = "http://3.16.58.104:5000";
// const URL = "http://localhost:5000";

class BookmarkItem extends React.Component {
  render() {
    const book = this.props.book;

    return (
      <div>
        <Link as={`/book/${book.Book.id}`} href={`/book?id=${book.Book.id}`}>
          <div className="imageContainer">
            <img
              src={this.getBookImage()}
              book_id={book.Book.id}
              book_isbn={book.Book.isbn}
              className="image"
              align="center"
            />
          </div>
        </Link>
        <div align="center" className="deleteBtn">
          <button onClick={this.deleteBtn_handler}>삭제</button>
        </div>
        <style jsx>{`
          .imageContainer {
            
          }
          .image {
            background: ;
            width: 150px;
            border: solid 1px #ced4da;
            margin: 10px 10px 5px 10px;
          }
          .deleteBtn {
            border: solid 1px #ced4da;
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    );
  }

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

  deleteBtn_handler = async () => {
    const book = this.props.book;
    const deleteBookmark = this.props.deleteBookmark;

    await axios
      .post(`${URL}/bookmarks/deleteBookmark`, {
        userId: book.user_id,
        bookmarkId: book.id
      })
      .then(async res => {
        if (res.data) {
          await axios
            .post(`${URL}/bookmarks/getMyBookmarks`, { userId: book.user_id })
            .then(response => {
              const newBooks = response.data;
              deleteBookmark(newBooks);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
}

export default BookmarkItem;
