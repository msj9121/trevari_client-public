import React, { Component} from "react";
import axios from "axios";
import Router from "next/router";
import { BACKEND_ENDPOINT } from "../constant";

interface Loginprops {
    saveId: Function
    changeCondition: Function
}

interface Loginstate {
  [key: string] : string | number | null
}

class Login extends Component<Loginprops, Loginstate> {
  state : Loginstate
  constructor(props: Loginprops) {
    super(props);
    this.state = {
      email: null,
      password: null,
      userid: 0,
      check: "",
    };
  }

 handleChange = (e: React.FormEvent<HTMLInputElement> ) : void => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({
      [name] : value
    });
  };

  clickLoginButton = () => {
    for (let key in this.state) {
      if (this.state[key] === null) {
        this.setState({
          check: "빈칸을 모두 채워 주세요!"
        });
        return;
      };
    }
    this.checkRegisteredEmail();
  };

  checkRegisteredEmail = () => {
    const data = {
      email: this.state.email
    };
    axios
      .post(`${BACKEND_ENDPOINT}/users/checkEmailAvailability`, data)
      .then(res => {
        if (res.data) {
          this.setState({
            check: "가입되지 않은 이메일 입니다!"
          });
        } 
        this.requestLogin();
      })
      .catch(err => console.log(err));
  };

  requestLogin = () => {
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`${BACKEND_ENDPOINT}/users/login`, data)
      .then(res => {
        if (res.data) {
          this.setState({
            userid: res.data.id
          });
          this.props.saveId(this.state.userid);
          this.props.changeCondition();
          Router.push("/index");
        } else {
          this.setState({
            check: "비밀번호를 확인해 주세요!"
          });
        }
      })
      .catch(err => console.log(err));
  };

  moveSignupPage = () => {
    Router.push("/signup");
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

        <button className="login-btn" onClick={this.clickLoginButton}>
          로그인
        </button>

        <div className="login-a-div" onClick={this.moveSignupPage}>
          트레바리 가입하기!
        </div>

        <style jsx={true}>{`
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
