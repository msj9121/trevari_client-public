import axios from "axios";
import BooksBanner from "../components/books/BooksBanner";
import BooksBestsellers from "../components/books/BooksBestsellers";

const Books = props => {
  return (
    <div>
      <BooksBanner />
      <div id="books">

        <div id="books_box">

          <BooksBestsellers bestsellers={props.bestsellers}/>

        </div>

        <style jsx>{`
          #books {
            
          }
          #books_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
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
  const res = await axios.post("http://3.16.58.104:5000/books/searchByTitle", { input: "수학"});
  const data = await res.data.slice(0, 4);

  return {
    bestsellers: data
  };
};

export default Books;