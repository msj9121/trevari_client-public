import React, { Component } from "react";
import axios from "axios";
import { Router } from "../../routes/routes";

class logincom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogined: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginButtonClick = this.loginButtonClick.bind(this);
    this.requestLogin = this.requestLogin.bind(this);
    this.loginCheck = this.loginCheck.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  email_check = email => {
    var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!regex.test(email)) {
      console.log("[-] Not email!!!");
      return false;
    } else {
      console.log("[+] email OK!");
      return true;
    }
  };

  loginButtonClick = () => {
    for (var key in this.state) {
      if (this.state[key] === "") {
        console.log(`[-] ${key} is Empty`);
        return;
      }
    }
    if (!this.email_check(this.state.email)) {
      return;
    }

    console.log("[+] Data OK!");

    this.requestLogin();
  };

  requestLogin = () => {
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://3.16.58.104:5000/users/login", data)
      .then(res =>
        res.data ? this.loginCheck() : console.log("[-] data NoNO!")
      )
      //   .then()
      .catch(err => console.log(err));
  };

  loginCheck = () => {
    console.log("[+] Login OK!");
    this.state.isLogined = true;
    Router.pushRoute("/index");
  };

  render() {
    return (
      <div>
        <div>
          <h1>로그인</h1>
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
          <a>* 이메일 형식 확인</a>
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
          <a>* 비밀번호 확인</a>
        </div>

        <button onClick={this.loginButtonClick}>Login</button>
        <div>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    );
  }
}

export default logincom;
