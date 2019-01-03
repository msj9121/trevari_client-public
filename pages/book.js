import fetch from 'isomorphic-unfetch';
import axios from 'axios';

const Book = props => {
  return (
    <div id="book">

      <div id="book_box">
        <div className="book_titlebox">
          <div className="book_titlebox_img"><img src={props.show.image}></img></div>
          <div className="book_titlebox_title">
            <div className="book_titlebox_titleName">{props.show.title}</div>
            <div className="book_titlebox_author">저자 : {props.show.author}</div>
            <div className="book_titlebox_author">{props.show.publishedAt}</div>
            <div className="book_titlebox_author">ISBN : {props.show.isbn}</div>
            <div className="book_titlebox_grade">평점 ★★★★☆ 8(210명)</div>
            <span className="book_titlebox_bookmarkBtn">+ 읽고싶어요</span>
            <span className="book_titlebox_gradeBtn">+ 평점주기</span>
          </div>
        </div>

        <p>{props.show.description}</p>
      </div>

      <style jsx>{`
          #book {
            
          }
          #book_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
            
          }
          .book_titlebox {
            border: 1px solid #DDD;
            display: flex;
            margin: 0 auto;
            margin: 80px;
          }
          .book_titlebox_img {
            width: 30%;
          }
          img {
            width: 100%;
          }
          .book_titlebox_title {
            border: 1px solid #DDD;
            margin-left: 40px;
            margin-top: 30px;
            margin-bottom: 30px;
          }
          .book_titlebox_titleName {
            font-size: 20px;
            margin-bottom: 10px;
          }
          .book_titlebox_author {
            margin-bottom: 10px;
          }
          .book_titlebox_grade {
            font-size: 25px;
            margin-bottom: 20px;
          }
          .book_titlebox_bookmarkBtn {
            border: 1px solid #DDD;
            font-size: 20px;
            padding: 5px 15px 5px 15px;
            margin-top: 10px;
            margin-right: 15px;
          }
          .book_titlebox_gradeBtn {
            border: 1px solid #DDD;
            font-size: 20px;
            padding: 5px 25px 5px 25px;
          }
    
          @media screen and (max-width: 600px) {
            #book_box {
              width: 100%;
            }
          }
        `}</style>

    </div>
  )
}

// Book.getInitialProps = async function (context) {
//   const { id } = context.query
//   const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
//   const show = await res.json()

//   console.log(`Fetched show: ${show.name}`)

//   return { show }
// }

Book.getInitialProps = async function (context) {
  console.log("bookprops",context.query)
  const { id } = context.query
  const res = await axios.post(`http://3.16.58.104:5000/books/getBookById`, { id })
  const show = await res.data

  return { show }
}

export default Book