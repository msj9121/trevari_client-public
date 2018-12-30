import Layout from '../containers/Layout';
import Link from 'next/link';

const Login = () => {
  return (
    <Layout>
      <div id="login">

        <div id="login_box">
          <h1>로그인</h1>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </div>

        <style jsx>{`
          #login {
            border: 1px solid #DDD;
          }
          #login_box {
            border: 1px solid #DDD;
            margin: 0 auto;
            width: 60%;
          }
          @media screen and (max-width: 600px) {
            #login_box {
              width: 100%;
            }
          }
        `}</style>

      </div>
    </Layout>
  );
};

export default Login;