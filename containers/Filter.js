import React, { Component } from "react";
import Link from "next/link";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookTitle : ""
    }
  }

  _changeBookTitle = (e) => {
    this.setState({
      bookTitle : e.target.value
    })
  }

  _deleteBookTitle = () => {
    this.setState({
      bookTitle : ""
    })
  }

  render() {
    return (
      <div id="filter">
        <div id="filter_box">
          <div className="filter_group">
            <input
              placeholder="책 제목 검색"
              type="search"
              className="filter_input"
              value={this.state.bookTitle}
              onChange={this._changeBookTitle}
            />
            <div className="filter_xbox" onClick={this._deleteBookTitle}>
              X
            </div>
            <Link href={`/books?input=${this.state.bookTitle}`}>
              <div className="filter_search">검색</div>
            </Link>
          </div>
        </div>
        <style jsx>{`
          #filter {
            border-bottom: solid 1px #ddd;
          }
          #filter_box {
            display: flex;
            justify-content: flex-end;
            margin: 0 auto;
            width: 60%;
          }
          .filter_group {
            display: flex;
            padding: 10px;
          }
          .filter_input {
            margin: 0;
            font-size: inherit;
            display: block;
            border: 1px solid #ced4da;
            border-radius: 3px 0px 0px 3px;
            outline-style: none;
            padding: 5px;
          }
          .filter_xbox {
            border: solid 1px;
            border-color: #ff8906;
            color: #ff8906;
            padding: 5px 10px 5px 10px;
            cursor: pointer;
          }
          .filter_search {
            background-color: #ff8906;
            color: white;
            padding: 5px 10px 5px 10px;
            border-radius: 0px 3px 3px 0px;
            cursor: pointer;
          }
          @media screen and (max-width: 600px) {
            #filter_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Filter;
