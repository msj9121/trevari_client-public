import React, { Component, MouseEvent } from "react";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../constant";
import UpdateUserData from "../components/mypage/UpdateUserData";
import Reviews from "../components/mypage/Reviews";
import Bookmarks from "../components/mypage/Bookmarks";

interface MypageProps {
  ID: string;
  reviews: IReviews[];
  reviewsLength: Number;
}

interface MypageState {
  id: string | null;
  reviews: IReviews[];
  reviewsLength: Number;
  books: IBooks | string[];
  booksLength: Number;
  tabName: string | null;
  userDataModal: Boolean;
  editedReview: string;
  loading: Boolean;
  isFinish: Boolean;
}

export interface IReviews {
  Book: IBook;
  data: string;
  book_id: Number | string;
  createdAt: String;
  id: Number;
  score: number;
  text: string;
  user_id: Number;
  [key: string]: any;
}

export interface IBooks {
  Book: IBook;
  book_id: Number;
  id: Number;
  user_id: Number;
}

interface IBook {
  author: String;
  averageScore: Number;
  bookmarkCount: Number;
  description: String;
  id: Number;
  image: String;
  isbn: String;
  publishedAt: Number;
  publisher: String;
  title: String;
}

interface IContext {
  query: IQuery;
}

interface IQuery {
  userId: string;
}

interface IEvent {
  target: HTMLButtonElement;
}

interface Itarget {
  textContent: string;
}

class Mypage extends Component<MypageProps, MypageState> {
  state: MypageState;

  static async getInitialProps(context: IContext) {
    const { userId } = context.query;

    const reviews = await axios.get(`${BACKEND_ENDPOINT}/reviews/my-reviews`, {
      params: {
        userId: userId,
        offset: 0
      }
    });

    return {
      reviews: reviews.data,
      reviewsLength: reviews.data.length
    };
  }

  constructor(props: MypageProps) {
    super(props);
    this.state = {
      id: this.props.ID,
      reviews: props.reviews,
      reviewsLength: props.reviewsLength,
      books: [],
      booksLength: 0,
      tabName: "내가 평가한 책",
      userDataModal: false,
      editedReview: "",
      loading: false,
      isFinish: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({
        id: localStorage.getItem("user")
      });
    }
  }

  _changeLoadingState = () => {
    this.setState({
      loading: false
    });
  };

  _getBookmarks = () => {
    const userId = this.state.id;

    if (this.state.loading) {
      return;
    }

    this.setState({
      loading: true
    });

    axios
      .get(`${BACKEND_ENDPOINT}/bookmarks/my-bookmarks`, {
        params: {
          userId: userId,
          offset: 0
        }
      })
      .then(res => {
        this.setState({
          books: res.data,
          booksLength: res.data.length,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  _changeTabName = (event: MouseEvent<HTMLButtonElement>) => {
    let tabName = event.currentTarget.textContent;

    this.setState({
      tabName: tabName,
      isFinish: false
    });
  };

  _deleteReview = (review: IReviews) => {
    const reviews = this.state.reviews;
    const targetIndex2 = reviews.indexOf(review);
    const copiedReviews = this.state.reviews.slice();
    copiedReviews.splice(targetIndex2, 1);

    this.setState({
      reviews: copiedReviews
    });
  };

  _deleteBookmark = (book: string) => {
    const books = this.state.books as string[];
    const targetIndex2 = books.indexOf(book);
    const copiedBooks = books.slice();
    copiedBooks.splice(targetIndex2, 1);

    this.setState({
      books: copiedBooks
    });
  };

  _getMoreReviews = () => {
    const userId = this.state.id;

    if (this.state.loading) {
      return;
    }

    if (this.state.isFinish) {
      return;
    }

    this.setState({
      loading: true
    });

    axios
      .get(`${BACKEND_ENDPOINT}/reviews/my-reviews`, {
        params: {
          userId: userId,
          offset: this.state.reviewsLength
        }
      })
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            isFinish: true
          });
        }
        this.setState({
          // isFinish: res.data? true : false,
          reviews: this.state.reviews.concat(res.data),
          reviewsLength: this.state.reviewsLength + res.data.length,
          loading: false
        });
      });
  };

  _getMoreBookmarks = () => {
    const userId = this.state.id;

    if (this.state.loading) {
      return;
    }

    if (this.state.isFinish) {
      return;
    }

    this.setState({
      loading: true
    });

    axios
      .get(`${BACKEND_ENDPOINT}/bookmarks/my-bookmarks`, {
        params: {
          userId: userId,
          offset: this.state.booksLength
        }
      })
      .then(res => {
        if (res.data.length === 0) {
          this.setState({
            isFinish: true
          });
        }

        const books = this.state.books as string[];

        this.setState({
          books: books.concat(res.data),
          booksLength: this.state.booksLength + res.data.length,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  _showUserDataModal = () => {
    this.setState({
      userDataModal: !this.state.userDataModal
    });
  };

  _editReview = (
    editedReview: string,
    userId: number,
    bookId: number,
    reviewId: number,
    rating: number
  ) => {
    let newReviews = this.state.reviews as IReviews[];

    for (var i = 0; i < newReviews.length; i++) {
      if (newReviews[i]["id"] === reviewId) {
        newReviews[i]["text"] = editedReview;
        newReviews[i]["score"] = rating;
      }
    }

    axios
      .put(`${BACKEND_ENDPOINT}/reviews/review`, {
        userId: userId,
        bookId: bookId,
        score: rating,
        text: editedReview
      })
      .then(res => {
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
            userId={localStorage.getItem("user")}
            _showUserDataModal={this._showUserDataModal}
          />
        ) : (
          undefined
        )}

        <div id="mypage_navBox">
          <div id="Mypage_nav">
            <div>
              <button
                id="reviews_btn"
                onClick={event => this._changeTabName(event)}
              >
                내가 평가한 책
              </button>
              <button
                id="bookmarks_btn"
                onClick={event => {
                  this._changeTabName(event);
                  this._getBookmarks();
                }}
              >
                내가 읽고싶은 책
              </button>
            </div>
            <button id={"userSettingsButton"} onClick={this._showUserDataModal}>
              <i className="fas fa-cog" />
            </button>
          </div>
        </div>
        <div id="contents_box">
          {this.state.tabName === "내가 평가한 책" ? (
            <Reviews
              reviews={this.state.reviews}
              _deleteReview={this._deleteReview}
              _getMoreReviews={this._getMoreReviews}
              editedReview={this.state.editedReview}
              _editReview={this._editReview}
              loading={this.state.loading}
              _changeLoadingState={this._changeLoadingState}
            />
          ) : (
            <Bookmarks
              books={this.state.books}
              _deleteBookmark={this._deleteBookmark}
              _getMoreBookmarks={this._getMoreBookmarks}
              id={this.state.id}
              loading={this.state.loading}
              _changeLoadingState={this._changeLoadingState}
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
            background-color: white;
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

export default Mypage;
