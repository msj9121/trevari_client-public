import React, { Component } from "react";
import axios from "axios";
import SearchBooks from "../components/search/SearchBooks";
import Filter from "../containers/Filter";

class search extends Component {
  static getInitialProps = async function(context) {
    const { bookTitle } = context.query;
    const data = [];
    if (bookTitle) {
      const res = await axios.post(
        "http://3.16.58.104:5000/books/searchByTitle",
        { input: bookTitle }
      );
      data = await res.data;
    }
    return {
      booksData: data
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      bookTitle: "",
      isSearching: false,
      booksData: props.booksData
    };
  }

  render() {
    return (
      <div id="search">
        <Filter onSearchBookTitle={this.onSearchBookTitle} />
        {this.state.booksData.length > 0 ? (
          <div id="search_box">
            {this.state.booksData.map((book, index) => {
              return <SearchBooks book={book} key={index} />;
            })}
          </div>
        ) : (
          <div style={{ margin: "60px 0", textAlign: "center" }}>
            검색어를 입력해주세요.
          </div>
        )}
        <style jsx>{`
          #search_box {
            border: 1px solid #ddd;
            margin: 0 auto;
            width: 60%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
          }
          @media screen and (max-width: 600px) {
            #search_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  onSearchBookTitle = async title => {
    const res = await axios.post(
      "http://3.16.58.104:5000/books/searchByTitle",
      { input: title }
    );
    const data = await res.data;
    this.setState({
      booksData: data
    });
  };
}

export default search;
