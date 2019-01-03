import React, { Component } from 'react';
import axios from "axios";
import SearchBooks from "../components/search/SearchBooks";

class search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookTitle: "",
      booksData: []
    }
  }

  componentDidMount() {
    this._callApi()
  }

  _callApi = async () => {
    
    console.log("Search.js :", this.props.bookTitle)
    if (this.props.bookTitle === "" && this.props.isSearching === false) {
      console.log("책 제목을 입력해야합니다.")
    } else if (this.props.bookTitle !== "" && this.props.isSearching === true) {
    
      const res = await axios.post("http://3.16.58.104:5000/books/searchByTitle", { input: this.props.bookTitle })
      const data = await res.data;
      this.setState({
        booksData: this.state.booksData.concat(data)
      })
    }
  }

  _renderSearch = () => {
    if (this.props.isSearching === false) {
      return (
        <div id="search_initbox">
          <style jsx>{`
            #search_initbox {
              border: 1px solid #DDD;
              margin: 0 auto;
              width: 60%;
              height: 700px;
            }
          `}</style>
        </div>
      )
    } else {
      return (
        <div id="search_box">
          {this.state.booksData.map((book, index) => {
            return (
              <SearchBooks book={book} key={index} />
            )
          })}
          <style jsx>{`
            #search_box {
              border: 1px solid #DDD;
              margin: 0 auto;
              width: 60%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
          `}</style>
        </div>
      )
    }
  }

  render() {
    console.log("isSearch", this.props.isSearching)
    return (
      <div id="search">

        {this._renderSearch()}

        <style jsx>{`
          @media screen and (max-width: 600px) {
            #search_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    );
  }
}

export default search;