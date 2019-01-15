import React, { Component } from "react";
import axios from "axios";
import RecommendBanner from "../components/recommend/RecommendBanner";
import RecommendBooks from "../components/recommend/RecommendBooks";
import Filter from "../containers/Filter";
import { BACKEND_ENDPOINT } from "../constant";

class Recommend extends Component {
  static async getInitialProps() {
    const input1 = "대한";

    const res1 = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
      input: input1
    });

    const recommendBooks1 = res1.data.slice(0, 6);

    return {
      input1,
      recommendBooks1
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      input1: this.props.input1,
      input2: "해리",
      input3: "시간",
      input4: "여행",
      recommendBooks1: this.props.recommendBooks1,
      recommendBooks2: [],
      recommendBooks3: [],
      recommendBooks4: []
    };
  }

  componentDidMount() {
    this._getRecommendBooks();
  }

  _getRecommendBooks = () => {
    axios
      .post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
        input: this.state.input2
      })
      .then(res => {
        this.setState({
          recommendBooks2: this.state.recommendBooks2.concat(
            res.data.slice(0, 6)
          )
        });
      })
      .catch(err => console.log(err));

    axios
      .post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
        input: this.state.input3
      })
      .then(res => {
        this.setState({
          recommendBooks3: this.state.recommendBooks3.concat(
            res.data.slice(0, 6)
          )
        });
      })
      .catch(err => console.log(err));

    axios
      .post(`${BACKEND_ENDPOINT}/books/searchByTitle`, {
        input: this.state.input4
      })
      .then(res => {
        this.setState({
          recommendBooks4: this.state.recommendBooks4.concat(
            res.data.slice(0, 6)
          )
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Filter />
        <div id="recommend">
          <RecommendBanner ID={this.props.ID} />
          <div id="recommend-container">
            <div id="recommend_box">
              <RecommendBooks
                title={"트레바리 인기작품 BEST 30"}
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
          </div>

          <style jsx>{`
            #recommend {
              padding-top: 57px;
            }
            #recommend-container {
              background: rgba(0, 0, 0, 0.03);
            }
            #recommend_box {
              border: 1px solid #ddd;
              margin: 0 auto;
              max-width: 1140px;
              background-color: white;
              padding-top: 10px;
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
