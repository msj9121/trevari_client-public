import Link from "next/link";

const RecommendBanner = props => {
  return (
    <div id="recommend_banner">
      <div id="recommend_banner-gradient">
        <div className="recommend_banner_box">
          <div className="recommend_banner_top">
            <div className="recommend_banner_titlebox">
              <div className="recommend_banner_titlebox_title">
                이번주 베스트셀러
              </div>
              <div className="recommend_banner_titlebox_title">BEST 3</div>
            </div>
            <div className="recommend_banner_booksbox">
              <div className="recommend_banner_books">
                <div className="recommend_banner_books_book1">
                  <div className="recommend_banner_books_book_best">
                    <div>BEST</div>
                    <div>2</div>
                  </div>
                  <Link
                    as={`/book/900`}
                    href={{
                      pathname: "/book",
                      query: { id: "900", ID: props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book1_img1">
                      <img src="https://bookthumb-phinf.pstatic.net/cover/109/617/10961797.jpg" />
                    </div>
                  </Link>
                </div>
                <div className="recommend_banner_books_book2">
                  <div className="recommend_banner_books_book_best">
                    <div>BEST</div>
                    <div>1</div>
                  </div>
                  <Link
                    as={`/book/530`}
                    href={{
                      pathname: "/book",
                      query: { id: "530", ID: props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book2_img2">
                      <img src="https://bookthumb-phinf.pstatic.net/cover/136/037/13603721.jpg" />
                    </div>
                  </Link>
                </div>
                <div className="recommend_banner_books_book3">
                  <div className="recommend_banner_books_book_best">
                    <div>BEST</div>
                    <div>3</div>
                  </div>
                  <Link
                    as={`/book/195`}
                    href={{
                      pathname: "/book",
                      query: { id: "195", ID: props.ID }
                    }}
                  >
                    <div className="recommend_banner_books_book3_img3">
                      <img src="https://bookthumb-phinf.pstatic.net/cover/044/947/04494783.jpg" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="recommend_banner_bottom">
          <div className="recommend_banner_nextbox">
            <div className="recommend_banner_nextbox_next">OOOO</div>
          </div>
        </div> */}
      </div>
      <style jsx>{`
        #recommend_banner {
          width: 100%;
          height: 400px;
          background: url(http://image.trevari.co.kr/landing/top.jpg) center
            center / cover no-repeat;
        }
        #recommend_banner-gradient {
          background-color: rgba(0, 0, 0, 0.7);
          width: 100%;
          height: 100%;
        }
        .recommend_banner_box {
          max-width: 1140px;
          height: 100%;
          margin: 0 auto;
          z-index: 0;
        }
        .recommend_banner_top {
          display: flex;
          justify-content: space-around;
          height: 100%;
        }
        .recommend_banner_bottom {
        }
        .recommend_banner_titlebox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .recommend_banner_titlebox_title {
          font-size: 35px;
          font-weight: 500;
          color: white;
        }
        .recommend_banner_booksbox {
        }
        .recommend_banner_books {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        .recommend_banner_books_book1 {
          width: 150px;
        }
        .recommend_banner_books_book2 {
          margin-left: 40px;
          margin-right: 40px;
          width: 180px;
        }
        .recommend_banner_books_book3 {
          width: 150px;
        }
        .recommend_banner_books_book1_best {
        }
        .recommend_banner_books_book1_img1 {
          width: 100%;
          height: 200px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book2_img2 {
          width: 100%;
          height: 250px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book3_img3 {
          width: 100%;
          height: 200px;
          border: solid 1px;
          box-shadow: 0 7px 15px #999;
          cursor: pointer;
        }
        .recommend_banner_books_book_best {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: white;
          font-size: 18px;
          font-weight: 500;
        }
        .recommend_banner_nextbox {
          border: solid 1px #ddd;
          display: flex;
          justify-content: flex-end;
        }
        img {
          width: 100%;
          height: 100%;
        }
        @media screen and (max-width: 600px) {
          .recommend_banner_box {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default RecommendBanner;
