const Mypage = (props) => {
  return (
    <div id="mypage">

      <div id="mypage_box">
        <h1>마이페이지</h1>
      </div>

      <style jsx>{`
          #mypage {
            
          }
          #mypage_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #mypage_box {
              width: 100%;
            }
          }
      `}</style>

    </div>
  )
}

export default Mypage