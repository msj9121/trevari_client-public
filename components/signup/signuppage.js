import React, { Component } from "react";
import axios from "axios";
import { Router } from "../../routes/routes";

class signuppage extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.signupButtonClick = this.signupButtonClick.bind(this);
    this.checkRegisteredEmail = this.checkRegisteredEmail.bind(this);
    this.requestSignup = this.requestSignup.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  email_check = email => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regex.test(email)) {
      console.log("[-] Not Email!");
      this.setState({
        check: "이메일을 확인해 주세요!"
      });
      return false;
    } else {
      console.log("[+] email OK!");
      return true;
    }
  };

  password_check = (pw, repw) => {
    if (pw !== repw) {
      console.log("[-] Not match PW!");
      this.setState({
        check: "비밀번호를 확인해 주세요!"
      });
      return false;
    } else {
      console.log("[+] password OK!");
      return true;
    }
  };

  signupButtonClick = () => {
    for (var key in this.state) {
      if (this.state[key] === null) {
        console.log(`[-] ${key} is Empty`);
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      }
    }
    if (!this.email_check(this.state.email)) {
      return;
    }
    if (!this.password_check(this.state.password, this.state.repassword)) {
      return;
    }

    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = () => {
    const data = {
      email: this.state.email
    };
    axios
      //   .post("http://3.16.58.104:5000/users/checkEmailAvailability", data)
      .post("http://3.16.58.104:5000/users/checkEmailAvailability", data)
      .then(res =>
        res.data
          ? this.requestSignup(data)
          : this.setState({
              check: "이미 가입된 이메일 입니다!"
            })
      )
      .catch(err => console.log(err));
  };

  requestSignup = () => {
    var data = {
      email: this.state.email,
      name: this.state.name,
      password: this.state.password,
      phoneNumber: this.state.phoneNumber
    };
    axios
      //   .post("http://3.16.58.104:5000/users/signup", data)
      .post("http://3.16.58.104:5000/users/signup", data)
      .then(res => {
        if (res.data) {
          Router.pushRoute("/login");
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
      <div>
        <div>
          <h1>회원가입</h1>
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            placeholder="password"
            type="password"
            name="password"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            placeholder="repassword"
            type="password"
            name="repassword"
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input placeholder="name" name="name" onChange={this.handleChange} />
        </div>
        <div>
          <input
            placeholder="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange}
          />
        </div>
        <div id="textStyle">
          <a>{this.state.check}</a>
        </div>
        <button onClick={this.signupButtonClick}>Signup</button>
        <style jsx>{`
          #textStyle {
            color: red;
            font-size: 11px;
          }
        `}</style>
      </div>
    );
  }
}

export default signuppage;
