import React, { Component } from "react";
import Filter from "../containers/Filter";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false
    };
  }
  render() {
    return (
        <div id="index">
          <div id="index_box">
            <h1>Index Page</h1>
            <h2>by SuperSexy!</h2>
            <h1>{this.props.show}</h1>
          </div>

          <style jsx>{`
            #index {
            }
            #index_box {
              border: 1px solid #ddd;
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
    );
  }
}

export default Index;
