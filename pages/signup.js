import Layout from "../containers/Layout";
import Signuppage from "../components/signup/signuppage";

const signup = () => {
  return (
    <Layout>
      <div id="signup">
        <div id="signup_box">
          <Signuppage />
        </div>
      </div>
      {/* style */}
      <style jsx>{`
        #signup {
        }
        #signup_box {
          display: flex;
          justify-content: center;
          allign-items: center;
          border: 1px solid #ddd;
          margin: 0 auto;
          width: 60%;
        }
        @media screen and (max-width: 600px) {
          #signup_box {
            width: 100%;
          }
        }
      `}</style>
    </Layout>
  );
};

export default signup;
