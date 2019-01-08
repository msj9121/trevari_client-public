import React, { Component } from 'react';
import axios from "axios";
import SearchBooks from "../components/search/SearchBooks";

class Search extends Component {
  static async getInitialProps(context) {
    const { title } = context.query

    const books = await axios.post("http://3.16.58.104:5000/books/searchByTitle", { input: title })
    .then((res)=>{
      return res.data
    }).catch(err => {
      console.log(err)
    })

    return { books, title }
  }

  constructor(props) {
    super(props)
  }

  _renderSearch = () => {
    if (this.props.title === "" || this.props.books.length === 0) {
      alert("책정보가 없습니다.")
      return (
        <div id="search_initbox">
          <style jsx>{`
            #search_initbox {
              border: 1px solid #DDD;
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
      )
    } 
    else {
      return (
        <div id="search_box">
          {this.props.books.map((book, index) => {
            return (
              <SearchBooks book={book} key={index} ID={this.props.ID}/>
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
            @media screen and (max-width: 600px) {
              #search_box {
                width: 100%;
              }
            }
          `}</style>
        </div>
      )
    }
  }

  render() {
    return (
      <div id="search">

        {this._renderSearch()}

      </div>
    );
  }
}

export default Search;