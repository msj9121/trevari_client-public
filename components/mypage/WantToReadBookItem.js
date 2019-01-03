import React from 'react'

class WantToReadBookItem extends React.Component {
  render () {
    const book = this.props.book
    console.log(`WantToReadBookItem book : ${JSON.stringify(book)}`)

    return (
      <div className='image'>
        <img src={book.Book.image} className='image' align='center' />
        <style jsx>{`
          .image {
            background: ;
            margin: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default WantToReadBookItem
