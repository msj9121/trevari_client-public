import React from 'react';
import RatedBookItem from './RatedBookItem';

class RatedBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: this.props.books
  //   }
  //   console.log(`RatedBooks state : ${this.state.data}`);
    
  // }
  render () {
    return (
      <div id="ratedBooks">
        <h2>Rated Books!!</h2>
        <div id='ratedCardContainer'>
          {this.props.books.map((book) => (
            <RatedBookItem book={book} />
          ))}
        </div>
        <style jsx>{`
          #ratedBooks {
            border: solid 1px;
          }
          #ratedCardContainer {
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    )
  }
}

export default RatedBooks;