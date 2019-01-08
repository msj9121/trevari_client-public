import React, { Component } from "react";
import axios from "axios";
import SearchBooks from "../components/search/SearchBooks";
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

    return { books, title };
  }

  constructor(props) {
    super(props);
  }

  _renderSearch = () => {
    if (this.props.title === "" || this.props.books.length === 0) {
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
          {this.props.books.map((book, index) => {
            return <SearchBooks book={book} key={index} ID={this.props.ID} />;
          })}
          <style jsx>{`
            .searchBooks {
              margin: 0 auto;
              width: 60%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              background-color: white;
              border-left: 1px solid #ddd;
              border-right: 1px solid #ddd;
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

export default Search;
