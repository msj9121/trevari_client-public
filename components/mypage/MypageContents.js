import React from "react";
import Reviews from "./Reviews";
import Bookmarks from "./Bookmarks";

class MypageContents extends React.Component {
  render() {
    if (
      this.props.showBookmarks === false && 
      this.props.showReviews === true
    ) {
      return (
        <Reviews
          reviews={this.props.reviews}
          reviewsCount={this.props.reviewsCount}
          deleteReview={this.props.deleteReview}
          getMoreReviews={this.props.getMoreReviews}
          editedReview={this.props.editedReview}
          editReview={this.props.editReview}
        />
      );
    } else if (
      this.props.showBookmarks === true &&
      this.props.showReviews === false
    ) {
      return (
        <Bookmarks
          books={this.props.books}
          bookmarksCount={this.props.bookmarksCount}
          deleteBookmark={this.props.deleteBookmark}
          getMoreBookmarks={this.props.getMoreBookmarks}
        />
      );
    }
  }
}

export default MypageContents;
