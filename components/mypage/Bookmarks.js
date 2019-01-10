import React from "react";
import BookmarkItem from "./BookmarkItem";

class Bookmarks extends React.Component {
  clickHandler = () => {
    this.props.getMoreBookmarks();
  };

  render() {
    const books = this.props.books;

    return (
      <div>
        <div className="imageContainer">
          {books.map((book, id) => (
            <BookmarkItem
              book={book}
              key={id}
              deleteBookmark={this.props.deleteBookmark}
            />
          ))}
        </div>
        <div>
          <button className="viewMore" onClick={this.clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          .imageContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          .viewMore {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .viewMore:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
        `}</style>
      </div>
    );
  }
}

export default Bookmarks;
