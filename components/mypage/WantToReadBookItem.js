import React from 'react'
import Link from 'next/link'

class WantToReadBookItem extends React.Component {
  render () {
    const book = this.props.book
    console.log(`WantToReadBookItem book : ${JSON.stringify(book)}`)

    // return (
    //   <Link as={`/book/${book.Book.id}`} href={`/book?id=${book.Book.id}`}>
    //     <div className='image'>
    //       <img src={book.Book.image} book_id={book.Book.id} book_isbn={book.Book.isbn} className='image' align='center' />
    //       <style jsx>{`
    //         .image {
    //           background: ;
    //           margin: 10px;
    //         }
    //       `}</style>
    //     </div>
    //   </Link>
    // )
  }
}

export default WantToReadBookItem