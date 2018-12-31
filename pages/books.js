import React from "react";
import fetch from "isomorphic-unfetch";
import Layout from '../containers/Layout';
import Filter from '../containers/Filter';

const Books = props => {
  return (
    <Layout>
      <div id="books">

        <div id="books_box">
          <h1>Books Page</h1>
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
            #index_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    </Layout>
  );
};

// Books.getInitialProps = async function() {
//   const res = await fetch("http://3.16.58.104:5000/");
//   const data = await res.json();
//   return {
//     show: data.message
//   };
// };

export default Books;