import Link from "next/link";
import React, { Component } from "react";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
  }

  _getBookImage = () => {
    const getBookImage = this.props.book.image;
    for (let i = 0; i < getBookImage.length; i++) {
      if (getBookImage[i] === "?") {
        const changeBookImage = getBookImage.slice(0, i);
        return changeBookImage;
      }
    }
    return getBookImage;
  };

  _getBookTitle = () => {
    const getBookTitle = this.props.book.title;
    for (let i = 0; i < getBookTitle.length; i++) {
      if (getBookTitle[i] === "(") {
        const changeBookTitle = getBookTitle.slice(0, i);
        return changeBookTitle;
      }
    }
    return getBookTitle;
  };

  render() {
    return (
      <React.Fragment>
        <Link
          as={`/book/${this.props.book.id}`}
          href={{
            pathname: "/book",
            query: { id: this.props.book.id, ID: this.props.ID }
          }}
        >
          <div className="search_imgbox">
            <div className="search_img">
              <img src={this._getBookImage()} />
            </div>
            {/* <div className="search_name">{this._getBookTitle()}</div> */}
          </div>
        </Link>

        <style jsx>{`
          .search_imgbox {
            width: 12%;
            border: 1px solid #DDD;
            box-shadow:0 7px 15px #999;
            margin: 20px;
            cursor: pointer;
          }
          .search_imgbox:hover {
            transform: scale(1.1);
          }
          .search_img {
            border-bottom: 1px solid #DDD;
            height: 170px;
          }
          img {
            width: 100%;
            height: 170px;
          }
          .search_name {
            font-size: 14px;
            font-weight: 700;
            color: #246db7;
          }
          @media screen and (max-width: 600px) {
            .search_imgbox {
              width: 33%;
              margin: 30px;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default SearchBooks;
