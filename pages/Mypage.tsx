import React, { Component, MouseEvent } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constant";
import UpdateUserData from "../components/mypage/UpdateUserData";
import Reviews from "../components/mypage/Reviews";
import Bookmarks from "../components/mypage/Bookmarks";
import { object } from "prop-types";

interface MypageProps {
  ID: string
  reviews: IReviews[] | string[]
  currentReviews: IReviews[] | string[]
}

interface MypageState {
  id: string
  reviews: IReviews[] | string[]
  currentReviews: IReviews[] | string[]
  books: string[]
  currentBookmarks: string[]
  tabName: string | null
  userDataModal: Boolean
  editedReview: string
}

interface IReviews {
  id: number
  text: string
  score: number
  data: string;
}

interface IContext {
  query: IQuery;
}

interface IQuery {
  userId: string;
}

interface IEvent {
  target: HTMLButtonElement
}

interface Itarget {
  textContent: string
}

class Mypage extends Component<MypageProps, MypageState> {
  state: MypageState

  static async getInitialProps(context: IContext) {
    const { userId } = context.query;

    const reviews = await axios.post(
      `${BACKEND_ENDPOINT}/reviews/getMyReviews`,
      { userId }
    );

    return {
      reviews: reviews.data,
      currentReviews: reviews.data.slice(0, 10)
    };
  }

  constructor(props: MypageProps) {
    super(props);
    this.state = {
      id: this.props.ID,
      reviews: props.reviews,
      currentReviews: props.currentReviews,
      books: [],
      currentBookmarks: [],
      tabName: "내가 평가한 책",
      userDataModal: false,
      editedReview: ""
    };
  }

