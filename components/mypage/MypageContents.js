import React from 'react'
import RatedBooks from './RatedBooks'
import WantToReadBooks from './WantToReadBooks';

class MypageContents extends React.Component {
  render() {
    if (this.props.wantToReadBooksShow === false && this.props.ratedBooksShow === true) {
      return <RatedBooks reviews={this.props.reviews} />
    } 
    else if (this.props.wantToReadBooksShow === true && this.props.ratedBooksShow === false) {
      return <WantToReadBooks 
              books={this.props.books} 
              deleteBookmark={this.props.deleteBookmark}
            />
    }
  }
}

export default MypageContents