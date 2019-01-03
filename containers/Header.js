import React, { Component } from "react";
import Link from "next/link";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="header">
        <div id="header_box">
          <Link href="/">
            <img src="../static/trevari ci.png" className="header_logo" />
          </Link>
          <ul>
            <Link href="/books">
              <li>
                <span>책추천</span>
              </li>
            </Link>
            <Link href="/mypage">
              <li>
                <span>마이페이지</span>
              </li>
            </Link>
            <Link href={this.props.loginState.movepage}>
              <li onClick={this.props.rechangeCondition}>
                <span>{this.props.loginState.text}</span>
              </li>
            </Link>
          </ul>
        </div>

        <style jsx>{`
          #header {
            border-bottom: solid 1px #ddd;
          }
          #header_box {
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            width: 60%;
          }
          .header_logo {
            width: 100px;
            height: 35px;
            cursor: pointer;
            margin-top: 5px;
            padding: 10px;
          }
          ul {
            margin: 0px;
            padding-top: 20px;
          }
          li {
            display: inline-block;
          }
          span {
            color: rgba(0, 0, 0, 0.5);
            cursor: pointer;
            margin-left: 20px;
          }

          @media screen and (max-width: 600px) {
            #header_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
