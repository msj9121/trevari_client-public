import React, { Component } from "react";
import axios from "axios";
import RecommendBanner from "../components/recommend/RecommendBanner";
import RecommendBooks from "../components/recommend/RecommendBooks";
import { BACKEND_ENDPOINT } from "../constant";

class Recommend extends Component {
  static async getInitialProps() {
    const input1 = "대한";
    const input2 = "해리";
    const input3 = "시간";
    const input4 = "여행";

    const res = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: input1
    });
    const res2 = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: input2
    });
    const res3 = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: input3
    });
    const res4 = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: input4
    });

    const recommendBooks1 = await res.data.slice(0, 6);
    const recommendBooks2 = await res2.data.slice(0, 6);
    const recommendBooks3 = await res3.data.slice(0, 6);
    const recommendBooks4 = await res4.data.slice(0, 6);

    return {
      input1,
      input2,
      input3,
      input4,
      recommendBooks1,
      recommendBooks2,
      recommendBooks3,
      recommendBooks4
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      input1: this.props.input1,
      input2: this.props.input2,
      input3: this.props.input3,
      input4: this.props.input4,
      recommendBooks1: this.props.recommendBooks1,
      recommendBooks2: this.props.recommendBooks2,
      recommendBooks3: this.props.recommendBooks3,
      recommendBooks4: this.props.recommendBooks4
    };
  }

  render() {
    return (
      <div>
        <RecommendBanner />
        <div id="recommend">
          <div id="recommend_box">
            <RecommendBooks
              title={"베스트 셀러 TOP 30"}
              recommendBooks={this.state.recommendBooks1}
              ID={this.props.ID}
              input={this.state.input1}
            />
            <RecommendBooks
              title={"1월 신작"}
              recommendBooks={this.state.recommendBooks2}
              ID={this.props.ID}
              input={this.state.input2}
            />
            <RecommendBooks
              title={"평점이 높은 작품들"}
              recommendBooks={this.state.recommendBooks3}
              ID={this.props.ID}
              input={this.state.input3}
            />
            <RecommendBooks
              title={"트레바리 추천작"}
              recommendBooks={this.state.recommendBooks4}
              ID={this.props.ID}
              input={this.state.input4}
            />
          </div>

          <style jsx>{`
            #recommend {
              background: rgba(0, 0, 0, 0.03);
            }
            #recommend_box {
              border: 1px solid #ddd;
              margin: 0 auto;
              width: 60%;
              background-color: white;
            }
            @media screen and (max-width: 600px) {
              #recommend_box {
                width: 100%;
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}

export default Recommend;
