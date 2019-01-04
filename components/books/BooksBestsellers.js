import BooksBestseller from './BooksBestseller';
import Link from 'next/link';

const BooksBestsellers = (props) => {
  return (
    <div className="books_bestsellers">

      <div className="books_bestsellers_name">
        <div>베스트 셀러 TOP 30</div>
        <Link href="/bestsellers"><div className="books_bestsellers_allViewBtn">모두 보기 ></div></Link>
      </div>

      <div className="books_bestsellers_imgs">

        {props.bestsellers.map((bestseller, index) => (
          <BooksBestseller bestseller={bestseller} key={index}/>
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
      `}</style>

    </div>
  );
};

export default BooksBestsellers;