import React, { Component } from 'react';

class Filter extends Component {
  render() {
    return (
      <div id="filter">

        <div id="filter_box">
          <div className="filter_group">
            <input placeholder="책제목 검색" type="search" className="filter_input"></input>
            <div className="filter_xbox">X</div>
            <div className="filter_search">검색</div>
          </div>
        </div>
        <style jsx>{`
          #filter {
            border: 1px solid #DDD;
          }
          #filter_box {
            display: flex;
            justify-content: flex-end;
            border: 1px solid #DDD;
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
          }
          .filter_xbox {
            border: solid 1px;
            border-color: #ff8906;
            color: #ff8906;
            padding: 5px 10px 5px 10px;
          }
          .filter_search {
            background-color: #ff8906;
            color: white;
            padding: 5px 10px 5px 10px;
            border-radius: 0px 3px 3px 0px;
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