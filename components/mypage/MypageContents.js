import React from 'react'
import Reviews from './Reviews'
import Bookmarks from './Bookmarks';

class MypageContents extends React.Component {
  render() {
    if (this.props.wantToReadBooksShow === false && this.props.ratedBooksShow === true) {
      return <Reviews 
              reviews={this.props.reviews} 
              deleteReview={this.props.deleteReview}
              />
    } 
    else if (this.props.wantToReadBooksShow === true && this.props.ratedBooksShow === false) {
      return <Bookmarks 
              books={this.props.books} 
              deleteBookmark={this.props.deleteBookmark}
              />
    }
  }
}

export default MypageContents