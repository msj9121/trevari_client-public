import React from 'react'

class RatedBookItem extends React.Component {
  render () {
    const book = this.props.book

    return (
      <div className='content'>
        <div className='image'>
          <img src={book.show.image.medium} className='oneImage' align='center' />
          <div>내가 준 평점</div>
          <div>평균 평점</div>
        </div>
        <div className='innerContent'>
          <div className='name'>{book.show.name}</div>
          <div className='summary'>{book.show.summary.replace(/<[/]?p>/g, '')}</div>
        </div>
        <style jsx>{`
          .content {
            display: flex;
            background: ;
            width: 100%;
            margin-bottom: 20px;
          }
          .content, .image, .name, .summary {
            border: solid 1px;
          }
          .image {
            background: ;
          }
          .innerContent {
            margin-left: 10px;
            margin-right: 10px;
          }
          .name {
            background: ;
            margin-top: 10px;
          }
          .summary {
            background: ;
            margin-top: 15px;
          }
          @media (max-width: 600px) {
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
              border: solid 1px;
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
            }
          }
        `}</style>
      </div>
    )
  }
}

export default RatedBookItem
