import React, { Component } from "react";
import Layout from "../containers/Layout";
import Loginpage from "../components/login/loginpage";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout t>
        <div id="login">
          <div id="login_box">
            <Loginpage />
          </div>
        </div>
        {/* style */}
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
      </Layout>
    );
  }
}

export default Login;
