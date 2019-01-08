import Link from "next/link";
import React, { Component } from "react";

class BooksBestseller extends Component {
  constructor(props) {
    super(props);
  }

  _getBookImage = () => {
    const getBookImage = this.props.bestseller.image;
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
          as={`/book/${this.props.bestseller.id}`}
          href={{
            pathname: "/book",
            query: { id: this.props.bestseller.id, ID: this.props.ID }
          }}
        >
          <div className="books_bestseller">
            <img className="books_bestseller_img" src={this._getBookImage()} />
          </div>
        </Link>

        <style jsx>{`
          .books_bestseller {
            width: 12%;
            height: 180px;
            border: 1px solid #DDD;
            box-shadow:0 7px 15px #999;
            margin: 20px;
            cursor: pointer;
          }
          .books_bestseller:hover {
            transform: scale(1.1);
          }
          .books_bestseller_img {
            width: 100%;
            height: 100%;
          }
          @media screen and (max-width: 600px) {
            .books_bestseller {
              width: 33%;
              margin: 30px;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default BooksBestseller;
