import React from "react";
import BookmarkItem from "./BookmarkItem";

class Bookmarks extends React.Component {
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
        <style jsx>{`
          .imageContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: ;
            border: solid 1px #ced4da;
          }
        `}</style>
      </div>
    );
  }
}

export default Bookmarks;
