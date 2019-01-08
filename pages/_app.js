import App, { Container } from "next/app";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Filter from "../containers/Filter";

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
      text: "로그인"
    };

    this.changeCondition = this.changeCondition.bind(this);
    this.rechangeCondition = this.rechangeCondition.bind(this);
    this._receiveBookmark = this._receiveBookmark.bind(this);
  }

  changeCondition = () => {
    this.setState({
      movepage: "/index",
      text: "로그아웃"
    });
  };

  rechangeCondition = () => {
    if (this.state.text === "로그아웃") {
      this.setState({
        id: "",
        movepage: "/login",
        text: "로그인"
      });
    }
  };

  saveId = loginId => {
    this.setState({
      id: loginId
    });
  };

  _receiveBookmark = user => {
    axios
      .post("http://3.16.58.104:5000/bookmarks/getMyBookmarks", user)
      // .post("http://localhost:5000/users/checkEmailAvailability", data)
      .then(res =>
        this.setState({
          bookMarkData: res.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Header
          loginState={this.state}
          rechangeCondition={this.rechangeCondition}
          ID={this.state.id}
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
