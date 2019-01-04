import React from 'react'
import WantToReadBookItem from './WantToReadBookItem';

class WantToReadBooks extends React.Component {
  render () {
    const books = this.props.books
    // console.log(`[*] WantToReadBooks books : ${JSON.stringify(books)}`)
    
    return (
      <div>
        <h2>WantToReadBookItem</h2>
    
        <div className='imageContainer'>
          {books.map((book, id) => (
            <WantToReadBookItem book={book} key={id}/>
          ))}
        </div>
        <style jsx>{`
          .imageContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: ;
            border: solid 1px #ced4da;
          }
        `}</style>
      </div>
    )
  }
}

export default WantToReadBooks;
