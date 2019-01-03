import React from 'react'

class RatedBookItem extends React.Component {
  render () {
    const review = this.props.review
    console.log(`[*] review : ${JSON.stringify(review)}`)
    

    return (
      <div className='content'>
        <div className='image'>
          <img src={review.Book.image} className='oneImage' align='center' />
          <div className="myRate" align='center'>내가 준 평점 : {review.score}</div>
          <div className="averageRate" align='center'>평균 평점 : {review.Book.averageScore}</div>
        </div>
        <div className='innerContent'>
          <div className='name'>{review.Book.title}</div>
          <div className='date'>{review.Book.publishedAt}</div>
          <div className='summary'>{review.text}</div>
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
          .content, .image, .name, .date, .summary {
            border: solid 1px #ced4da;
          }

          .image {
            display: flex;
            flex-direction: column;
            background: #fcfbf9;
          }
          .myRate {
            margin : 15px 0px 10px 0px;
          }
          .averageRate {
            margin : 0px 0px 10px 0px;
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
            font-size: 30px;
            font-weight: bold;
          }
          .date {
            margin-top: 5px;
            font-size: 12px;
            color: grey;
          }
          .summary {
            background: ;
            margin-top: 15px;
            height: 70%;
            overflow: scroll;
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
}

export default RatedBookItem
