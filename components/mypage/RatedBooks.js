import React from 'react';
import RatedBookItem from './RatedBookItem';

class RatedBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews
    }
    // console.log(`[*] RatedBooks state books : ${JSON.stringify(this.state.books[0])}`);
    console.log(`[*] RatedBooks state reviews : ${JSON.stringify(this.state.reviews[0])}`);
  }

  render () {
    // const temp = [this.state.books, this.state.reviews];
    return (
      <div id="ratedBooks">
        <h2>Rated Books!!</h2>
        <div id='ratedCardContainer'>
          {this.state.reviews.map((review) => (
            <RatedBookItem review={review} /> 
          ))}
        </div>
        <style jsx>{`
          #ratedBooks {
            border: solid 1px #ced4da;
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