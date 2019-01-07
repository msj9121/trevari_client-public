import React, { Component } from "react";
import axios from "axios";
import Router from "next/router";
import { BACKEND_ENDPOINT } from "../constant";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      name: null,
      phoneNumber: null,
      repassword: null,
      check: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  emailCheck = email => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regex.test(email)) {
      this.setState({
        check: "이메일을 확인해 주세요!"
      });
      return false;
    } else {
      return true;
    }
  };

  passwordCheck = (pw, repw) => {
    if (pw !== repw) {
      this.setState({
        check: "비밀번호를 확인해 주세요!"
      });
      return false;
    } else {
      return true;
    }
  };

  signupButtonClick = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    if (!this.emailCheck(this.state.email)) {
      return;
    }
    if (!this.passwordCheck(this.state.password, this.state.repassword)) {
      return;
    }

    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = async () => {
    const data = {
      email: this.state.email
    };
    await axios
      .post(`${BACKEND_ENDPOINT}/users/checkEmailAvailability`, data)
      .then(res =>
        res.data
          ? this.requestSignup(data)
          : this.setState({
              check: "이미 가입된 이메일 입니다!"
            })
      )
      .catch(err => console.log(err));
  };

  requestSignup = async () => {
    const data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    await axios
      .post(`${BACKEND_ENDPOINT}/users/signup`, data)
      .then(res => {
        if (res.data) {
          Router.push("/login");
        } else {
          this.setState({
            check: "전화번호는 숫자만 입력!"
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="signup">
        <div className="signup-text">회원가입</div>
        <div className="signup-input">
          <input
            className="input-box"
            type="email"
            placeholder=" 이메일"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div className="signup-input">
          <input
            className="input-box"
            placeholder=" 비밀번호"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="signup-input">
          <input
            className="input-box"
            placeholder=" 비밀번호 확인"
            type="password"
            name="repassword"
            onChange={this.handleChange}
          />
        </div>

        <div className="signup-input">
          <input
            className="input-box"
            placeholder=" 이름"
            name="name"
            onChange={this.handleChange}
          />
        </div>
        <div className="signup-input">
          <input
            className="input-box"
            placeholder=" 전화번호"
            name="phoneNumber"
            onChange={this.handleChange}
          />
        </div>
        <div className="wanning-div">{this.state.check}</div>
        <button className="signup-btn" onClick={this.signupButtonClick}>
          회원가입
        </button>
        <style jsx>{`
          #signup {
            text-align: center;
          }
          .signup-text {
            font-size: 50px;
          }
          .signup-input {
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
          .signup-btn {
            font-size: 15px;
            width: 300px;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            margin-bottom: 20px;
            border: orange solid 1px;
            background-color: orange;
          }
          .signup-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 600px) {
            #signup {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Signup;
