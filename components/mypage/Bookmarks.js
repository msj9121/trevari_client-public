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
    const books = this.props.books;

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
          .image_container {
            display: flex;
            flex-wrap: wrap;

            justify-content: center;
          }
          .viewMoreBtn {
            font-size: 15px;
            width: 100%;
            height: 30px;
            padding: 5px;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .viewMoreBtn:hover {
            cursor: pointer;
            background-color: #ff7f00;
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
