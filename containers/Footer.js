const Footer = () => (
  <div id="footer">

    <div id="footer_box">

      <div className="footer-one">
        <div className="footer_slogan">세상을 더 지적으로 사람들을 더 친하게</div>
        <div className="footer_button">자주 묻는 질문 & 공지사항</div>
      </div>

      <div className="footer-two">
        <div className="footer_list">블로그</div>
        <div className="footer_list">채용공고</div>
        <div className="footer_list">이용약관</div>
        <div className="footer_list">개인정보처리방침</div>
      </div>

      <div className="footer-three">
        <div>페이스북</div>
        <div>네이버블로그</div>
      </div>

      <div className="footer-four">
        <p>트레바리 | 대표: 윤수영 | 사업자 등록번호: 195-40-00129 | 주소: 서울특별시 강남구 압구정로28길 22-11, 404호</p>
        <p>전화: 070-7799-9708 | E-mail: contact@trevari.co.kr | 통신판매업신고: <a>제 2018-서울강남-03845 호</a></p>
        <p>Copyright © 2018 Trevari. All rights reserved.</p>
      </div>

    </div>

    <style jsx>{`
      #footer {
        border: 1px solid #DDD;
        background: rgba(0, 0, 0, 0.03);
      }
      #footer_box {
        border: 1px solid #DDD;
        margin: 0 auto;
        width: 60%;
      }
      .footer-one {
        display: flex;
        justify-content: space-between;
        border: 1px solid #DDD;
        margin-bottom: 20px;
        padding: 10px;
      }
      .footer-two {
        border: 1px solid #DDD;
        padding: 10px;
      }
      .footer-three {
        border: 1px solid #DDD;
        margin-bottom: 20px;
        display: flex;
        padding: 10px;
      }
      .footer-four {
        border: 1px solid #DDD;
        font-size: 12px;
        color: #adb5bd;
        padding: 10px;
      }
      .footer_slogan {
        color: #4e4e4e;
        font-weight: bold;
      }
      .footer_button {
        border: 1px solid #ff8906;
        border-radius: 3px;
        background-color: white;
        padding: 7px 13px 8px 13px;
        font-size: 14px;
        color: #ff8906;
      }
      .footer_list {
        margin: 20px 0px;
        color: #6c757d;
        font-size: 14px;
      }
      p {
        margin: 0px;
        margin-bottom: 6px;
      }
      a {
        color: #1778b5;
      }

      @media screen and (max-width: 600px) {
        #footer_box {
          width: 100%;
        }
      }
    `}</style>

  </div>


)

export default Footer