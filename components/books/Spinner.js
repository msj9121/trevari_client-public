const Spinner = () => {
  return (
    <div className="spinner">
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
      <style jsx>{`
        .spinner {
          margin: 50px auto 0;
          margin-bottom: 50px;
          width: 100%;
          text-align: center;
        }

        .spinner > div {
          width: 18px;
          height: 18px;
          background-color: #ff8906;

          border-radius: 100%;
          display: inline-block;
          -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
          animation: sk-bouncedelay 1.4s infinite ease-in-out both;
        }

        .spinner .bounce1 {
          -webkit-animation-delay: -0.32s;
          animation-delay: -0.32s;
        }

        .spinner .bounce2 {
          -webkit-animation-delay: -0.16s;
          animation-delay: -0.16s;
        }

        @-webkit-keyframes sk-bouncedelay {
          0%,
          80%,
          100% {
            -webkit-transform: scale(0);
          }
          40% {
            -webkit-transform: scale(1);
          }
        }

        @keyframes sk-bouncedelay {
          0%,
          80%,
          100% {
            -webkit-transform: scale(0);
            transform: scale(0);
          }
          40% {
            -webkit-transform: scale(1);
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
