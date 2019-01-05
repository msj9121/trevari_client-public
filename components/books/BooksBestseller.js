import Link from "next/link";

const BooksBestseller = (props) => {
  return (
    <React.Fragment>
      <Link as={`/book/${props.bestseller.id}`} href={{ pathname: '/book', query: { id: props.bestseller.id, ID: props.ID } }}>
        <div className="books_bestseller">
          <img className="books_bestseller_img" src={props.bestseller.image}></img>
        </div>
      </Link>

      <style jsx>{`
        .books_bestseller {
          width: 142px;
          height: 196px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        .books_bestseller_img {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </React.Fragment>
  );
};

export default BooksBestseller;