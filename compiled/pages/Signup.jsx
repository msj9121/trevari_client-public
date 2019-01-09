"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const router_1 = __importDefault(require("next/router"));
const constant_1 = require("../constant");
class Signup extends react_1.Component {
    constructor(props) {
        super(props);
        this.handleChange = (e) => {
            const name = e.currentTarget.name;
            const value = e.currentTarget.value;
            this.setState({
                [name]: value
            });
        };
        this.emailCheck = (email) => {
            var regex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if (!regex.test(email)) {
                this.setState({
                    check: "이메일을 확인해 주세요!"
                });
                return false;
            }
            else {
                return true;
            }
        };
        this.passwordCheck = (pw, repw) => {
            if (pw !== repw) {
                this.setState({
                    check: "비밀번호를 확인해 주세요!"
                });
                return false;
            }
            else {
                return true;
            }
        };
        this.signupButtonClick = () => {
            for (let key in this.state) {
                if (this.state[key] === "") {
                    this.setState({
                        check: "빈칸을 모두 채워 주세요!"
                    });
                    return;
                }
            }
            if (!this.emailCheck(this.state.email)) {
                return;
            }
            if (!this.passwordCheck(this.state.password, this.state.repassword)) {
                return;
            }
            this.checkRegisteredEmail();
        };
        this.checkRegisteredEmail = async () => {
            const data = {
                email: this.state.email
            };
            await axios_1.default
                .post(`${constant_1.BACKEND_ENDPOINT}/users/checkEmailAvailability`, data)
                .then(res => res.data
                ? this.requestSignup()
                : this.setState({
                    check: "이미 가입된 이메일 입니다!"
                }))
                .catch(err => console.log(err));
        };
        this.requestSignup = async () => {
            const data = {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber
            };
            await axios_1.default
                .post(`${constant_1.BACKEND_ENDPOINT}/users/signup`, data)
                .then(res => {
                if (res.data) {
                    router_1.default.push("/login");
                }
            })
                .catch(err => console.log(err));
        };
        this.state = {
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
            repassword: "",
        };
    }
    render() {
        return (<div id="signup">
        <div className="signup-text">회원가입</div>
        <div className="signup-input">
          <input className="input-box" type="email" placeholder=" 이메일" name="email" onChange={this.handleChange}/>
        </div>

        <div className="signup-input">
          <input className="input-box" placeholder=" 비밀번호" type="password" name="password" onChange={this.handleChange}/>
        </div>
        <div className="signup-input">
          <input className="input-box" placeholder=" 비밀번호 확인" type="password" name="repassword" onChange={this.handleChange}/>
        </div>

        <div className="signup-input">
          <input className="input-box" placeholder=" 이름" name="name" onChange={this.handleChange}/>
        </div>
        <div className="signup-input">
          <input className="input-box" placeholder=" 전화번호" name="phoneNumber" onChange={this.handleChange}/>
        </div>
        <div className="wanning-div">{this.state.check}</div>
        <button className="signup-btn" onClick={this.signupButtonClick}>
          회원가입
        </button>
        <style jsx={true}>{`
          #signup {
            text-align: center;
          }
          .signup-text {
            font-size: 50px;
          }
          .signup-input {
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .input-box {
            width: 300px;
            height: 40px;
            font-size: 15px;
          }
          .wanning-div {
            color: red;
            font-size: 11px;
            height: 20px;
          }
          .signup-btn {
            font-size: 15px;
            width: 300px;
            height: 50px;
            padding: 10px;
            color: whitesmoke;
            margin-bottom: 20px;
            border: orange solid 1px;
            background-color: orange;
          }
          .signup-btn:hover {
            cursor: pointer;
            background-color: #ff7f00;
          }
          @media screen and (max-width: 600px) {
            #signup {
              width: 100%;
            }
          }
        `}</style>
      </div>);
    }
}
exports.default = Signup;
