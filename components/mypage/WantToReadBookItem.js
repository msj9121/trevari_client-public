import React from 'react'
import Link from 'next/link'
import axios from 'axios'

class WantToReadBookItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: [this.props.book]
    }  
    this._deleteBookmark = this._deleteBookmark.bind(this)
  }

  render () {
    const book = this.props.book
    // console.log(`WantToReadBookItem book : ${JSON.stringify(book)}`)

    return (
      <div>
        <Link as={`/book/${book.Book.id}`} href={`/book?id=${book.Book.id}`}>
          <div className='image'>
            <img src={book.Book.image} book_id={book.Book.id} book_isbn={book.Book.isbn} className='image' align='center' />
          </div>
        </Link>
        <div align='center' className="deleteBtn">
          <button onClick={this._deleteBookmark}>삭제</button>
        </div>
        <style jsx>{`
          .image {
            background: ;
            width: ;
            border: solid 1px #ced4da;
            margin: 10px 10px 5px 10px;
          }
          .deleteBtn {
            border: solid 1px #ced4da;
            margin-bottom: 10px;
          }
        `}</style>
      </div>
    )
  }

  // componentDidMount() {
  //   this.setState({
  //     book: Object.assign(this.state.book, this.props.book)
  //   })
  // }

  _deleteBookmark = async () => {
    console.log("[*] WantToReadBookitem this.state.book : ", this.state.book);
    
    // const url = 'http://3.16.58.104:5000/bookmarks/deleteBookmark'
    // const data = { userId: this.state.book.user_id, bookmarkId: this.state.book.id }
    // await axios.post(url, data)
    //   .catch(err => console.log(err))

  }
}

export default WantToReadBookItem