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
            border: solid 2px #ff8906;
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
          }
          .viewMore:hover {
            color: black;
            background-color: white;
            font-weight: 500;
            box-shadow: 0px 0px 0px 2px #ff8906;
          }
        `}</style>
      </div>
    );
  }
}

export default Bookmarks;
