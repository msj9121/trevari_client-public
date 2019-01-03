import React from 'react';
import Link from "next/link";

const SearchBooks = (props) => {
  return (
    <React.Fragment>
      <Link as={`/book/${props.book.id}`} href={`/book?id=${props.book.id}`}>
        <div className="search_imgbox">
          <img className="search_img" src={props.book.image}></img>
          <div className="search_name">{props.book.title}</div>
        </div>
      </Link>
      
      <style jsx>{`
        .search_imgbox {
          width: 15%;
          margin: 30px;
        }
        .search_img {
          width: 100%
        }
        .search_name {
          width: 100%
        }
      `}</style>
    </React.Fragment>
  );
};

export default SearchBooks;