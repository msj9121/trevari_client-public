import React from 'react'
import WantToReadBookItem from './WantToReadBookItem';

class WantToReadBooks extends React.Component {
  render () {
  
    return (
      <div>
        <h2>"WantToReadBookItem"</h2>
    
        <div className='imageContainer'>
          {this.props.books.map((book) => (
            <WantToReadBookItem book={book} />
          ))}
        </div>
        <style jsx>{`
          .imageContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: ;
          }
        `}</style>
      </div>
    )
  }
}

export default WantToReadBooks;
