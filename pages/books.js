import React from "react";
import fetch from "isomorphic-unfetch";
import Banner from "../components/books/Banner";
import Kategori from "../components/books/Kategori";
import axios from "axios";

const Books = props => {
  console.log("Books.js : ", props)
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

// Books.getInitialProps = async function () {
//   const res = await axios("http://3.16.58.104:5000/books/searchByTitle");
//   const data = await res.data;

//   return {
//     shows: data
//   };
// };

// Books.getInitialProps = async function () {
//   const res = await axios.post("http://3.16.58.104:5000/books/searchByTitle", { input: "a"});
//   const data = await res.data;

//   return {
//     shows: data
//   };
// };

export default Books;