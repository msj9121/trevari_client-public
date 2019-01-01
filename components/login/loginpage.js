import React, { Component } from "react";
import axios from "axios";
import { Router } from "../../routes/routes";

class loginpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkRegisteredEmail = this.checkRegisteredEmail.bind(this);
    this.requestLogin = this.requestLogin.bind(this);
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkRegisteredEmail = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      //   .post("http://3.16.58.104:5000/users/checkEmailAvailability", data)
      .post("http://localhost:5000/users/checkEmailAvailability", data)
      .then(res =>
        res.data
          ? console.log("[-] Check your email!")
          : this.requestLogin(data)
      )
      .catch(err => console.log(err));
  };

  requestLogin = data => {
    axios
      //   .post("http://3.16.58.104:5000/users/login", data)
      .post("http://localhost:5000/users/login", data)
      .then(res =>
        res.data
          ? Router.pushRoute("/index")
          : console.log("[-] Check your password!")
      )
      .catch(err => console.log(err));
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

        <button onClick={this.checkRegisteredEmail}>Login</button>
        <div>
          <a href="/signup">회원가입</a>
        </div>
      </div>
    );
  }
}

export default loginpage;
