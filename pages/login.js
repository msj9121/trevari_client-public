import React, { Component } from "react";
import Layout from "../containers/Layout";
import Logincom from "../components/login/logincom";
import Index from "../pages/index";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Layout>
        <div id="login">
          <div id="login_box">
            <Logincom />
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
      </Layout>
    );
  }
}

export default Login;
