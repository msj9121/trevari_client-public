import React, { Component } from "react";
import axios from "axios";
import BooksBanner from "../components/books/BooksBanner";
import BooksBestsellers from "../components/books/BooksBestsellers";
import { BACKEND_ENDPOINT } from "../constant";

class Books extends Component {
  static async getInitialProps() {
    const res = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: "대한"
    });

    const data = await res.data.slice(0, 6);
    const data1 = await res.data.slice(0, 5);
    const data2 = await res.data.slice(0, 4);

    return {
      bestsellers: data,
      bestsellers1: data1,
      bestsellers2: data2
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      bestsellers: this.props.bestsellers,
      bestsellers1: this.props.bestsellers1,
      bestsellers2: this.props.bestsellers2
    };
  }

  render() {
    return (
      <div>
        <BooksBanner />
        <div id="books">
          <div id="books_box">
            <BooksBestsellers
              title={"베스트 셀러 TOP 30"}
              bestsellers={this.state.bestsellers}
              ID={this.props.ID}
            />
            <BooksBestsellers
              title={"베스트 셀러 TOP 29"}
              bestsellers={this.state.bestsellers1}
              ID={this.props.ID}
            />
            <BooksBestsellers
              title={"베스트 셀러 TOP 28"}
              bestsellers={this.state.bestsellers2}
              ID={this.props.ID}
            />
          </div>

          <style jsx>{`
            #books {
              background: rgba(0, 0, 0, 0.03);
            }
            #books_box {
              border: 1px solid #ddd;
              margin: 0 auto;
              width: 60%;
              background-color: white;
            }
            @media screen and (max-width: 600px) {
              #books_box {
                width: 100%;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}

export default Books;
