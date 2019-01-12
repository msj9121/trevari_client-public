import React from "react";
import Reviews from "./Reviews";
import Bookmarks from "./Bookmarks";

class MypageContents extends React.Component {
  render() {
    if (this.props.tabName === "마이 리뷰") {
      return (
        <Reviews
          reviews={this.props.reviews}
          reviewsCount={this.props.reviewsCount}
          _deleteReview={this.props._deleteReview}
          _getMoreReviews={this.props._getMoreReviews}
          editedReview={this.props.editedReview}
          _editReview={this.props._editReview}
          _showReview={this.props._showReview}
          openBtnName={this.props.openBtnName}
        />
      );
    } else if (this.props.tabName === "마이 북마크") {
      return (
        <Bookmarks
          books={this.props.books}
          bookmarksCount={this.props.bookmarksCount}
          _deleteBookmark={this.props._deleteBookmark}
          _getMoreBookmarks={this.props._getMoreBookmarks}
        />
      );
    }
  }
}

export default MypageContents;
