import React from 'react'
import WantToReadBookItem from './WantToReadBookItem';

class WantToReadBooks extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     book: [this.props.book]
  //   }  
  //   this._deleteBookmark = this._deleteBookmark.bind(this)
  // }

  render () {
    const books = this.props.books
    // console.log(`[*] WantToReadBooks books : ${JSON.stringify(books)}`)
    
    return (
      <div>
        <h2>WantToReadBookItem</h2>
    
        <div className='imageContainer'>
          {books.map((book, id) => (
            <WantToReadBookItem book={book} key={id}/>
          ))}
        </div>
        <style jsx>{`
          .imageContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background: ;
            border: solid 1px #ced4da;
          }
        `}</style>
      </div>
    )
  }

  _deleteBookmark = async () => {
    // console.log("[*] WantToReadBookitem this.state.book : ", this.state.book);
    
    const url = 'http://3.16.58.104:5000/bookmarks/deleteBookmark'
    const data = { userId: this.props.book.user_id, bookmarkId: this.props.book.id }
    await axios.post(url, data)
      .then(res => {
        // console.log("[*] res : ", res)
        if (res.data) {
          this.setState({
            book: this.state.book.concat(this.props.book)
          })
          // console.log(this.state.book)
        }})
      .catch(err => console.log(err))
  }
}

export default WantToReadBooks;
