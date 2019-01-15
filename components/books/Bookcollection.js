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
              color: gray;
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
              color: gray;
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
              color: gray;
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
              color: gray;
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
              color: gray;
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
                <div className="tooltiptext_box">
                  <div className="tooltiptext_title">
                    {this._getBookTitle()}
                  </div>
                  <div className="tooltiptext_author">{Author}</div>
                  <div className="tooltiptext_averageScore">
                    <div>{this._renderStar()}</div>
                    <div>{Number(this.props.book.averageScore).toFixed(1)}</div>
                  </div>
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
            position: relative;
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
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            // text-align: center;

            /* Position the tooltip */
            position: absolute;
            z-index: 1;
            left: -0%;

            text-align: center;
          }
          .tooltiptext_title {
            font-size: 13px;
            font-weight: 600;
            margin:10px;
          }

          .tooltiptext_box {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .tooltiptext_author {
            font-size: 10px;
            font-weight: 600;
            margin:10px;
          }
          .tooltiptext_averageScore {
            display: flex;
            font-size: 18px;
            font-weight: 500;
            justify-content: center;
            padding-right:6px;
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
              width: 120px;
              margin: 15px;
            }
            .tooltiptext {
              display: none;
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Bookcollection;
