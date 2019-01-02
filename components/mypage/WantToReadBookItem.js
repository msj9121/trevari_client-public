import React from 'react'

class WantToReadBookItem extends React.Component {
  render () {
    const book = this.props.book

    return (
      <div className='image'>
        <img src={book.show.image.medium} className='image' align='center' />
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
