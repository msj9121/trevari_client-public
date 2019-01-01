import Layout from "../containers/Layout";
import Signup from "../components/signup/signupcom";

const signup = () => {
  return (
    <Layout>
      <div id="signup">
        <div id="signup_box">
          <Signup />
        </div>
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
      </div>
    </Layout>
  );
};

export default signup;
