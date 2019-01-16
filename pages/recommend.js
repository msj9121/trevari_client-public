import React, { Component } from "react";
import axios from "axios";
import RecommendBanner from "../components/recommend/RecommendBanner";
import RecommendBooks from "../components/recommend/RecommendBooks";
import Filter from "../containers/Filter";
import { BACKEND_ENDPOINT } from "../constant";
import Spinner from "../components/books/Spinner";

class Recommend extends Component {
  static async getInitialProps() {
    const recommend = "/books/most-bookmarks";

    // 인기작품
    const res = await axios.get(`${BACKEND_ENDPOINT}/books/most-bookmarks`);

    const mostBookmarks = res.data.slice(0, 6);

    return {
      recommend,
      mostBookmarks
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      recommend: this.props.recommend,
      mostBookmarks: this.props.mostBookmarks
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
          recommend2: "/books/new-release",
          newRelease: res.data.slice(0, 6)
        });
      })
      .catch(err => console.log(err));

    //평점
    axios
      .get(`${BACKEND_ENDPOINT}/books/best-rated`)
      .then(res => {
        this.setState({
          recommend3: "/books/best-rated",
          bestRated: res.data.slice(0, 6)
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
          recommend4: "/books/my-recommendations",
          myRecommendations: res.data.slice(0, 6)
        });
      })
      .catch(err => console.log(err));
  };

  _renderRecommendBooks = () => {
    const newRelease = this.state.newRelease;
    const bestRated = this.state.bestRated;
    const myRecommendations = this.state.myRecommendations;

    return (
      <React.Fragment>
        <RecommendBooks
          title={"2019년 신작"}
          recommendBooks={newRelease}
          ID={this.props.ID}
          recommend={this.state.recommend2}
        />
        <RecommendBooks
          title={"최고 인기작품 TOP 30"}
          recommendBooks={bestRated}
          ID={this.props.ID}
          recommend={this.state.recommend3}
        />
        <RecommendBooks
          title={"트레바리 추천"}
          recommendBooks={myRecommendations}
          ID={this.props.ID}
          recommend={this.state.recommend4}
        />
      </React.Fragment>
    );
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
                recommendBooks={this.state.mostBookmarks}
                ID={this.props.ID}
                recommend={this.state.recommend}
              />

              {this.state.newRelease &&
              this.state.bestRated &&
              this.state.myRecommendations ? (
                this._renderRecommendBooks()
              ) : (
                <Spinner />
              )}
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