  _getBookmarks = () => {
    const userId = this.props.ID;

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, { userId })
      .then(res => {
        this.setState({
          books: res.data,
          currentBookmarks: res.data.slice(0, 10)
        });
      })
      .catch(err => console.log(err));
  };

  _changeTabName = (event: MouseEvent<HTMLButtonElement>) => {
    let tabName = event.currentTarget.textContent;

    this.setState({
      tabName: tabName
    });
  };

  _deleteReview = (review: string) => {
    const currentReviews = this.state.currentReviews as string[];
    const targetIndex1 = currentReviews.indexOf(review);
    const copiedCurrentReviews = this.state.currentReviews.slice();
    copiedCurrentReviews.splice(targetIndex1, 1);

    const reviews = this.state.reviews as string[];
    const targetIndex2 = reviews.indexOf(review);
    const copiedReviews = this.state.reviews.slice();
    copiedReviews.splice(targetIndex2, 1);

    this.setState({
      reviews: copiedReviews,
      currentReviews: copiedCurrentReviews
    });
  };

  _deleteBookmark = (book: string) => {
    const targetIndex1 = this.state.currentBookmarks.indexOf(book);
    const copiedCurrentBookmarks = this.state.currentBookmarks.slice();
    copiedCurrentBookmarks.splice(targetIndex1, 1);

    const targetIndex2 = this.state.books.indexOf(book);
    const copiedBooks = this.state.books.slice();
    copiedBooks.splice(targetIndex2, 1);

    this.setState({
      books: copiedBooks,
      currentBookmarks: copiedCurrentBookmarks
    });
  };

  _getMoreReviews = () => {
    const reviewsLength = this.state.currentReviews.length;
    const newLength = reviewsLength + 10;

    this.setState({
      currentReviews: this.state.reviews.slice(0, newLength)
    });
  };

  _getMoreBookmarks = () => {
    const bookmarksLength = this.state.currentBookmarks.length;
    const newLength = bookmarksLength + 10;

    this.setState({
      currentBookmarks: this.state.books.slice(0, newLength)
    });
  };

  _showUserDataModal = () => {
    this.setState({
      userDataModal: !this.state.userDataModal
    });
  };

  _editReview = (editedReview: string, userId: number, bookId: number, reviewId: number, rating: number) => {
    let newReviews = this.state.reviews as IReviews[];
    
    for (var i = 0; i < newReviews.length; i++) {
      if (newReviews[i]["id"] === reviewId) {
        newReviews[i]["text"] = editedReview;
        newReviews[i]["score"] = rating;
      }
    }

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/editReview`, {
        userId: userId,
        bookId: bookId,
        score: rating,
        text: editedReview
      })
      .then((res) => {
        if (res.data) {
          this.setState({
            reviews: newReviews
          });
          console.log(
            `수정된 리뷰: ${editedReview}, 수정된 평가점수: ${rating}`
          );
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    if (!this.state.id) {
      return (
        <div id ="notLogin">
          <h2>로그인을 해주세요</h2>
          <style jsx>{`
            #notLogin {
              display: flex;
              justify-content: center;
              align-items: center;
              border: solid 1px #ced4da;
              height: 350px;
          `}</style>
        </div>
      );
    } else if (this.state.id) {
      return (
        <div id="mypage">
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
            crossOrigin="anonymous"
          />
          {this.state.userDataModal ? (
            <UpdateUserData
              userId={this.props.ID}
              _showUserDataModal={this._showUserDataModal}
            />
          ) : (
            undefined
          )}
          <div id="mypage_navBox">
            <div id="Mypage_nav">
              <span>
                <button
                  id="reviews_btn"
                  onClick={this._changeTabName}
                >
                  내가 평가한 책
                </button>
              </span>
              <span>
                <button
                  id="bookmarks_btn"
                  onClick={event => {
                    this._changeTabName(event);
                    this._getBookmarks();
                  }}
                >
                  내가 읽고싶은 책
                </button>
              </span>
              <button
                id={"userSettingsButton"}
                onClick={this._showUserDataModal}
              >
                <i className="fas fa-cog" />
              </button>
            </div>
          </div>
          <div id="contents_box">
            { this.state.tabName === "내가 평가한 책" ? (
              <Reviews
                currentReviews={this.state.currentReviews}
                _deleteReview={this._deleteReview}
                _getMoreReviews={this._getMoreReviews}
                editedReview={this.state.editedReview}
                _editReview={this._editReview}
              />
            ) : (
              <Bookmarks
                currentBookmarks={this.state.currentBookmarks}
                _deleteBookmark={this._deleteBookmark}
                _getMoreBookmarks={this._getMoreBookmarks}
              />
            )}
          </div>
          <style jsx>{`
            #mypage {
              background: rgba(0, 0, 0, 0.03);
            }
            #userSettingsButton {
              float: right;
              font-size: 16px;
              color: grey;
              border-radius: 10%;
            }
            #mypageTitle {
              height: 10px;
            }
            #mypage_navBox {
              border-bottom: solid 1px #ddd;
              background-color: white;;
            }
            #Mypage_nav {
              margin-left: auto;
              margin-right: auto;
              max-width: 1140px;
            }
            #contents_box {
              margin-left: auto;
              margin-right: auto;
              max-width: 1140px;
            }

            #reviews_btn {
              font-size: 15px;
              padding: 15px 10px 15px 10px;
              margin-right: 10px;
              color: #4e4e4e;
              border: none;
              background-color: white;
              cursor: pointer;
              outline-style: none;
              font-weight: 400;
            }
            #reviews_btn:hover {
              font-weight: 700;
            }
            #reviews_btn:focus {
              border-bottom: #ff8906 solid 2px;
              font-weight: 700;
            }

            #bookmarks_btn {
              font-size: 15px;
              padding: 15px 10px 15px 10px;
              margin-right: 10px;
              color: #4e4e4e;
              border: none;
              background-color: white;
              cursor: pointer;
              outline-style: none;
              font-weight: 400;
            }
            #bookmarks_btn:hover {
              font-weight: 700;
            }
            #bookmarks_btn:focus {
              border-bottom: #ff8906 solid 2px;
              font-weight: 700;
            }

            #addBooks_btn {
              border: solid 1px #ced4da;
            }
            #addBooks_btn:hover {
              font-weight: bold;
            }
            #addBooks_btn:focus {
              font-weight: bold;
              border: solid 2px #ced4da;
            }
            @media screen and (max-width: 800px) {
              #mypage {
                width: 100%;
              }
              #contents_box {
                width: 100%;
              }
              #Mypage_nav {
                width: 80%;
              }
              #reviews_btn {
                font-size: 12px;
                height: 20px;
                padding: 0px;
                width: 30%;
                margin-right: ;
              }
              #bookmarks_btn {
                font-size: 12px;
                height: 20px;
                padding: 0px;
                width: 35%;
                margin-right: ;
              }
              #userSettingsButton {
              }
            }
          `}</style>
        </div>
      );
    }
  }
}

export default Mypage;
