import React, { Component } from "react";
import axios from "axios";
import RecommendBanner from "../components/recommend/RecommendBanner";
import RecommendBooks from "../components/recommend/RecommendBooks";
import Filter from "../containers/Filter";
import { BACKEND_ENDPOINT } from "../constant";
import Spinner from "../components/books/Spinner";
import Router from "next/router";

class Recommend extends Component {
  static async getInitialProps() {
    const recommend = "/books/best-rated";

    // 평점
    const res = await axios.get(`${BACKEND_ENDPOINT}/books/best-rated`);

    const bestRated = res.data.slice(0, 6);

    return {
      recommend,
      bestRated
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      recommend: this.props.recommend,
      bestRated: this.props.bestRated
    };
  }

  componentDidMount() {
    this._getRecommendBooks();
  }

  _onSearchBookTitle = title => {
    Router.push("/books?input=" + title);
  };

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

    // 인기작품
    axios
      .get(`${BACKEND_ENDPOINT}/books/most-bookmarks`)
      .then(res => {
        this.setState({
          recommend3: "/books/most-bookmarks",
          mostBookmarks: res.data.slice(0, 6)
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
    const mostBookmarks = this.state.mostBookmarks;
    const myRecommendations = this.state.myRecommendations;

    return (
      <React.Fragment>
        <RecommendBooks
          title={"2018년 신작"}
          recommendBooks={newRelease}
          ID={this.props.ID}
          recommend={this.state.recommend2}
        />
        <RecommendBooks
          title={"인기작품 TOP 30"}
          recommendBooks={mostBookmarks}
          ID={this.props.ID}
          recommend={this.state.recommend3}
        />
        {this.props.ID ? (
          <RecommendBooks
            title={"트레바리 추천작"}
            recommendBooks={myRecommendations}
            ID={this.props.ID}
            recommend={this.state.recommend4}
          />
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div>
        <Filter _onSearchBookTitle={this._onSearchBookTitle} />
        <div id="recommend">
          <RecommendBanner ID={this.props.ID} />
          <div id="recommend-container">
            <div id="recommend_box">
              <RecommendBooks
                title={"트레바리 BEST 30"}
                recommendBooks={this.state.bestRated}
                ID={this.props.ID}
                recommend={this.state.recommend}
              />

              {this.state.newRelease &&
              this.state.mostBookmarks &&
              this.state.myRecommendations ? (
                this._renderRecommendBooks()
              ) : (
                <Spinner />
              )}
            </div>
          </div>

          <style jsx>{`
            #recommend {
              padding-top: 53px;
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
