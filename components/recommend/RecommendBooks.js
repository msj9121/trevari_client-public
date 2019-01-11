import Bookcollection from "../books/Bookcollection";
import Link from "next/link";

const RecommendBooks = props => {
  console.log("RecommendBooks", props.input)
  return (
    <div className="recommend_books">
      <div className="recommend_books_name">
        <div>{props.title}</div>
        <Link
          href={{
            pathname: "/books",
            query: { input: props.input }
          }}
        >
          <div className="recommend_books_allViewBtn">모두 보기 ></div>
        </Link>
      </div>

      <div className="recommend_books_imgs">
        {props.recommendBooks.map((book, index) => (
          <Bookcollection book={book} key={index} ID={props.ID} />
        ))}
      </div>

      <style jsx>{`
        .recommend_books {
        }
        .recommend_books_name {
          display: flex;
          justify-content: space-between;
          margin: 10px;
        }
        .recommend_books_allViewBtn {
          cursor: pointer;
        }
        .recommend_books_imgs {
          display: flex;
          justify-content: space-around;
        }
        @media screen and (max-width: 600px) {
          .recommend_books_imgs {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendBooks;
