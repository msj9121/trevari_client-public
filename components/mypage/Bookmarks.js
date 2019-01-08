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
            background: ;
            border: solid 1px #ced4da;
          }
          .viewMore {
            align="center";
            font-size: 15px;
            cursor: pointer;
            width: 100%;
            margin-top: 15px;
          }
        `}</style>
      </div>
    );
  }
}

export default Bookmarks;
