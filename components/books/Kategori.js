const Kategori = () => {
  return (
    <div className="books_kategori">

      <div className="books_kategori_name">
        <div>새로 올라온 작품</div>
        <div>모두 보기 ></div>
      </div>

      <div className="books_kategori_imgs">
        <div className="books_kategori_img">
          <img src="https://bookthumb-phinf.pstatic.net/cover/097/434/09743475.jpg?type=m1&udate=20181126"></img>
        </div>
        <div className="books_kategori_img">
          <img src="https://bookthumb-phinf.pstatic.net/cover/128/365/12836503.jpg?type=m1&udate=20180308"></img>
        </div >
        <div className="books_kategori_img">
          <img src="https://bookthumb-phinf.pstatic.net/cover/136/610/13661032.jpg?type=m1&udate=20180623"></img>
        </div>
        <div className="books_kategori_img">
          <img src="https://bookthumb-phinf.pstatic.net/cover/144/062/14406286.jpg?type=m1&udate=20181224"></img>
        </div>
      </div>

      <style jsx>{`
        .books_kategori {
        }
        .books_kategori_name {
          display: flex;
          justify-content: space-between;
          margin: 10px;
        }
        .books_kategori_imgs {
          display: flex;
          justify-content: space-around;
        }
        .books_kategori_img {
          width: 142px;
          height: 196px;
          margin-top: 20px;
          margin-bottom: 20px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      `}</style>

    </div>
  );
};

export default Kategori;