import React, { Component } from "react";
import Link from "next/link";

class Bookcollection extends Component {
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

  render() {
    const Author = this.props.book.author.replace(/<[^>]*>/g, "");
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
              <span className="tooltiptext">
                <p>Title : {this.props.book.title}</p>
                <p>Author : {Author}</p>
              </span>
            </div>
          </div>
        </Link>

        <style jsx>{`
          .search_imgbox {
            width: 12%;
            border: 1px solid #ddd;
            box-shadow: 0 7px 15px #999;
            margin: 20px;
            cursor: pointer;
          }
          .search_imgbox:hover {
            transform: scale(1.1);
          }
          .search_imgbox:hover .tooltiptext {
            visibility: visible;
          }
          .search_img {
            border-bottom: 1px solid #ddd;
            height: 170px;
          }
          .tooltiptext {
            visibility: hidden;
            width: 120px;
            background-color: black;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 5px 5px 5px 5px;
            margin-left: 10px;
            font-size: 11px;

            /* Position the tooltip */
            position: absolute;
            z-index: 1;
            botton: 0%;
            // left: 105%;
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

export default Bookcollection;
