import fetch from 'isomorphic-unfetch';

const Book = props => {
  return (
    <div id="book">

      <div id="book_box">
        <div className="book_titlebox">
          <div className="book_titlebox_img"><img src={props.show.image.medium}></img></div>
          <div className="book_titlebox_title">
            <div className="book_titlebox_titleName">{props.show.name}</div>
            <div className="book_titlebox_author">백정림 / 소설</div>
            <div className="book_titlebox_author">2018.11.23</div>
            <div className="book_titlebox_author">ISBN : 9791196359751</div>
            <div className="book_titlebox_grade">평점 ★★★★☆ 8(210명)</div>
            <span className="book_titlebox_bookmarkBtn">+ 읽고싶어요</span>
            <span className="book_titlebox_gradeBtn">+ 평점주기</span>
          </div>
        </div>

        <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
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
            width: 25%;
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
            font-size: 40px;
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

Book.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.json()

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default Book