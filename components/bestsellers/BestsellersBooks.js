import Link from "next/link";

const BestsellersBooks = (props) => {
  return (
    <React.Fragment>
      <Link as={`/book/${props.book.id}`} href={`/book?id=${props.book.id}`}>
        <div className="bestsellersBooks_imgbox">
          <img className="bestsellersBooks_img" src={props.book.image}></img>
          <div className="bestsellersBooks_name">{props.book.title}</div>
        </div>
      </Link>
      
      <style jsx>{`
        .bestsellersBooks_imgbox {
          width: 15%;
          margin: 30px;
        }
        .bestsellersBooks_img {
          width: 100%
        }
        .bestsellersBooks_name {
          width: 100%
        }
      `}</style>
    </React.Fragment>
  );
};

export default BestsellersBooks;