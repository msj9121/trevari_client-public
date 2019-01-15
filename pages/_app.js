import App, { Container } from "next/app";
import Header from "../containers/Header";
import Footer from "../containers/Footer";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      movepage: "/login",
      text: "로그인",
      hiddenBox_status: "none",
      headerMypage_status: "none"
    };
  }

  changeCondition = () => {
    this.setState({
      movepage: "/index",
      text: "로그아웃",
      headerMypage_status: "block"
    });
  };

  rechangeCondition = () => {
    if (this.state.text === "로그아웃") {
      this.setState({
        id: "",
        movepage: "/login",
        text: "로그인",
        headerMypage_status: "none"
      });
    }
  };

  saveId = loginId => {
    this.setState({
      id: loginId
    });
  };

  changeHiddenBoxStatus = () => {
    if (this.state.hiddenBox_status === "none") {
      this.setState({
        hiddenBox_status: "block"
      });
    } else if (this.state.hiddenBox_status === "block") {
      this.setState({
        hiddenBox_status: "none"
      });
    }
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <div id="head">
          <Header
            loginState={this.state}
            rechangeCondition={this.rechangeCondition}
            ID={this.state.id}
            changeHiddenBoxStatus={this.changeHiddenBoxStatus}
            hiddenBox_status={this.state.hiddenBox_status}
            headerMypage_status={this.state.headerMypage_status}
          />
          <style jsx>{`
            #head {
              position: fixed;
              width: 100%;
              z-index: 999;
            }
          `}</style>
        </div>

        <div id="pages">
          <Component
            {...pageProps}
            ID={this.state.id}
            saveId={this.saveId}
            changeCondition={this.changeCondition}
          />
          <style jsx>{`
            #pages {
              padding-top: 60px;
              width: 100%;
            }
          `}</style>
        </div>
        <Footer />
      </Container>
    );
  }
}
