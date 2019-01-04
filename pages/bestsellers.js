import React, { Component } from 'react';
import axios from 'axios';
import BestsellersBooks from '../components/bestsellers/BestsellersBooks';

class bestsellers extends Component {
  constructor(props) {
    super(props)
  }

  static async getInitialProps() {
    const res = await axios.post("http://3.16.58.104:5000/books/searchByTitle", { input: "수학" });
    const data = await res.data.slice(0, 30);

    return {
      bestsellers: data
    };
  }

  render() {
    return (
      <div id="bestsellers">

        <div id="bestsellers_box">
          {this.props.bestsellers.map((book, index) => {
            return (
              <BestsellersBooks book={book} key={index} />
            )
          })}
        </div>

        <style jsx>{`
            #bestsellers_box {
              border: 1px solid #DDD;
              margin: 0 auto;
              width: 60%;
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
            }
            @media screen and (max-width: 600px) {
              #bestsellers_box {
                width: 100%;
              }
            }
          `}</style>

      </div>
    );
  }
}

export default bestsellers;