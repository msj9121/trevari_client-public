import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";
import UpdateUserData from "../components/mypage/UpdateUserData";
import { BACKEND_ENDPOINT } from "../constant";

class Mypage extends React.Component {
  static async getInitialProps(context) {
    const { userId } = context.query;

    const reviews = await axios
      .post(`${BACKEND_ENDPOINT}/reviews/getMyReviews`, { userId })
      .then(res => res.data.slice(0, 10))
      .catch(err => console.log(err));

    return {
      reviews: reviews
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.ID,
      reviews: props.reviews,
      books: [],
      showReviews: true,
      showBookmarks: false,
      reviewsCount: 10,
      bookmarksCount: 10,
      userDataModal: false,
      editedReview: "",
      openBtnName: "펼치기"
    };

    this._getBookmarks = this._getBookmarks.bind(this);
    this._reviewsBtn_clickHandler = this._reviewsBtn_clickHandler.bind(this);
    this._bookmarksBtn_clickHandler = this._bookmarksBtn_clickHandler.bind(this);
    this._deleteReview = this._deleteReview.bind(this);
    this._deleteBookmark = this._deleteBookmark.bind(this);
    this._getMoreReviews = this._getMoreReviews.bind(this);
    this._getMoreBookmarks = this._getMoreBookmarks.bind(this);
    this._openUserDataModal = this._openUserDataModal.bind(this);
    this._closeUserDataModal = this._closeUserDataModal.bind(this);
    this._editReview = this._editReview.bind(this);
    this._showReview = this._showReview.bind(this);
  }

  _getBookmarks = function() {
    const userId = this.state.id;

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, { userId })
      .then(res => {
        this.setState({
          books: this.state.books.concat(res.data.slice(0, 10))
        });
      })
      .catch(err => console.log(err));
  };

  _reviewsBtn_clickHandler = function() {
    if (this.state.showBookmarks === true && this.state.showReviews === false) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  _bookmarksBtn_clickHandler = function() {
    if (this.state.showBookmarks === false && this.state.showReviews === true) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  _deleteReview = function(reviews) {
    const reviewIndex = this.state.reviews.indexOf(reviews);
    const newFrontReviews = this.state.reviews.slice(0, reviewIndex);
    const newBehindReviews = this.state.reviews.slice(reviewIndex + 1);
    const reviewsCount = this.state.reviewsCount;
    const newCount = reviewsCount - 1;

    this.setState({
      reviews: newFrontReviews.concat(newBehindReviews),
      reviewsCount: newCount
    });
  };

  _deleteBookmark = function(books) {
    const bookmarkIndex = this.state.books.indexOf(books);
    const newFrontBookmarks = this.state.books.slice(0, bookmarkIndex);
    const newBehindBookmarks = this.state.books.slice(bookmarkIndex + 1);
    const bookmarksCount = this.state.bookmarksCount;
    const newCount = bookmarksCount - 1;

    this.setState({
      books: newFrontBookmarks.concat(newBehindBookmarks),
      bookmarksCount: newCount
    });
  };

  _getMoreReviews = function() {
    this.setState({
      reviewsCount: this.state.reviewsCount + 10
    });

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/getMyReviews`, {
        userId: this.state.id
      })
      .then(res => {
        this.setState({
          reviews: res.data.slice(0, this.state.reviewsCount)
        });
      })
      .catch(err => console.log(err));
  };

  _getMoreBookmarks = function() {
    this.setState({
      bookmarksCount: this.state.bookmarksCount + 10
    });

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, {
        userId: this.state.id
      })
      .then(res => {
        this.setState({
          books: res.data.slice(0, this.state.bookmarksCount)
        });
      })
      .catch(err => console.log(err));
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
    if (!this.state.id) {
      return (
        <div id="notLogin" align="center">
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
              onclose={this._closeUserDataModal}
            />
          ) : (
            undefined
          )}
          <div id="mypage_navBox">
            <div id="Mypage_nav">
              <span>
                <button
                  id="reviews_btn"
                  onClick={this._reviewsBtn_clickHandler}
                >
                  마이 리뷰
                </button>
              </span>
              <span>
                <button
                  id="bookmarks_btn"
                  onClick={() => {
                    this._bookmarksBtn_clickHandler();
                    this._getBookmarks();
                  }}
                >
                  마이 북마크
                </button>
              </span>
              <button
                id={"userSettingsButton"}
                onClick={this._openUserDataModal}
              >
                <i className="fas fa-cog" />
              </button>
            </div>
          </div>
          <div id="contents_box">
            <MypageContents
              books={this.state.books}
              reviews={this.state.reviews}
              showReviews={this.state.showReviews}
              showBookmarks={this.state.showBookmarks}
              _deleteReview={this._deleteReview}
              _deleteBookmark={this._deleteBookmark}
              _getMoreReviews={this._getMoreReviews}
              _getMoreBookmarks={this._getMoreBookmarks}
              reviewsCount={this.state.reviewsCount}
              bookmarksCount={this.state.bookmarksCount}
              editedReview={this.state.editedReview}
              _editReview={this._editReview}
              _showReview={this._showReview}
              openBtnName={this.state.openBtnName}
            />
          </div>
          <style jsx>{`
            #userSettingsButton {
              float: right;
              font-size: 16px;
              color: grey;
              border-radius: 10%;
            }
            #mypageTitle {
              height: 10px;
            }
            #mypage_box {
              margin-left: auto;
              margin-right: auto;
              width: 60%;
            }
            #mypage_navBox {
              padding-bottom: 10px;
              border-bottom: solid 1px #ddd;
              padding-top: 10px;
            }
            #Mypage_nav {
              margin-left: auto;
              margin-right: auto;
              width: 60%;
            }
            #contents_box {
              margin-left: auto;
              margin-right: auto;
              width: 80%;
            }

            #reviews_btn {
              font-size: 15px;
              width: 120px;
              height: 30px;
              padding: 5px;
              margin-right: 10px;
              color: whitesmoke;
              border: orange solid 1px;
              background-color: orange;
            }
            #reviews_btn:hover {
              cursor: pointer;
              background-color: #ff7f00;
            }
            #reviews_btn:focus {
              border-bottom: 3px solid #ff8906;
              font-weight: bold;
            }

            #bookmarks_btn {
              font-size: 15px;
              width: 120px;
              height: 30px;
              padding: 5px;
              margin-right: 10px;
              color: whitesmoke;
              border: orange solid 1px;
              background-color: orange;
            }
            #bookmarks_btn:hover {
              cursor: pointer;
              background-color: #ff7f00;
            }
            #bookmarks_btn:focus {
              border-bottom: 3px solid #ff8906;
              font-weight: bold;
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
              #mypage_box {
                width: 60%;
              }
              #contents_box {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              #Mypage_nav {
                width: 90%;
              }
              #reviews_btn {
                font-size: 12px;
                height: 20px;
                padding: 0px;
                width: 70px;
                margin-right: 5px;
              }
              #bookmarks_btn {
                font-size: 12px;
                height: 20px;
                padding: 0px;
                width: 70px;
                margin-right: 5px;
              }
            }
          `}</style>
        </div>
      );
    }
  }
}

export default Mypage;
