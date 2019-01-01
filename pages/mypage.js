import Layout from '../containers/Layout'
import axios from 'axios'
import MypageContents from '../components/mypage/MypageContents'

class Mypage extends React.Component {
  static getInitialProps = async function () {
    const devAPI = 'https://api.tvmaze.com/search/shows?q=batman'
    const realAPI = ''

    const res = await axios.get(`${devAPI}`)
    const data = await res.data

    return { books: data }
  }

  constructor (props) {
    super(props)
    this.state = {
      data: props.books,
      ratedBooksShow: true,
      wantToReadBooksShow: false,
    }
    this.ratedBooks_clickHandler = this.ratedBooks_clickHandler.bind(this)
    this.wantToReadBooks_clickHandler = this.wantToReadBooks_clickHandler.bind(this)
  }

  render () {
    return (
      <Layout>
        <div id='mypage'>
          <div id='mypage_box'>
            <h1>마이페이지</h1>
          </div>
          <div id='Mypage_nav'>
            <div id='ratedBooks_btn'>
              <button onClick={this.ratedBooks_clickHandler}>내가 평가한 책</button>
            </div>
            <div id='wantToReadBooks_btn'>
              <button onClick={this.wantToReadBooks_clickHandler}>내가 읽고싶은 책</button>
            </div>
          </div>

          <div id='contents_box'>
            <h2>contents_box!!</h2>
            <MypageContents 
              books={this.state.data} 
              wantToReadBooksShow={this.state.wantToReadBooksShow}
              ratedBooksShow={this.state.ratedBooksShow}/>    
          </div>

          <style jsx>{`
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
              display: felx;
              border: solid 1px;
              margin: 0 auto;
              width: 60%;
            }
            #contents_box {
              border: solid 1px;
              margin: 0 auto;
              width: 60%;
            }
            #ratedBooks_btn {
              border: solid 1px;
              margin-right: 10px;
            }
            #wantToReadBooks_btn {
              border: solid 1px;
            }
          `}</style>
        </div>
      </Layout>
    )
  }
 
  wantToReadBooks_clickHandler = () => {
    if (this.state.wantToReadBooksShow === false 
        && this.state.ratedBooksShow === true)
      this.setState({
        ratedBooksShow: !this.state.ratedBooksShow,
        wantToReadBooksShow: !this.state.wantToReadBooksShow
    })
  }

  ratedBooks_clickHandler = () => {
    if (this.state.wantToReadBooksShow === true 
        && this.state.ratedBooksShow === false)
      this.setState({
        ratedBooksShow: !this.state.ratedBooksShow,
        wantToReadBooksShow: !this.state.wantToReadBooksShow
    })
  }
}

export default Mypage
