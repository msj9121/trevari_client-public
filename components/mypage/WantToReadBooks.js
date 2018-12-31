import React from 'react'

const WantToReadBooks = (props) => (
  <div>
    <ul className='container'>
      {props.books.map(({ show }) => (
        <li key={show.id}>
          <div className='content'>
            <div className='imageContainer'>
              <Link as={`/b/${show.id}`} href={`/book?id=${show.id}`}>
                <a>
                  <img
                    src={show.image.medium}
                    className='image'
                    align='center'
                  />
                </a>
              </Link>
            </div>
            <div className='innerContent'>
              <div className='name'>{show.name}</div>
              <div className='summary'>
                {show.summary.replace(/<[/]?p>/g, '')}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }
        .content {
          display: flex;
          background: yellow;
          width: 100%;
          margin-bottom: 20px;
        }
        .content, .imageContainer, .name, .summary {
          border: solid 1px;
        }
        .imageContainer {
          background: red;
        }
        .image {
          align: center;
        }
        .innerContent {
          margin-left: 10px;
          margin-right: 10px;
        }
        .name {
          background: blue;
          margin-top: 10px;
        }
        .summary {
          background: green;
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
            background: yellow;
            margin-bottom: 20px;
          }
          
          .content, .imageContainer, .name, .summary {
            border: solid 1px;
          }
          .imageContainer {
            background: red;
          }
          .image {
            display: block;
            margin: auto;
        
          }
          .name {
            background: blue;
          }
          .summary {
            background: green;
          }
        }
      `}</style>
  </div>
)

export default WantToReadBooks;
