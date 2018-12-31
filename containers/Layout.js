import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class Layout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="layout">
        <Header />
        {this.props.children}
        <Footer />

        <style jsx>{`
          #layout {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default Layout;
