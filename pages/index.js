import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogined: false
    };
  }
  render() {
    return (
      <div id="index">
        <div id="banner">
          <div className="banner-gradient">
            <div className="banner-gradient_container">
              <div className="banner-gradient_box">
                <div className="banner-gradient_trevari">TREVARI</div>
                <div className="banner-gradient_x">X</div>
                <div className="banner-gradient_codestates">CODESTATES</div>
              </div>
            </div>
          </div>
        </div>
        <div id="index_box">
          <img className="index_web" src="../static/index.png" />
          <img className="index_mobile" src="../static/index(mobile).png" />
        </div>

        <style jsx>{`
          #index {
          }
          #index_box {
            margin: 0 auto;
            max-width: 1140px;
            display: flex;
            justify-content: center;
            border: 1px solid #DDD;
          }
          .index_mobile {
            display: none;
          }
          #banner {
            width: 100%;
            height: 380px;
            background: url(http://image.trevari.co.kr/landing/top.jpg) center
              center / cover no-repeat;
          }
          
          .banner-gradient {
            background: linear-gradient(
              135deg,
              rgba(247, 107, 28, 0.8) 31%,
              rgba(250, 97, 97, 0.8) 100%
            );
            width: 100%;
            height: 100%;
          }
          .banner-gradient_container {
            width: 60%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .banner-gradient_box {
            border: 5px solid white;
            width: 600px;
            padding: 15px;
            text-align: center;
          }
          .banner-gradient_trevari {
            color: white;
            font-size: 60px;
            font-weight: 500;
          }
          .banner-gradient_x {
            color: white;
            font-size: 60px;
            font-weight: 500;
          }
          .banner-gradient_codestates {
            color: white;
            font-size: 60px;
            font-weight: 500;
          }
          @media screen and (max-width: 600px) {
            #index_box {
              width: 100%;
            }
            img {
              width: 100%;
            }
            .banner-gradient_box {
              width: 300px;
            }
            .banner-gradient_trevari {
              font-size: 40px;
            }
            .banner-gradient_x {
              font-size: 40px;
            }
            .banner-gradient_codestates {
              font-size: 40px;
            }
            .index_web {
              display: none;
            }
            .index_mobile {
              display: block;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Index;
