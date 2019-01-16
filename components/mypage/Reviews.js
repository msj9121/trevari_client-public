import React from "react";
import ReviewItem from "./ReviewItem";

class Reviews extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    // 스크롤링 했을때, 브라우저의 가장 밑에서 100정도 높이가 남았을때에 실행하기위함.
    if (scrollHeight - innerHeight - scrollTop < 1) {
      
      
      this.props._getMoreReviews()
      console.log("Almost Bottom Of This Browser");
    }
  }

  _moreBtn_clickHandler = () => {
    this.props._getMoreReviews();
  };

  render() {
    return (
      <div id="reviews">
        <div id="reviews_container">
          {this.props.reviews.map((review, id) => (
            <ReviewItem
              review={review}
              key={id}
              _deleteReview={this.props._deleteReview}
              editedReview={this.props.editedReview}
              _editReview={this.props._editReview}
            />
          ))}
        </div>
        <div className="moreViewBtn_container">
          <button className="moreViewBtn" onClick={this._moreBtn_clickHandler}>
            더보기
          </button>
        </div>
        <style jsx>{`
          #reviews_container {
            margin: 10px;
          }
          .moreViewBtn_container {
            display: flex;
            justify-content: center;
            margin: 0px 10px 10px 10px;
          }
          .moreViewBtn {
            font-size: 16px;
            font-weight: 600;
            width: 100%;
            height: 30px;
            color: white;
            border: none;
            background-color: #ff8906;
            cursor: pointer;
            outline-style: none;
          }
          .moreViewBtn:hover {
            background-color: #e07300;
          }
          @media screen and (max-width: 800px) {
            .moreViewBtn {
              font-size: 12px;
              height: 20px;
              padding: 0px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Reviews;
