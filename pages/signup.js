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

  isCorrect_Email = email => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regex.test(email)) {
      this.setState({
        check: "이메일을 확인해 주세요!"
      });
      return false;
    }
    return true;
  };

  isCorrect_Password = (pw, repw) => {
    if (pw !== repw) {
      this.setState({
        check: "비밀번호를 확인해 주세요!"
      });
      return false;
    }
    return true;
  };

  clickSignupButton = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    if (!this.isCorrect_Email(this.state.email)) {
      return;
    }
    if (!this.isCorrect_Password(this.state.password, this.state.repassword)) {
      return;
    }
    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = () => {
    const data = {
      email: this.state.email
    };
    console.log("data", data);
    axios.get(`${BACKEND_ENDPOINT}/users/email`, {
      params: {
        email: data.email
      }
    }).then((res) => {
      console.log("DATA", res.data);
      res.data
      ? this.requestSignup(data)
      : this.setState({
          check: "이미 가입된 이메일 입니다!"
        })
    })
    .catch((err) => {
      console.log(err);
    })
  };

  requestSignup = () => {
    console.log("requestSignup")
    const data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    axios
      .post(`${BACKEND_ENDPOINT}/users/user`, data)
      .then(res => {
        if (res.data) {
          Router.push("/login");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div id="signup">
        <div className="signup_container">
          <div className="signup_box">
            <div className="signup-text">회원가입</div>
            <div className="signup-inputbox">
              <div className="signup-input">
                <input
                  className="input-box"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  name="email"
                  onChange={this.handleChange}
                />
              </div>

              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="비밀번호를 입력해주세요.(8~16자)"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="비밀번호를 다시 입력해주세요."
                  type="password"
                  name="repassword"
                  onChange={this.handleChange}
                />
              </div>

              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="이름을 입력해주세요."
                  name="name"
                  onChange={this.handleChange}
                />
              </div>
              <div className="signup-input">
                <input
                  className="input-box"
                  placeholder="휴대폰 번호를 입력해주세요."
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </div>
              <div className="wanning-div">{this.state.check}</div>
              <button className="signup-btn" onClick={this.clickSignupButton}>
                회원가입
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          #signup {
            background-color: rgba(0, 0, 0, 0.03);
          }
          .signup_container {
            max-width: 1140px;
            height: 800px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .signup_box {
            border: 1px solid #ddd;
            width: 370px;
            background-color: white;
          }
          .signup-text {
            font-size: 35px;
            text-align: left;
            margin: 35px 20px;
          }
          .signup-inputbox {
            text-align: center;
            margin: 0px 20px;
          }
          .signup-input {
            margin-bottom: 10px;
          }
          .input-box {
            width: 100%;
            height: 40px;
            font-size: 15px;
            padding: 5px 0px 5px 5px;
            border: 1px solid #ddd;
          }
          .wanning-div {
            color: red;
            font-size: 11px;
            height: 20px;
          }
          .signup-btn {
            font-size: 18px;
            width: 100%;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            margin-bottom: 20px;
            border: none;
            background-color: #ff8906;
          }
          .signup-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 600px) {
            #signup {
              width: 100%;
            }
            .signup_container {
              height: 600px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Signup;
