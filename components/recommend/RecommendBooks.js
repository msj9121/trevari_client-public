import Bookcollection from "../books/Bookcollection";
import Link from "next/link";

const RecommendBooks = props => {
  return (
    <div className="recommend_books">
      <div className="recommend_books_name">
        <div>{props.title}</div>
        <Link
          href={{
            pathname: "/books",
            query: { recommend: props.recommend, userId: props.ID }
          }}
        >
          <div className="recommend_books_allViewBtn">모두 보기 ></div>
        </Link>
      </div>
      <div className="recommend_books_imgbox">
        <div className="recommend_books_imgs">
          {props.recommendBooks.map((book, index) => (
            <Bookcollection book={book} key={index} ID={props.ID} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .recommend_books {
          margin-bottom: 20px;
        }
        .recommend_books_name {
          display: flex;
          justify-content: space-between;
          margin: 0px 10px 0px 10px;
        }
        .recommend_books_allViewBtn {
          cursor: pointer;
        }
        .recommend_books_imgbox {
          display: flex;
          justify-content: center;
        }
        .recommend_books_imgs {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          margin: 0px 20px 0px 20px;
        }
        @media screen and (max-width: 600px) {
          .recommend_books_imgs {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendBooks;
