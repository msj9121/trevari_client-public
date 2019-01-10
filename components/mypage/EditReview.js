import React from "react";
import StarRatingComponent from "react-star-rating-component";

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 1,
      ratingValue: 1
    };
  }

  _onStarHover = (nextValue, prevValue, name) => {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _onStarClick = (nextValue, preValue, name) => {
    this.setState({
      rating: nextValue,
      ratingValue: nextValue * 2
    });
  };

  _submitBtnClickHandler = () => {
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

    this.props.editReview(editedReview, userId, bookId, reviewId, rating);
  };

  render() {
    return (
      <div id="myModal" className="modal" display={this.props.modalStatus}>
        <div className="modal-content">
          <span className="close-modal" onClick={this.props.closeModal}>
            &times;
          </span>
          <textarea
            className={this.props.review.book_id}
            placeholder="내용을 수정해 주세요"
          />
          <div id="bookReviewScore">
            <div className="bookReviewScore_text">별점을 선택해주세요.</div>
            <div className="bookReviewScore_scorebox">
              <StarRatingComponent
                name="rating"
                starCount={5}
                starColor={"red"}
                value={this.state.rating}
                onStarClick={this._onStarClick}
                onStarHover={this._onStarHover}
              />
              <div className="bookReviewScore_scorebox_score">
                {this.state.ratingValue}
              </div>
            </div>
            <button
              className="submit-btn"
              onClick={() => {
                this._submitBtnClickHandler();
                this.props.closeModal();
              }}
            >
              수정내용 등록하기
            </button>
          </div>
        </div>
        <style jsx>{`
          #myModal {
            
          }
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
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            border-radius: 12px;
          }
          textarea {
            width: 100%;
            height: 200px;
            font-size: 15px;
          }
          #bookReviewScore {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .bookReviewScore_scorebox {
            font-size: 50px;
            margin-bottom: 20px;
            display: flex;
          }
          .submit-btn {
            background-color: #ff8906;
            color: white;
            font-weight: 500;
            padding: 10px 30px 10px 30px;
            cursor: pointer;
            font-size: 18px;
          }
          .submit-btn:hover {
            box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
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
        `}</style>
      </div>
    );
  }
}

export default EditReview;
