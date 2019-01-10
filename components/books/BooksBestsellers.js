import Bookcollection from "../bookcollection/Bookcollection";
import Link from "next/link";

const BooksBestsellers = props => {
  return (
    <div className="books_bestsellers">
      <div className="books_bestsellers_name">
        <div>{props.title}</div>
        <Link href="/bestsellers">
          <div className="books_bestsellers_allViewBtn">모두 보기 ></div>
        </Link>
      </div>

      <div className="books_bestsellers_imgs">
        {props.bestsellers.map((bestseller, index) => (
          <Bookcollection book={bestseller} key={index} ID={props.ID} />
        ))}
      </div>

      <style jsx>{`
        .books_bestsellers {
        }
        .books_bestsellers_name {
          display: flex;
          justify-content: space-between;
          margin: 10px;
        }
        .books_bestsellers_allViewBtn {
          cursor: pointer;
        }
        .books_bestsellers_imgs {
          display: flex;
          justify-content: space-around;
        }
        @media screen and (max-width: 600px) {
          .books_bestsellers_imgs {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default BooksBestsellers;
