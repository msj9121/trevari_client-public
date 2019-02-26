import React from "react";
import BookmarkItem from "./BookmarkItem";
import Spinner from "../books/Spinner";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let scrollHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight
    );
    let scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      this.props._getMoreBookmarks();
    }
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
              id={this.props.id}
            />
          ))}
        </div>
        <div className="spinner">
          {this.props.loading ? <Spinner /> : <div />}
        </div>

        <style jsx>{`
          .allContainer {
            background-color: white;
            border: 1px solid #ddd;
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
          @media screen and (max-width: 600px) {
            // .viewMoreBtn {
            //   font-size: 12px;
            //   height: 20px;
            //   padding: 0px;
            // }
            .image_container {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Bookmarks;
