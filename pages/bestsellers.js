import React, { Component } from "react";
import axios from "axios";
import Bookcollection from "../components/bookcollection/Bookcollection";
import { BACKEND_ENDPOINT } from "../constant";

class Bestsellers extends Component {
  constructor(props) {
    super(props);
  }

  static async getInitialProps() {
    const res = await axios.post(
      `${BACKEND_ENDPOINT}/books/searchByTitle`,
      { input: "대한" }
    );
    const data = res.data.slice(0, 30);

    return {
      bestsellers: data
    };
  }

  render() {
    return (
      <div id="bestsellers">
        <div id="bestsellers_box">
          {this.props.bestsellers.map((book, index) => {
            return (
              <Bookcollection book={book} key={index} ID={this.props.ID} />
            );
          })}
        </div>

        <style jsx>{`
          #bestsellers {
            background: rgba(0, 0, 0, 0.03);
          }
          #bestsellers_box {
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
            #bestsellers_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Bestsellers;
