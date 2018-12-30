import React from "react";
import fetch from "isomorphic-unfetch";
import Layout from '../containers/Layout';
import Filter from '../containers/Filter';

const Index = props => {
  return (
    <Layout>
      <Filter />
      <div id="index">

        <div id="index_box">
          <h1>Index Page</h1>
          <h2>by SuperSexy!</h2>
          <h1>{props.show}</h1>
        </div>

        <style jsx>{`
          #index {
            border: 1px solid #DDD;
          }
          #index_box {
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

// Index.getInitialProps = async function() {
//   const res = await fetch("http://3.16.58.104:5000/");
//   const data = await res.json();
//   return {
//     show: data.message
//   };
// };

export default Index;
