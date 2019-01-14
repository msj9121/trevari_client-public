import App, { Container } from "next/app";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Filter from "../containers/Filter";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, localStorage }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: "없음",
      movepage: "/login",
      text: "로그인",
      hiddenBox_status: "none",
      headerMypage_status: "none"
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({
        id: localStorage.getItem("user"),
        movepage: "/index",
        text: "로그아웃",
        headerMypage_status: "block"
      });
    }
    console.log("id :", this.state.id);
    console.log("id type :", typeof this.state.id);
    console.log("local :", localStorage.getItem("user"));
    console.log("local type :", typeof localStorage.getItem("user"));
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
      localStorage.removeItem("user");
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
        <Header
          loginState={this.state}
          rechangeCondition={this.rechangeCondition}
          ID={this.state.id}
          changeHiddenBoxStatus={this.changeHiddenBoxStatus}
          hiddenBox_status={this.state.hiddenBox_status}
          headerMypage_status={this.state.headerMypage_status}
        />
        <Filter />
        <Component
          {...pageProps}
          ID={this.state.id}
          saveId={this.saveId}
          changeCondition={this.changeCondition}
        />
        <Footer />
      </Container>
    );
  }
}
