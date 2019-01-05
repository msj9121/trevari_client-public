import React from 'react';
import RatedBookItem from './RatedBookItem';

class RatedBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     reviews: this.props.reviews
  //   }
  // }

  render () {
    // const temp = [this.state.books, this.state.reviews];
    return (
      <div id="ratedBooks">
        <h2>Rated Books!!</h2>
        <div id='ratedCardContainer'>
          {this.props.reviews.map((review, id) => (
            <RatedBookItem 
              review={review} 
              key={id}
              deleteReview={this.props.deleteReview}
            /> 
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