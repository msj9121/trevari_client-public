import React from 'react'
import Link from 'next/link'
import axios from 'axios'

class ReviewItem extends React.Component {
  render () {
    const review = this.props.review
    // console.log(`[*] review : ${JSON.stringify(review)}`)
    
    return (
      <div className='content'>
        <Link as={`/book/${review.book_id}`} href={`/book?id=${review.book_id}`}>
          <div className='image'>
            <img src={review.Book.image} className='oneImage' align='center' />
            <div className="myRate" align='center'>내가 준 평점 : {review.score}</div>
            <div className="averageRate" align='center'>평균 평점 : {review.Book.averageScore}</div>
          </div>
        </Link>
        <div className='innerContent'>
          <div className='name'>{review.Book.title}</div>
          <div className='date'>작성시간 :  {review.createdAt}</div>
          <div className='summary'>{review.text}</div>
          <div>
            <button className="deleteBtn" onClick={this.deleteBtn_handler} align="center">삭제</button>
          </div>
          {/* <div className='summary'>{review.Book.summary.replace(/<[/]?p>/g, '')}</div> */}
        </div>
        
        <style jsx>{`
          .content {
            display: flex;
            background: #fff3e8;
            width: 100%;
            margin-bottom: 20px;
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
          }
          .content, .image, .name, .date, .summary, .innerContent, .deleteBtn{
            border: solid 1px #ced4da;
          }

          .image {
            display: flex;
            flex-direction: column;
            background: #fcfbf9;
          }
          .myRate {
            margin : 15px 0px 10px 0px;
            border: solid 1px #ced4da;
          }
          .averageRate {
            margin : 0px 0px 10px 0px;
            border: solid 1px #ced4da;
          }
          .oneImage {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
          }

          .innerContent {
            margin-left: 10px;
            margin-right: 10px;
          }
          .name {
            background: ;
            margin-top: 10px;
            font-size: 25px;
            height: 15%;
            font-weight: bold;
            text-align: center;
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            height: 5%;
            color: grey;
          }
          .summary {
            background: ;
            margin-top: 15px;
            height: 50%;
            overflow: scroll;
          }
          .deleteBtn {
            margin-left: auto;
            margin-right: auto;
            margin-top: 5px;
            text-align: center;
            height: 10%;
          }

          @media (max-width: 800px) {
            .container {
              display: flex;
              flex-direction: column;
            }
            .content {
              display: flex; 
              flex-direction: column;
              background: ;
              margin-bottom: 20px;
            }
            
            .content, .imageContainer, .name, .summary {
              border: solid 1px #ced4da;
            }
            .image {
              background: ;
            }
            .oneImage {
              display: block;
              margin: auto;
          
            }
            .name {
              background: ;
            }
            .summary {
              background: ;
              height: 50%;
              overflow: scroll;
            }
          }
        `}</style>
      </div>
    )
  }

  deleteBtn_handler = async () => {
    const review = this.props.review
    // console.log(`ReviewItem review : ${JSON.stringify(review)}`)
    
    const deleteReview = this.props.deleteReview
    // console.log(`deleteReview : ${deleteReview}`);
    
    await axios.post('http://3.16.5:5000/reviews/deleteReview', { userId: review.user_id, bookId: review.book_id })
      .then((res) => {
        console.log("[*] deleteReview res : ", res)
        if (res.data) {
          // console.log(`[*] re get Reviews user_id : ${review.user_id}`);
          
           axios.post('http://3.16.5:5000/reviews/getMyReviews', { userId: review.user_id })
            .then(response => {
              // console.log(`[*] get new reviews response: ${response}`);
              
              const newReviews = response.data
              deleteReview(newReviews)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
}

export default ReviewItem