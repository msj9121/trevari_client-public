import axios from "axios";
import MypageContents from "../components/mypage/MypageContents";
import UpdateUserData from '../components/mypage/UpdateUserData';
import React from "react";


class Mypage extends React.Component {

  static getInitialProps = async function (context) {
    const { userId } = context.query

    if (userId) {
      console.log("[*] mypage props.ID : ", { userId })

      const url1 = 'http://localhost:5000/bookmarks/getMyBookmarks'
      const realAPI1 = 'http://3.16.58.104:5000/bookmarks/getMyBookmarks'
      // app.state.bookmark의 데이터를 가져오도록 수정하야야 한다.

      const res1 = await axios.post(realAPI1, { userId })
        .catch(err => console.log(err))
      const books = await res1.data;
      // console.log("[*] books : ", books);

      const url2 = 'http://localhost:5000/reviews/getMyReviews'
      const realAPI2 = 'http://3.16.58.104:5000/reviews/getMyReviews'

      const res2 = await axios.post(realAPI2, { userId })
        .catch(err => console.log(err))
      const reviews = await res2.data;
      // console.log("[*] reviews : ", reviews);

      return {
        books: books,
        reviews: reviews
      }
    } else if (userId === "") {
      return;
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.ID,
      books: this.props.books,
      reviews: this.props.reviews,
      ratedBooksShow: true,
      wantToReadBooksShow: false,
      userDataModal:false
    };
    console.log("[*] mypage this.state.id : ", this.state.id);

    this.ratedBooks_clickHandler = this.ratedBooks_clickHandler.bind(this)
    this.wantToReadBooks_clickHandler = this.wantToReadBooks_clickHandler.bind(this)
    this.getBooks = this.getBooks.bind(this);
    this.openUserDataModal = this.openUserDataModal.bind(this);
    this.closeUserDataModal = this.closeUserDataModal.bind(this);
  }

  render () {
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
      )
    } else {
      return (
        <div id="mypage">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
                  integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
                  crossOrigin="anonymous"></link>
            {this.state.userDataModal ? <UpdateUserData userId ={this.props.ID} onclose={this.closeUserDataModal}/> : undefined}
          <div id="mypage_box">
              <button id={'userSettingsButton'} onClick={this.openUserDataModal}><i className="fas fa-cog"></i></button>
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
    const userId = { userId: 1 }
    // const userId = { userId: this.props.ID }

    const url2 = 'http://localhost:5000/reviews/getMyReviews'
    const realAPI2 = 'http://3.16.58.104:5000/reviews/getMyReviews'

    const res2 = await axios.post(realAPI2, userId)
      .catch(err => console.log(err))
    const reviews = await res2.data;
    // console.log("[*] reviews : ", reviews);

    this.setState(state => {
      return {
        reviews: Object.assign(state.reviews, reviews)
      };
    });
  };

  openUserDataModal = () => {
    this.setState({
        userDataModal:true
    })
  }
  closeUserDataModal = () => {
    this.setState({
        userDataModal:false
    })
  }
}

export default Mypage;
