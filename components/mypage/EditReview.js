import React from "react";
import StarRatingComponent from "react-star-rating-component";

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      ratingValue: 1
    };

    this._onStarHover = this._onStarHover.bind(this);
    this._onStarClick = this._onStarClick.bind(this);
    this._submitBtn_ClickHandler = this._submitBtn_ClickHandler.bind(this);
  }

  _onStarHover = function(nextValue, prevValue, name) {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _onStarClick = function(nextValue, preValue, name) {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _submitBtn_ClickHandler = function() {
    const review = this.props.review;

    let userId = review.user_id;
    let bookId = review.book_id;
    let reviewId = review.id;
    let rating = this.state.ratingValue;
    let editedReview;
    if (document.getElementsByClassName(bookId)[0].value === "") {
      editedReview = "작성된 평가가 없습니다.";
    } else {
      editedReview = document.getElementsByClassName(bookId)[0].value;
    }

    this.props._editReview(editedReview, userId, bookId, reviewId, rating);
  };

  render() {
    return (
      <div id="myModal" className="modal" display={this.props.modalStatus}>
        <div className="modal_content">
          <span
            className="close-modal"
            onClick={this.props._closeEditModalBtn_clickHandler}
          >
            &times;
          </span>
          <textarea
            className={this.props.review.book_id}
            defaultValue={this.props.review.text}
          />
          <div id="reviewScore">
            <div className="reviewScore_text">별점을 선택해주세요.</div>
            <div className="reviewScore_scorebox">
              <StarRatingComponent
                name="rating"
                starCount={5}
                starColor={"red"}
                value={this.state.rating}
                onStarClick={this._onStarClick}
                onStarHover={this._onStarHover}
              />
              <div className="reviewScore_score">{this.state.ratingValue}</div>
            </div>
            <button
              className="submit-btn"
              onClick={() => {
                this._submitBtn_ClickHandler();
                this.props._closeEditModalBtn_clickHandler();
              }}
            >
              수정내용 등록
            </button>
          </div>
        </div>
        <style jsx>{`
          .modal {
            display: ${this.props.modalStatus};
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
          }
          .modal_content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 60%;
          }
          textarea {
            width: 100%;
            height: 200px;
            font-size: 15px;
          }
          #reviewScore {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .reviewScore_scorebox {
            font-size: 50px;
            margin-bottom: 20px;
            display: flex;
          }
          .submit-btn {
            font-size: 15px;
            width: 50%;
            height: 30px;
            padding: ;
            margin-top: 10px;
            color: whitesmoke;
            border: orange solid 1px;
            background-color: orange;
          }
          .submit-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          .close-modal {
            color: #aaa;
            float: right;
            font-size: 40px;
            font-weight: bold;
          }
          .close-modal:hover,
          .close-modal:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
          @media screen and (max-width: 800px) {
            .modal-content {
              width: 70%;
            }
            .close-modal {
              font-size: 20px;
            }
            textarea {
              font-size: 12px;
            }
            .reviewScore_text {
              font-size: 12px;
            }
            .reviewScore_scorebox {
              font-size: 20px;
              margin-bottom: 10px;
            }
            .submit-btn {
              font-size: 12px;
              width: 50%;
              height: 20px;
              margin-top: ;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default EditReview;
