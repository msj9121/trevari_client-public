import React from 'react'
import RatedBooks from './RatedBooks'
import WantToReadBooks from './WantToReadBooks';

class MypageContents extends React.Component {
  render() {
    if (this.props.wantToReadBooksShow === false && this.props.ratedBooksShow === true) {
      return <RatedBooks books={this.props.books} />
    } 
    else if (this.props.wantToReadBooksShow === true && this.props.ratedBooksShow === false) {
      return <WantToReadBooks books={this.props.books} />
    }
  }
}

export default MypageContents