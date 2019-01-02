import React from "react";
import fetch from "isomorphic-unfetch";
import Banner from "../components/books/Banner";
import Kategori from "../components/books/Kategori";
import Link from "next/link";

const Books = props => {
  return (
    <div>
      <Banner />
      <div id="books">

        <div id="books_box">

          <Kategori />
          <Kategori />
          <Kategori />
          <Kategori />

        </div>

        <style jsx>{`
          #books {
            
          }
          #books_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #books_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    </div>
  );
};

// Books.getInitialProps = async function() {
//   const res = await fetch("http://3.16.58.104:5000/");
//   const data = await res.json();
//   return {
//     show: data.message
//   };
// };

Books.getInitialProps = async function () {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data
  };
};

export default Books;