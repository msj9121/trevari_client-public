import axios from "axios";
import BooksBanner from "../components/books/BooksBanner";
import BooksBestsellers from "../components/books/BooksBestsellers";
import { BACKEND_ENDPOINT } from "../constant";

const Books = props => {
  return (
    <div>
      <BooksBanner />
      <div id="books">

        <div id="books_box">

          <BooksBestsellers bestsellers={props.bestsellers} ID={props.ID}/>
          <BooksBestsellers bestsellers={props.bestsellers} ID={props.ID}/>
          <BooksBestsellers bestsellers={props.bestsellers} ID={props.ID}/>
          
        </div>

        <style jsx>{`
          #books {
            background: rgba(0, 0, 0, 0.03);
          }
          #books_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
            background-color: white;
          }
          @media screen and (max-width: 600px) {
            #books_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    </div>
  );
};

Books.getInitialProps = async function () {
  const res = await axios.post(`${BACKEND_ENDPOINT}/books/searchByTitle`, { input: "대한"});
  const data = await res.data.slice(0, 6);

  return {
    bestsellers: data
  };
};

export default Books;