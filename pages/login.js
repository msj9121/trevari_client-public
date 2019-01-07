import React, { Component } from "react";
import axios from "axios";
import Route from "next/router";
import { BACKEND_ENDPOINT } from "../constant";

// const URL = "http://3.16.58.104:5000";
// const URL = "http://localhost:5000";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      userid: "",
      check: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loginButtonClick = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    await axios
      .post(`${BACKEND_ENDPOINT}/users/checkEmailAvailability`, data)
      .then(res => {
        if (res.data) {
          this.setState({
            check: "가입되지 않은 이메일 입니다!"
          });
        } else {
          this.requestLogin(data);
        }
      })
      .catch(err => console.log(err));
  };

  requestLogin = async data => {
    await axios
      .post(`${BACKEND_ENDPOINT}/users/login`, data)
      .then(res => {
        if (res.data) {
          this.setState({
            id: res.data.id
          });
          this.props.saveId(this.state.id);
          this.props.changeCondition();
          Route.push("/index");
        } else {
          this.setState({
            check: "비밀번호를 확인해 주세요!"
          });
        }
      })
      .catch(err => console.log(err));
  };

  moveSignupPage = () => {
    Route.push("/signup");
  };

  render() {
    return (
      <div id="login">
        <div className="login-text">로그인</div>

        <div className="login-input">
          <input
            className="input-box"
            type="email"
            placeholder=" 이메일"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div className="login-input">
          <input
            className="input-box"
            placeholder=" 비밀번호"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="wanning-div">{this.state.check}</div>
        <button className="login-btn" onClick={this.loginButtonClick}>
          로그인
        </button>
        <div className="login-a-div" onClick={this.moveSignupPage}>
          트레바리 가입하기!
        </div>
        <style jsx>{`
          #login {
            text-align: center;
          }
          .login-text {
            font-size: 50px;
          }
          .login-input {
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .input-box {
            width: 300px;
            height: 40px;
            font-size: 15px;
          }
          .wanning-div {
            color: red;
            font-size: 11px;
            height: 20px;
          }
          .login-btn {
            font-size: 15px;
            width: 300px;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .login-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          .login-a-div {
            margin-top: 20px;
            margin-bottom: 20px;
            height: 20px;
            font-size: 13px;
            color: blue;
          }
          .login-a-div:hover {
            cursor: pointer;
            color: orange;
          }
          @media screen and (max-width: 600px) {
            #login {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
