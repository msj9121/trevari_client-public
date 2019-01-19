import Document, { Head, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <title>트레바리 - 읽고, 쓰고, 대화하고, 친해져요</title>
          <link
            href="https://fonts.googleapis.com/css?family=Gothic+A1&amp;subset=korean"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/trevari_icon.png"></link>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            * {
              font-family: "Gothic A1", sans-serif;
            }
            body {
              margin: 0 auto;
            }
          `}</style>
        </body>
      </html>
    );
  }
}

export default CustomDocument;
