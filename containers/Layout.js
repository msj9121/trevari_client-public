import React, { Component } from 'react';
import Header from './Header';
import Filter from './Filter';
import Footer from './Footer';

class Layout extends Component {
  render() {
    console.log("children", this.props.children)
    return (
      <div id="layout">

        <Header />
        <Filter />
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