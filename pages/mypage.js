import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";
import UpdateUserData from "../components/mypage/UpdateUserData";
import { BACKEND_ENDPOINT } from "../constant";

class Mypage extends React.Component {
  static async getInitialProps(context) {
    const { userId } = context.query;

    const reviews = await axios.post(
      `${BACKEND_ENDPOINT}/reviews/getMyReviews`,
      { userId }
    );

    return {
      reviews: reviews.data.slice(0, 10)
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.ID,
      reviews: props.reviews,
      books: [],
      tabName: "마이 리뷰",
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

  _getBookmarks = function() {
    const userId = this.state.id;

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, { userId })
      .then(res => {
        this.setState({
          books: res.data.slice(0, 10)
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

  _deleteReview = function(reviews) {
    const targetIndex = this.state.reviews.indexOf(reviews);
    const copiedReviews = this.state.reviews.slice();
    copiedReviews.splice(targetIndex, 1);

    this.setState({
      reviews: copiedReviews
    });
  };

  _deleteBookmark = function(books) {
    const targetIndex = this.state.books.indexOf(books);
    const copiedBookmarks = this.state.books.slice();
    copiedBookmarks.splice(targetIndex, 1);

    this.setState({
      books: copiedBookmarks
    });
  };

  _getMoreReviews = function() {
    const reviewsLength = this.state.reviews.length;
    const newLength = reviewsLength + 10;

    axios
      .post(`${BACKEND_ENDPOINT}/reviews/getMyReviews`, {
        userId: this.state.id
      })
      .then(res => {
        this.setState({
          reviews: res.data.slice(0, newLength)
        });
      })
      .catch(err => console.log(err));
  };

  _getMoreBookmarks = function() {
    const bookmarksLength = this.state.books.length;
    const newLength = bookmarksLength + 10;

    axios
      .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, {
        userId: this.state.id
      })
      .then(res => {
        this.setState({
          books: res.data.slice(0, newLength)
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
                  onClick={event => this._changeTabName(event)}
                >
                  마이 리뷰
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
              _deleteReview={this._deleteReview}
              _deleteBookmark={this._deleteBookmark}
              _getMoreReviews={this._getMoreReviews}
              _getMoreBookmarks={this._getMoreBookmarks}
              editedReview={this.state.editedReview}
              _editReview={this._editReview}
              _showReview={this._showReview}
              openBtnName={this.state.openBtnName}
              tabName={this.state.tabName}
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
              width: 60%;
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
