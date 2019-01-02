const Signup = (props) => {
  return (
    <div id="signup">

      <div id="signup_box">
        <h1>회원가입</h1>
      </div>

      <style jsx>{`
          #signup {
            
          }
          #signup_box {
            border: 1px solid #DDD;
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
  );
};

export default Signup;