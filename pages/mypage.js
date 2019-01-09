import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";
import UpdateUserData from "../components/mypage/UpdateUserData";
import { BACKEND_ENDPOINT } from "../constant";


class Mypage extends React.Component {
  static async getInitialProps(context) {
    const { userId } = context.query;

    if (userId) {
      const books = await axios
        .post(`${BACKEND_ENDPOINT}/bookmarks/getMyBookmarks`, { userId })
        .then(res => res.data.slice(0, 10))
        .catch(err => console.log(err));

      const reviews = await axios
        .post(`${BACKEND_ENDPOINT}/reviews/getMyReviews`, { userId })
        .then(res => res.data.slice(0, 10))
        .catch(err => console.log(err));

      return {
        books: books,
        reviews: reviews
      };
    } else {
      return;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.ID,
      reviews: this.props.reviews,
      books: this.props.books,
      showReviews: true,
      showBookmarks: false,
      reviewsCount: 10,
      bookmarksCount: 10,
      userDataModal: false
    };
  }

  reviewsBtn_clickHandler = () => {
    if (this.state.showBookmarks === true && this.state.showReviews === false) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  bookmarksBtn_clickHandler = () => {
    if (this.state.showBookmarks === false && this.state.showReviews === true) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  deleteReview = reviews => {
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

  deleteBookmark = books => {
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

  getMoreReviews = async () => {
    this.setState({
      reviewsCount: this.state.reviewsCount + 10
    });
    await axios
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

  getMoreBookmarks = async () => {
    this.setState({
      bookmarksCount: this.state.bookmarksCount + 10
    });

    await axios
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

  openUserDataModal = () => {
    this.setState({
      userDataModal: true
    });
  };
  closeUserDataModal = () => {
    this.setState({
      userDataModal: false
    });
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
              onclose={this.closeUserDataModal}
            />
          ) : (
            undefined
          )}
          <div id="mypage_box">
            <button id={"userSettingsButton"} onClick={this.openUserDataModal}>
              <i className="fas fa-cog" />
            </button>
            <h1>마이페이지</h1>
          </div>
          <div id="Mypage_nav">
            <button id="reviews_btn" onClick={this.reviewsBtn_clickHandler}>
              내가 평가한 책
            </button>
            <button id="bookmarks_btn" onClick={this.bookmarksBtn_clickHandler}>
              내가 읽고싶은 책
            </button>
          </div>
          <div id="contents_box">
            <MypageContents
              books={this.state.books}
              reviews={this.state.reviews}
              showReviews={this.state.showReviews}
              showBookmarks={this.state.showBookmarks}
              deleteReview={this.deleteReview}
              deleteBookmark={this.deleteBookmark}
              getMoreBookmarks={this.getMoreBookmarks}
              getMoreReviews={this.getMoreReviews}
              reviewsCount={this.state.reviewsCount}
              bookmarksCount={this.state.bookmarksCount}
            />
          </div>
          <style jsx>{`
              #userSettingsButton{
                float:right;
                margin-top:30px;
                margin-right:10px;
                font-size:16px;
                color:grey;
                border-radius:10%;
              }
              #test {
                border: solid 2px;
              }
              #test: focus {
                border-bottom: solid 3px;
              }
              #mypage {
              }
              #mypage_box {
                border: 1px solid #ddd;
                margin: 0 auto;
                width: 60%;
              }
              @media screen and (max-width: 600px) {
                #mypage_box {
                  width: 100%;
                }
              }
              #Mypage_nav {

                border: solid 1px #ced4da;
                margin-left: auto;
                margin-right: auto;
                margin-top: 5px;
                margin-bottom: 5px;
                width: 60%;
              }
              #contents_box {
                border: solid 1px #ced4da;
                margin: 0 auto;
                width: 60%;
              }

              #reviews_btn {
                display=block;
                margin-right: 10px;
                padding: 5px 10px 5px 10px;
                border-radius: 0px 3px 3px 0px;
                font-size: 15px;
              }
              #reviews_btn:hover {
                font-weight: bold;
              }
              #reviews_btn:focus {
                border-bottom: 3px solid #ff8906;
                font-weight: bold;
              }

              #bookmarks_btn {
                padding: 5px 10px 5px 10px;
                border-radius: 0px 3px 3px 0px;
                font-size: 15px;
              }
              #bookmarks_btn:hover {
                font-weight: bold;
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
            `}</style>
        </div>
      );
    }
  }
}

export default Mypage;
