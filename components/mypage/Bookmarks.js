import React from "react";
import BookmarkItem from "./BookmarkItem";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);

    this._viewMoreBtn_clickHandler = this._viewMoreBtn_clickHandler.bind(this);
  }

  _viewMoreBtn_clickHandler = function() {
    this.props._getMoreBookmarks();
  };

  render() {
    const books = this.props.currentBookmarks;

    return (
      <div className="allContainer">
        <div className="image_container">
          {books.map((book, id) => (
            <BookmarkItem
              book={book}
              key={id}
              _deleteBookmark={this.props._deleteBookmark}
            />
          ))}
        </div>
        <div>
          <button
            className="viewMoreBtn"
            onClick={this._viewMoreBtn_clickHandler}
          >
            더보기
          </button>
        </div>
        <style jsx>{`
          .allContainer {
            background-color: white;
            border: 1px solid #DDD;
            margin: 10px;
          }
          .image_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin: 5px;
            width: 92%;
            margin: 0 auto;
          }
          .viewMoreBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: white;
            font-weight: 600;
            border: none;
            background-color: #ff8906;
            outline-style: none;
          }
          .viewMoreBtn:hover {
            cursor: pointer;
            background-color: #e07300;
          }
          @media screen and (max-width: 800px) {
            .viewMoreBtn {
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

export default Bookmarks;