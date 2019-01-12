import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/books/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";

class Search extends Component {
  static async getInitialProps(context) {
    const { title } = context.query;

    const books = await axios
      .post(`${BACKEND_ENDPOINT}/books/searchByTitle`, { input: title })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("-----------------------------------");
    // console.log("getinitialprops", books);

    return { books, title };
  }

  constructor(props) {
    super(props);
    console.log("constructor--props", this.props.books);
    this.state = {
      books: this.props.books
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("shouldComponentUpdate--nextProps", nextProps.books);
    // console.log("shouldComponentUpdate--nextState", nextState.books);
    // console.log("shouldComponentUpdate--thisState", this.state.books);
    if (nextProps.books !== this.state.books) {
      this.setState({
        books: nextProps.books
      });
      return true;
    } else {
      return false;
    }
  }

  _renderSearch = () => {
    if (this.props.title === "" || this.state.books.length === 0) {
      alert("책정보가 없습니다.");
      return (
        <div id="search_initbox">
          <style jsx>{`
            #search_initbox {
              border: 1px solid #ddd;
              margin: 0 auto;
              width: 60%;
              height: 700px;
            }
            @media screen and (max-width: 600px) {
              #search_initbox {
                width: 100%;
              }
            }
          `}</style>
        </div>
      );
    } else {
      return (
        <div className="searchBooks">
          {/* {console.log("render--thisState", this.state.books)}
          {console.log("-----------------------------------")} */}
          <div className="searchBooks_imgbox">
            <div className="searchBooks_imgs">
              {this.state.books.map((book, index) => {
                return (
                  <Bookcollection book={book} key={index} ID={this.props.ID} />
                );
              })}
            </div>
          </div>

          <style jsx>{`
            .searchBooks {
              margin: 0 auto;
              width: 60%;
              background-color: white;
              border-left: 1px solid #ddd;
              border-right: 1px solid #ddd;
            }
            .searchBooks_imgbox {
              margin-left: 40px;
              margin-right: 40px;
              display: flex;
              justify-content: center;
            }
            .searchBooks_imgs {
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-start;
            }
            @media screen and (max-width: 600px) {
              .searchBooks {
                width: 100%;
              }
            }
          `}</style>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="search">
        {this._renderSearch()}
        <style jsx>{`
          #search {
            background: rgba(0, 0, 0, 0.03);
          }
        `}</style>
      </div>
    );
  }
}
export default Search;
