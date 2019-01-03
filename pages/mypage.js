import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";



class Mypage extends React.Component {
  static getInitialProps = async function () {
    const devAPI1 = 'https://api.tvmaze.com/search/shows?q=batman'
    const url1 = 'http://localhost:5000/bookmarks/getMyBookmarks'
    const realAPI1 = ''
    const data1= { userId: 1 }
    
    const res1 = await axios.post(url1, data1)
      .catch(err => console.log(err))
    const books = await res1.data;
    
    // console.log("[*] books : ", books);

    const devAPI2 = 'https://api.tvmaze.com/search/shows?q=batman'
    const url2 = 'http://localhost:5000/reviews/getMyReviews'
    const realAPI2 = ''
    const data2= { userId: 1 }
    
    const res2 = await axios.post(url2, data2)
      .catch(err => console.log(err))
    const reviews = await res2.data;
    
    // console.log("[*] reviews : ", reviews);

    return {
      books: books,
      reviews: reviews
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      books: props.books,
      reviews: props.reviews,
      ratedBooksShow: true,
      wantToReadBooksShow: false,
    }
    // console.log(`[*] mypage state reviews : ${JSON.stringify(this.state.reviews)}`)
    
    this.ratedBooks_clickHandler = this.ratedBooks_clickHandler.bind(this)
    this.wantToReadBooks_clickHandler = this.wantToReadBooks_clickHandler.bind(this)
    this.getBooks = this.getBooks.bind(this)
  }

  render () {
 
    return (
      <div id="mypage">
        <div id="mypage_box">
          <h1>마이페이지</h1>
        </div>
        <div id="Mypage_nav">
          <button id="ratedBooks_btn" onClick={this.ratedBooks_clickHandler}>
            내가 평가한 책
          </button>
          <button id='wantToReadBooks_btn' onClick={this.wantToReadBooks_clickHandler}>
            내가 읽고싶은 책
          </button>
        </div>
        <div id="contents_box">
          <MypageContents
            books={this.state.books}
            reviews={this.state.reviews}
            wantToReadBooksShow={this.state.wantToReadBooksShow}
            ratedBooksShow={this.state.ratedBooksShow}
          />
          <div id="addBooks_btn" onClick={this.getBooks} align="center">
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
              margin: 0 auto;
              width: 60%;
            }
            #contents_box {
              border: solid 1px #ced4da;
              margin: 0 auto;
              width: 60%;
            }

            #ratedBooks_btn {
              display=block;
              margin-right: 10px;
              padding: 5px 10px 5px 10px;
              border-radius: 0px 3px 3px 0px;
              font-size: 15px;
            }
            #ratedBooks_btn:hover {
              font-weight: bold;
            }
            #ratedBooks_btn:focus {
              border-bottom: 3px solid #ff8906;
              font-weight: bold;
            }

            #wantToReadBooks_btn {
              padding: 5px 10px 5px 10px;
              border-radius: 0px 3px 3px 0px;
              font-size: 15px;
            }
            #wantToReadBooks_btn:hover {
              font-weight: bold;
            }
            #wantToReadBooks_btn:focus {
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

  wantToReadBooks_clickHandler = () => {
    if (
      this.state.wantToReadBooksShow === false &&
      this.state.ratedBooksShow === true
    ) {
      this.setState({
        ratedBooksShow: !this.state.ratedBooksShow,
        wantToReadBooksShow: !this.state.wantToReadBooksShow
      });
    }
  };

  ratedBooks_clickHandler = () => {
    if (
      this.state.wantToReadBooksShow === true &&
      this.state.ratedBooksShow === false
    ) {
      this.setState({
        ratedBooksShow: !this.state.ratedBooksShow,
        wantToReadBooksShow: !this.state.wantToReadBooksShow
      });
    }
  };

  scrollHandler = event => {
    if (this.state.scrollY > 1000) {
      // arbitrary amount
      this.setState({
        scrollY: window.scrollY
      });
    }
  };

  getBooks = async () => {
    const devAPI = "https://api.tvmaze.com/search/shows?q=batman";
    const realAPI = "";

    const res = await axios.get(`${devAPI}`);
    const data = await res.data;
    console.log(data);

    this.setState(state => {
      return {
        data: state.data.concat(data)
      };
    });
  };
}

export default Mypage;
