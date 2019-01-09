import React from "react";

class EditReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: false
    }
  }

  ScoreClickHandler = (event) => {
    let newScore = event.target.getAttribute("value")
    this.setState({
      score: newScore
    })
  }

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
          <div className="score-container">
            <span className="score" value="1" onClick={this.ScoreClickHandler}>1</span>
            <span className="score" value="2" onClick={this.ScoreClickHandler}>2</span>
            <span className="score" value="3" onClick={this.ScoreClickHandler}>3</span>
            <span className="score" value="4" onClick={this.ScoreClickHandler}>4</span>
            <span className="score" value="5" onClick={this.ScoreClickHandler}>5</span>
            <span className="score" value="6" onClick={this.ScoreClickHandler}>6</span>
            <span className="score" value="7" onClick={this.ScoreClickHandler}>7</span>
            <span className="score" value="8" onClick={this.ScoreClickHandler}>8</span>
            <span className="score" value="9" onClick={this.ScoreClickHandler}>9</span>
            <span className="score" value="10" onClick={this.ScoreClickHandler}>10</span>
          </div>
          <button 
            className="submit-btn" 
            onClick={() => {
              const review = this.props.review
              
              let userId = review.user_id
              let bookId = review.book_id
              let reviewId = review.id
              let score;
              if (this.state.score !== false) {
                score = this.state.score
                this.setState({
                  score: false
                })
              } else if (this.state.score === false) {
                score = review.score
              }
      
              let editedReview = document.getElementsByClassName(bookId)[0].value
              
              this.props.editReview(editedReview, userId, bookId, reviewId, score);
              this.props.closeModal();
            }}>
            수정내용 등록하기
          </button>
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
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
          }
          textarea {
            width: 100%;
            height: 200px;
            font-size: 14px;
          }
          .score-container {
            display: flex;
          }
          .score {
            font-size: 25px;
          }
          .score:hover {
            font-weight: bold;
          }
          .submit-btn {
            width: 60%;
            align: center;
            font-size: 16px;
          }
          .close-modal {
            color: #aaa;
            float: right;
            font-size: 28px;
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
