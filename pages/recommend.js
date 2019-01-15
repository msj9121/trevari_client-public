import React, { Component } from "react";
import axios from "axios";
import RecommendBanner from "../components/recommend/RecommendBanner";
import RecommendBooks from "../components/recommend/RecommendBooks";
import Filter from "../containers/Filter";
import { BACKEND_ENDPOINT } from "../constant";
import Spinner from "../components/books/Spinner";

class Recommend extends Component {
  static async getInitialProps() {
    const input1 = "대한";

    // 인기작품
    const res = await axios.get(`${BACKEND_ENDPOINT}/books/most-bookmarks`, {
      params: {
        input: input1,
        offset: 0
      }
    });

    const mostBookmarks = res.data.slice(0, 6);

    return {
      input1,
      mostBookmarks
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      input1: this.props.input1,
      input2: "해리",
      input3: "시간",
      input4: "여행",
      mostBookmarks: this.props.mostBookmarks,
      newRelease: [],
      bestRated: [],
      myRecommendations: []
    };
  }

  componentDidMount() {
    this._getRecommendBooks();
  }

  _getRecommendBooks = () => {
    //신작
    axios
      .get(`${BACKEND_ENDPOINT}/books/new-release`)
      .then(res => {
        this.setState({
          newRelease: this.state.newRelease.concat(res.data.slice(0, 6))
        });
      })
      .catch(err => console.log(err));

    //평점
    axios
      .get(`${BACKEND_ENDPOINT}/books/best-rated`)
      .then(res => {
        this.setState({
          bestRated: this.state.bestRated.concat(res.data.slice(0, 6))
        });
      })
      .catch(err => console.log(err));

    // 트레바리 추천
    axios
      .get(`${BACKEND_ENDPOINT}/books/my-recommendations`, {
        params: {
          userId: this.props.ID
        }
      })
      .then(res => {
        this.setState({
          myRecommendations: this.state.myRecommendations.concat(res.data.slice(0, 6))
        });
      })
      .catch(err => console.log(err));
  };

  // _renderRecommendBooks = () => {
  //   const newRelease = this.state.newRelease;
  //   const bestRated = this.state.bestRated;
  //   const myRecommendations = this.state.myRecommendations;

  //   return (
  //     <React.Fragment>
  //       <RecommendBooks
  //         title={"1월 신작"}
  //         recommendBooks={newRelease}
  //         ID={this.props.ID}
  //         input={this.state.input2}
  //       />
  //       <RecommendBooks
  //         title={"평점이 높은 작품들"}
  //         recommendBooks={bestRated}
  //         ID={this.props.ID}
  //         input={this.state.input3}
  //       />
  //       <RecommendBooks
  //         title={"트레바리 추천작"}
  //         recommendBooks={myRecommendations}
  //         ID={this.props.ID}
  //         input={this.state.input4}
  //       />
  //     </React.Fragment>
  //   );
  // };

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
                recommendBooks={this.state.mostBookmarks}
                ID={this.props.ID}
                input={this.state.input1}
              />
              <RecommendBooks
                title={"1월 신작"}
                recommendBooks={this.state.newRelease}
                ID={this.props.ID}
                input={this.state.input2}
              />
              <RecommendBooks
                title={"평점이 높은 작품들"}
                recommendBooks={this.state.bestRated}
                ID={this.props.ID}
                input={this.state.input3}
              />
              <RecommendBooks
                title={"트레바리 추천작"}
                recommendBooks={this.state.myRecommendations}
                ID={this.props.ID}
                input={this.state.input4}
              />

              {/* {this.state.newRelease &&
              this.state.bestRated &&
              this.state.myRecommendations ? (
                this._renderRecommendBooks()
              ) : (
                <Spinner />
              )} */}
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
