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

  _renderStar = () => {
    if (
      9 <= this.props.book.averageScore &&
      this.props.book.averageScore <= 10
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
          `}</style>
        </div>
      );
    } else if (
      8 <= this.props.book.averageScore &&
      this.props.book.averageScore < 9
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      6 <= this.props.book.averageScore &&
      this.props.book.averageScore < 8
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      4 <= this.props.book.averageScore &&
      this.props.book.averageScore < 6
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      2 <= this.props.book.averageScore &&
      this.props.book.averageScore < 4
    ) {
      return (
        <div className="star">
          <i className="star-a">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-a {
              font-style: normal;
              color: red;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    } else if (
      0 <= this.props.book.averageScore &&
      this.props.book.averageScore < 2
    ) {
      return (
        <div className="star">
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <i className="star-b">★</i>
          <style jsx>{`
            .star {
              margin: 0px 5px 0px 5px;
            }
            .star-b {
              color: #363636;
              font-style: normal;
            }
          `}</style>
        </div>
      );
    }
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
          <div className="bookcollection_imgbox">
            <div className="bookcollection_img">
              <img src={this._getBookImage()} />
              <span className="tooltiptext">
                <div className="tooltiptext_title">{this.props.book.title}</div>
                <div className="tooltiptext_author">저자 : {Author}</div>
                <div className="tooltiptext_averageScore">
                  <div>평점 : </div>
                  <div>{this._renderStar()}</div>
                  <div>{this.props.book.averageScore}</div>
                </div>
              </span>
            </div>
          </div>
        </Link>

        <style jsx>{`
          .bookcollection_imgbox {
            width: 130px;
            border: 1px solid #ddd;
            box-shadow: 0 7px 15px #999;
            cursor: pointer;
            margin: 20px;
          }
          .bookcollection_imgbox:hover {
            transform: scale(1.1);
          }
          .bookcollection_imgbox:hover .tooltiptext {
            visibility: visible;
          }
          .bookcollection_img {
            height: 170px;
          }
          .tooltiptext {
            visibility: hidden;
            width: 250px;
            background-color: black;
            color: #fff;
            text-align: left;
            padding: 5px 5px 5px 5px;
            margin-left: 10px;
            font-size: 11px;

            /* Position the tooltip */
            position: absolute;
            z-index: 1;
            botton: 0%;
            // left: 105%;
          }
          .tooltiptext_title {
            font-size: 16px;
            font-weight: 600;
          }

          .tooltiptext_author {
            font-size: 14px;
            margin-top: 10px;
            margin-bottom: 10px;
            font-weight: 400;
          }
          .tooltiptext_averageScore {
            display: flex;
            font-size: 14px;
            font-weight: 400;
          }
          img {
            width: 100%;
            height: 100%;
          }
          .bookcollection_name {
            font-size: 14px;
            font-weight: 700;
            color: #246db7;
          }
          @media screen and (max-width: 600px) {
            .bookcollection_imgbox {
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
