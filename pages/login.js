import React, { Component } from "react";
import Loginpage from "../components/login/loginpage";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="login">
        <div id="login_box">
          <Loginpage />
        </div>
        <style jsx>{`
          #login {
          }
          #login_box {
            display: flex;
            justify-content: center;
            allign-items: center;
            border: 1px solid #ddd;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #login_box {
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Login;
