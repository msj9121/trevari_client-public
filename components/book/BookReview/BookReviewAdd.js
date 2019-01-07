const BookReviewAdd = (props) => {
  return (
    <div id="bookReviewAdd">

      <div className="bookReviewAdd_scorebox">
        <div className="bookReviewAdd_scorebox_star">★★★★☆</div>
        <div className="bookReviewAdd_scorebox_score">{props.score}</div>
      </div>
      <div className="bookReviewAdd_textbox">
        <div className="bookReviewAdd_textbox_text">
          {props.text}
        </div>
        <div className="bookReviewAdd_textbox_userEmail">
          {props.email} | {props.createdAt}
        </div>
      </div>

      <style jsx>{`
        #bookReviewAdd {
          display: flex;
          margin-bottom: 30px;
        }
        .bookReviewAdd_scorebox {
          display: flex;
          font-size: 20px;
        }
        .bookReviewAdd_scorebox_star {
          
        }
        .bookReviewAdd_scorebox_score {
          margin-left: 10px;
          margin-right: 10px;
        }
        .bookReviewAdd_textbox {
          
        }
        .bookReviewAdd_textbox_text {

        }
        .bookReviewAdd_textbox_userEmail {
          color: gray;
          font-size: 13px;
        }
        @media screen and (max-width: 600px) {
          #bookReviewAdd {
            flex-direction: column;
          }
        }
      `}</style>

    </div>
  );
};

export default BookReviewAdd;