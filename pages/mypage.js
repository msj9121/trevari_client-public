import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";
import UpdateUserData from "../components/mypage/UpdateUserData";
import { BACKEND_ENDPOINT } from "../constant";
import Reviews from "../components/mypage/Reviews";
import Bookmarks from "../components/mypage/Bookmarks";

class Mypage extends React.Component {
  static async getInitialProps(context) {
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

  constructor(props) {
    super(props);
    this.state = {
      reviews: props.reviews,
      currentReviews: props.currentReviews,
      books: [],
      currentBookmarks: [],
      tabName: "내가 평가한 책",
      userDataModal: false,
      editedReview: "",
      openBtnName: "펼치기"
    };

    this._getBookmarks = this._getBookmarks.bind(this);
    this._deleteReview = this._deleteReview.bind(this);
    this._deleteBookmark = this._deleteBookmark.bind(this);
    this._getMoreReviews = this._getMoreReviews.bind(this);
    this._getMoreBookmarks = this._getMoreBookmarks.bind(this);
    this._openUserDataModal = this._openUserDataModal.bind(this);
    this._closeUserDataModal = this._closeUserDataModal.bind(this);
    this._editReview = this._editReview.bind(this);
    this._showReview = this._showReview.bind(this);
    this._changeTabName = this._changeTabName.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.setState({
        id: localStorage.getItem("user")
      });
    }
  }

  _getBookmarks = function() {
    const userId = this.state.id;

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

  _changeTabName = function(event) {
    let tabName = event.target.textContent;

    this.setState({
      tabName: tabName
    });
  };

  _deleteReview = function(review) {
    const targetIndex1 = this.state.currentReviews.indexOf(review);
    const copiedCurrentReviews = this.state.currentReviews.slice();
    copiedCurrentReviews.splice(targetIndex1, 1);

    const targetIndex2 = this.state.reviews.indexOf(review);
    const copiedReviews = this.state.reviews.slice();
    copiedReviews.splice(targetIndex2, 1);

    this.setState({
      reviews: copiedReviews,
      currentReviews: copiedCurrentReviews
    });
  };

  _deleteBookmark = function(book) {
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

  _getMoreReviews = function() {
    const reviewsLength = this.state.currentReviews.length;
    const newLength = reviewsLength + 10;

    this.setState({
      currentReviews: this.state.reviews.slice(0, newLength)
    });
    // axios
    //   .post(`${BACKEND_ENDPOINT}/reviews/getMyReviews`, {
    //     userId: this.state.id
    //   })
    //   .then(res => {
    //     this.setState({
    //       reviews: res.data.slice(0, newLength)
    //     });
    //   })
    //   .catch(err => console.log(err));
  };

  _getMoreBookmarks = function() {
    const bookmarksLength = this.state.currentBookmarks.length;
    const newLength = bookmarksLength + 10;

    this.setState({
      currentBookmarks: this.state.books.slice(0, newLength)
    });

    // axios
    //   .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, {
    //     userId: this.state.id
    //   })
    //   .then(res => {
    //     this.setState({
    //       books: res.data.slice(0, newLength)
    //     });
    //   })
    //   .catch(err => console.log(err));
  };

  _openUserDataModal = function() {
    this.setState({
      userDataModal: true
    });
  };

  _closeUserDataModal = function() {
    this.setState({
      userDataModal: false
    });
  };

  _editReview = function(editedReview, userId, bookId, reviewId, rating) {
    let newReviews = this.state.reviews;

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
      .then(res => {
        if (res.data) {
          this.setState({
            review: newReviews
          });
          console.log(
            `수정된 리뷰: ${editedReview}, 수정된 평가점수: ${rating}`
          );
        }
      })
      .catch(err => console.log(err));
  };

  _showReview = function(reviewStatus) {
    if (reviewStatus === "none") {
      this.setState({
        openBtnName: "닫기"
      });
    } else if (reviewStatus === "block") {
      this.setState({
        openBtnName: "펼치기"
      });
    }
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
            onclose={this._closeUserDataModal}
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
            <button id={"userSettingsButton"} onClick={this._openUserDataModal}>
              <i className="fas fa-cog" />
            </button>
          </div>
        </div>
        <div id="contents_box">
          {this.state.tabName === "내가 평가한 책" ? (
            <Reviews
              // reviews={this.state.reviews}
              currentReviews={this.state.currentReviews}
              _deleteReview={this._deleteReview}
              _getMoreReviews={this._getMoreReviews}
              editedReview={this.state.editedReview}
              _editReview={this._editReview}
              _showReview={this._showReview}
              openBtnName={this.state.openBtnName}
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
              font-size: 25px;
              color: #ff8906;
              background-color: white;
              border: none;
              outline-style: none;
              cursor: pointer;
              margin-right: 10px;
            }
            #userSettingsButton:hover {
              color: #e07300;
            }
            #mypageTitle {
              height: 10px;
            }
            #mypage_navBox {
              border-bottom: solid 1px #ddd;
              background-color: white;
            }
            #Mypage_nav {
              margin: 0 auto;
              max-width: 1140px;
              display: flex;
              justify-content: space-between;
            }
            #contents_box {
              margin-left: auto;
              margin-right: auto;
              max-width: 1140px;
            }
            #reviews_btn {
              font-size: 16px;
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
              font-size: 16px;
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
            @media screen and (max-width: 600px) {
              
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Mypage;
