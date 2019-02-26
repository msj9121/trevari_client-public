import React, { Component } from "react";
import Link from "next/link";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: false,
      recommend: false,
      mypage: false,
      login: false
    };
  }
  _toggleIndex = () => {
    this.setState({
      index: false,
      recommend: false,
      mypage: false,
      login: false
    });
  };

  _toggleRecommend = () => {
    this.setState({
      recommend: true,
      mypage: false,
      login: false
    });
  };
  _toggleMypage = () => {
    this.setState({
      recommend: false,
      mypage: true,
      login: false
    });
  };

  _toggleLogin = () => {
    this.setState({
      recommend: false,
      mypage: false,
      login: true
    });
  };

  _toggleLogout = () => {
    this.setState({
      recommend: false,
      mypage: false,
      login: false
    });
  };

  render() {
    return (
      <div id="header">
        <div id="header_box">
          <Link href="/">
            <img
              src="../static/trevari ci.png"
              id="header_logo"
              onClick={this._toggleIndex}
            />
          </Link>
          <ul>
            <Link href="/recommend">
              <li>
                {this.state.recommend ? (
                  <button
                    id="header_recommend2"
                    onClick={this._toggleRecommend}
                  >
                    추천 도서
                  </button>
                ) : (
                  <button id="header_recommend" onClick={this._toggleRecommend}>
                    추천 도서
                  </button>
                )}
              </li>
            </Link>
            <Link
              // as={`/mypage/${this.props.ID}`}
              href={`/mypage?userId=${this.props.ID}`}
            >
              <li>
                {this.state.mypage ? (
                  <button id="header_mypage2" onClick={this._toggleMypage}>
                    마이페이지
                  </button>
                ) : (
                  <button id="header_mypage" onClick={this._toggleMypage}>
                    마이페이지
                  </button>
                )}
              </li>
            </Link>
            <Link href={this.props.loginState.movepage}>
              <li onClick={this.props.rechangeCondition}>
                {this.props.loginState.text === "로그인" ? (
                  this.state.login ? (
                    <button id="header_login2">
                      {this.props.loginState.text}
                    </button>
                  ) : (
                    <button id="header_login" onClick={this._toggleLogin}>
                      {this.props.loginState.text}
                    </button>
                  )
                ) : (
                  <button id="header_logout" onClick={this._toggleLogout}>
                    {this.props.loginState.text}
                  </button>
                )}
              </li>
            </Link>
          </ul>
        </div>
        <div id="hidden_header_box">
          <div id="hidden-container">
            <div>
              <Link href="/">
                <img src="../static/trevari ci.png" id="header_logo" />
              </Link>
            </div>
            <div className="btn-container">
              <div id="head-Hamburger">
                <Hamburger
                  loginState={this.props.loginState}
                  rechangeCondition={this.props.rechangeCondition}
                  ID={this.props.ID}
                  changeHiddenBoxStatus={this.props.changeHiddenBoxStatus}
                  hiddenBox_status={this.props.hiddenBox_status}
                  headerMypage_status={this.props.headerMypage_status}
                />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          #header {
            border-bottom: solid 1px #ddd;
            background-color: white;
            width: 100%;
          }

          #header_mypage {
            display: ${this.props.headerMypage_status};
          }
          #header_box {
            display: flex;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 1140px;
          }
          #header_logo {
            width: 100px;
            height: 35px;
            cursor: pointer;
            margin-top: 5px;
            padding: 10px;
          }
          ul {
            margin: 0px;
            padding-top: 20px;
            padding-right: 10px;
          }
          li {
            display: inline-block;
          }
          button {
            cursor: pointer;
            background-color: white;
            border: none;
            outline-style: none;
            font-size: 16px;
            margin-left: 15px;
          }
          #header_recommend {
            color: rgba(0, 0, 0, 0.5);
          }
          #header_recommend2 {
            color: #ff8906;
          }
          #header_mypage {
            color: rgba(0, 0, 0, 0.5);
          }
          #header_mypage2 {
            color: #ff8906;
          }
          #header_login {
            color: rgba(0, 0, 0, 0.5);
          }
          #header_login2 {
            color: #ff8906;
          }
          #header_logout {
            color: rgba(0, 0, 0, 0.5);
          }
          #header_logout2 {
            color: #ff8906;
          }
          #header_recommend:hover {
            color: #ff8906;
          }
          #header_mypage:hover {
            color: #ff8906;
          }
          #header_login:hover {
            color: #ff8906;
          }
          #hidden_header_box {
            display: none;
          }
          @media screen and (max-width: 600px) {
            #header_box {
              display: none;
            }
            #hidden-container {
              display: flex;
            }
            #hidden_header_box {
              display: block;
            }
            .btn-container {
              width: 100px;
              margin-top: auto;
              margin-bottom: auto;
              margin-left: auto;
            }
            .openList-btn {
              height: 30px;
              padding: 5px;
              color: whitesmoke;
              margin-left: auto;
            }
            ul {
              padding-top: 3px;
            }
            li {
              text-align: right;
              padding-right: 10px;
              padding-bottom: 3px;
              border-top: solid 1px #ddd;
            }
            .bar {
              width: 35px;
              height: 5px;
              background-color: black;
              margin-top: 6px;
              margin-left: auto;
              margin-right: 3px;
            }
            #hidden_list_container {
              display: ${this.props.hiddenBox_status};
            }
            #hidden_list {
              display: flex;
              flex-direction: column;
            }
            #nav-Hamburger {
            }
          }
        `}</style>
      </div>
    );
  }
}

const Hamburger = function(props) {
  return (
    <div className="dropdown" onClick={props.changeHiddenBoxStatus}>
      <div className="bar_container">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>
      <div id="dropdownContent_container">
        <div className="dropdown_content">
          <Link href="/recommend">
            <div id="link_books" className="link">
              책추천
            </div>
          </Link>
          <Link as={`/mypage/${props.ID}`} href={`/mypage?userId=${props.ID}`}>
            <div id="link_mypage" className="link">
              마이페이지
            </div>
          </Link>
          <Link as={`/login`} href={props.loginState.movepage}>
            <div
              id="link_login"
              className="link"
              onClick={props.rechangeCondition}
            >
              {props.loginState.text}
            </div>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .dropdown {
          position: relative;
          display: inline-block;
          width: 100%;
        }
        .dropdown_content {
          display: ${props.hiddenBox_status};
          position: absolute;
          left: -110px;
          margin-top: 5px;
          background: white;
          width: 200px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          padding-top: 10px;
          padding-bottom: 15px;
          text-align: left;
        }
        .dropdown:hover {
          cursor: pointer;
        }
        .bar {
          width: 35px;
          height: 5px;
          background-color: #ff8906;
          margin-top: 6px;
          margin-left: auto;
          margin-right: 8px;
        }

        .link {
          border-bottom: solid 1px #ddd;
          font-size: 17px;
          margin-right: 10px;
          margin-left: 10px;
          padding-top: 10px;
          color: rgba(0, 0, 0, 0.5);
        }
        .link:hover {
          color: #ff8906;
        }
        #link_mypage {
          display: ${props.headerMypage_status};
        }
        .bar_container {
          margin-right: 3px;
          margin-top: auto;
          margin-bottom: auto;
          margin-left: auto;
        }
      `}</style>
    </div>
  );
};

export default Header;
