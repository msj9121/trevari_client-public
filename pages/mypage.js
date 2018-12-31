import Layout from '../containers/Layout';
import axios from 'axios';
import WantToReadBooks from '../components/mypage/WantToReadBooks';


const Mypage = (props) => {
  return (
    <Layout>
      <div id="mypage">

        <div id="mypage_box">
          <h1>마이페이지</h1>
        </div>
        <div id="button_box">
          <button id="ratedBooks_btn">내가 평가한 책</button>
          <button id="wantToReadBooks_btn">내가 읽고싶은 책</button>
        </div>
        <div id="contents_box">
          <h2>contents_box!!</h2>
          <WantToReadBooks data={props.data} />
        </div>

        <style jsx>{`
          #mypage {
            
          }
          #mypage_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #mypage_box {
              width: 100%;
            }
          }
          #button_box {
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
            margin-right: 10px;
          }
        `}</style>

      </div>
    </Layout>
  )
}

Mypage.getInitialProps = async function () {
  const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
  const data = await res.data

  return { books: data }
}

export default Mypage