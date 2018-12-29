import React from "react";
import fetch from "isomorphic-unfetch";

const Index = props => {
  return (
    <div>
      <h1>Index Page</h1>
      <h2>by SuperSexy!</h2>
      <h1>{props.show}</h1>
    </div>
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
