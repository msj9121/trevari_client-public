import Link from 'next/link';

const Header = () => (
  <div id="header">

    <div id="header_box">
      <Link href="/">
        <div className="header_logo">TREVARI</div>
      </Link>
      <ul>
        <Link href="/">
          <li><span>책추천</span></li>
        </Link>
        <Link href="/mypage">
          <li><span>마이페이지</span></li>
        </Link>
        <Link href="/login">
          <li><span>로그인</span></li>
        </Link>
      </ul>
    </div>

    <style jsx>{`
      #header {
        border 1px solid #DDD;
      }
      #header_box {
        border: 1px solid #DDD;
        display: flex;
        justify-content: space-between;
        margin: 0 auto;
        width: 60%;
      }
      .header_logo {
        color: rgb(255, 137, 6);
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
        padding: 10px;
      }
      ul {
        margin: 0px;
        padding: 10px;
      }
      li {
        display: inline-block
      }
      span {
        color: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        margin-left: 20px;
      }

      @media screen and (max-width: 600px) {
        #header_box {
          width: 100%;
        }
      }
    `}</style>

  </div>
)

export default Header