import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";

const URL = "http://3.16.58.104:5000";
// const URL = "http://localhost:5000";

class Mypage extends React.Component {
  static getInitialProps = async function(context) {
    const { userId } = context.query;

    if (userId) {
      const res1 = await axios
        .post(`${URL}/bookmarks/getMyBookmarks`, { userId })
        .catch(err => console.log(err));
      const books = await res1.data;

      const res2 = await axios
        .post(`${URL}/reviews/getMyReviews`, { userId })
        .catch(err => console.log(err));
      const reviews = await res2.data.slice(0, 10);

      return {
        books: books,
        reviews: reviews
      };
    } else if (userId === "") {
      return;
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.ID,
      books: this.props.books,
      reviews: this.props.reviews,
      showReviews: true,
      showBookmarks: false,
      count: 10
    };
    console.log("[*] mypage this.state.id : ", this.state.id);
  }

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
          <div id="mypage_box">
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
            />
            <div id="addBooks_btn" onClick={this.getMoreReviews} align="center">
              더 보기
            </div>
          </div>
          <style jsx>{`
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

  bookmarksBtn_clickHandler = () => {
    if (this.state.showBookmarks === false && this.state.showReviews === true) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  reviewsBtn_clickHandler = () => {
    if (this.state.showBookmarks === true && this.state.showReviews === false) {
      this.setState({
        showReviews: !this.state.showReviews,
        showBookmarks: !this.state.showBookmarks
      });
    }
  };

  deleteBookmark = books => {
    this.setState({
      books: books
    });
  };

  deleteReview = reviews => {
    this.setState({
      reviews: reviews
    });
  };

  getMoreReviews = async () => {
    this.setState({
      count: this.state.count + 10
    });

    await axios
      .post(`${URL}/reviews/getMyReviews`, { userId: this.state.id })
      .then(res => {
        this.setState({
          reviews: res.data.slice(0, this.state.count)
        });
      })
      .catch(err => console.log(err));
  };
}

export default Mypage;
