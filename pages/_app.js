import React from 'react';
import App, { Container } from 'next/app';
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Filter from "../containers/Filter";

export default class MyApp extends App {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Header />
        <Filter />
        <Component {...pageProps}/>
        <Footer />
      </Container>
    )
  }
}