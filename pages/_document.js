import Document, { Head, Main, NextScript } from "next/document";

const bodyStyle = {
  margin: "0 auto"
  // width: '1600px'
};

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          {/* <title>트레바리 - 읽고, 쓰고, 대화하고, 친해져요</title> */}
        </Head>
        <body style={bodyStyle}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
