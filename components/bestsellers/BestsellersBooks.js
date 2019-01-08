import Link from "next/link";
import React, { Component } from "react";

class BestsellersBooks extends Component {
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
    return (
      <React.Fragment>
        <Link
          as={`/book/${this.props.book.id}`}
          href={{
            pathname: "/book",
            query: { id: this.props.book.id, ID: this.props.ID }
          }}
        >
          <div className="bestsellersBooks_imgbox">
            <div className="bestsellersBooks_img">
              <img src={this._getBookImage()} />
            </div>

            {/* <div className="bestsellersBooks_name">{this.props.book.title}</div> */}
          </div>
        </Link>

        <style jsx>{`
          .bestsellersBooks_imgbox {
            width: 12%;
            border: 1px solid #ddd;
            box-shadow: 0 7px 15px #999;
            margin: 20px;
            cursor: pointer;
          }
          .bestsellersBooks_imgbox:hover {
            transform: scale(1.1);
          }
          .bestsellersBooks_img {
            border-bottom: 1px solid #DDD;
            height: 170px;
          }
          img {
            width: 100%;
            height: 170px;
          }
          .bestsellersBooks_name {
            font-size: 14px;
            font-weight: 700;
            color: #246db7;
          }
          @media screen and (max-width: 600px) {
            .bestsellersBooks_imgbox {
              width: 33%;
              margin: 30px;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default BestsellersBooks;
