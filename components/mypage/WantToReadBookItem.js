import React from 'react'
import Link from 'next/link'
import axios from 'axios'

class WantToReadBookItem extends React.Component {

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
          <button onClick={this.deleteBtn_handler}>삭제</button>
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

  deleteBtn_handler = async () => {
    const book = this.props.book
    const deleteBookmark = this.props.deleteBookmark
    
    await axios.post('http://3.16.58.104:5000/bookmarks/deleteBookmark', { userId: book.user_id, bookmarkId: book.id })
      .then(async(res) => {
        // console.log("[*] deleteBookmark res : ", res)
        if (res.data) {
          await axios.post('http://3.16.58.104:5000/bookmarks/getMyBookmarks', {userId:book.user_id})
            .then(response => {
              const newBooks = response.data
              deleteBookmark(newBooks)
            })
            .catch(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
  }
}

export default WantToReadBookItem