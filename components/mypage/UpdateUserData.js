import React from "react";
const server = "3.16.58.104:5000";
import axios from "axios";
import { BACKEND_ENDPOINT } from "../../constant";

class UpdateUserData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatePhoneSuccess: null,
      updatePasswordSuccess: null,
      passwordUnmatch: false
    };
  }

  onUpdatePhoneSend = (e) => {
    e && e.preventDefault();
    const newNumber = Number(document.getElementById("newNumber").value);
    Number(newNumber)
      ? console.log("value", Number(newNumber))
      : console.log("fail");

    if (newNumber) {
      axios
      .post(`http://${server}/users/updatePhoneNumber`, {
      // .post(`http://${BACKEND_ENDPOINT}/users/updatePhoneNumber`, {
        userId: this.props.userId,
          phoneNumber: newNumber
        })
        .then(response => {
          console.log("response", response);
          if (response.data) {
            this.setState({
              updatePhoneSuccess: true
            });
            setTimeout(() => {
              this.props.onclose;
            }, 2000);
          } else {
            this.setState({
              updatePhoneSuccess: false
            });
          }
        })
        .catch(err => {
          this.setState({
            updatePhoneSuccess: false
          });
        });
    } else {
      this.setState({
        updatePhoneSuccess: false
      });
    }
  }

  checkPasswordMatch = () => {
    var newPassword = document.getElementById("newPassword").value;
    var newPasswordConfirmation = document.getElementById("newPasswordConfirm")
      .value;

    if (
      newPasswordConfirmation.length &&
      newPassword.length &&
      newPassword !== newPasswordConfirmation
    ) {
      this.setState({
        passwordUnmatch: true
      });
    } else {
      this.setState({
        passwordUnmatch: false
      });
    }
  }

  onUpdatePasswordSend = (e) => {
    e && e.preventDefault();

    var newPassword = document.getElementById("newPassword").value;
    var newPasswordConfirmation = document.getElementById("newPasswordConfirm")
      .value;

    if (newPassword === newPasswordConfirmation) {
      console.log("sending");
      axios
        .post(`${BACKEND_ENDPOINT}/users/updatePassword`, {
          userId: this.props.userId,
          password: newPassword
        })
        .then(response => {
          console.log("response", response);
          if (response.data) {
            this.setState({
              updatePasswordSuccess: true
            });
          } else {
            this.setState({
              updatePasswordSuccess: false
            });
          }
        })
        .catch(err => {
          this.setState({
            updatePasswordSuccess: false
          });
        });
    }
  }

  render() {

    return (
      <div className={"modal"} id={"userSettingsModal"}>
        <div className={"userSettingsModalHeader"}>
          <button
            className={"closeButton"}
            onClick={() => {
              this.props._showUserDataModal();
            }}
          >
            X
          </button>
          <h3 id={"userSettingsLabel"}>User Settings </h3>
        </div>
        <hr />
        <div className={"updatePhone"}>
          <h4 className={"userSettingsOpt"}>Update your phone number</h4>
          <form>
            <label>New number</label>
            <input type={"text"} id={"newNumber"} />
            <p
              className={"updateWarning"}
              id={"updatePhoneSuccess"}
              style={{
                display:
                  this.state.updatePhoneSuccess === true ? "block" : "none"
              }}
            >
              Your phone number has been updated succesfully
            </p>
            <p
              className={"updateWarning"}
              id={"updatePhoneFail"}
              style={{
                display:
                  this.state.updatePhoneSuccess === false ? "block" : "none"
              }}
            >
              Your phone number could not be updated. Please introduce a valid
              number.
            </p>
            <button id={"updatePhoneSend"} onClick={this.onUpdatePhoneSend}>
              Update
            </button>
          </form>
        </div>
        <div className={"updatePhone"}>
          <h4 className={"userSettingsOpt"}>Update your password</h4>
          <form>
            <label>New password</label>
            <input type={"password"} name={"Password"} id={"newPassword"} />
            <label>Confirm new password</label>
            <input
              type={"password"}
              name={"Password"}
              id={"newPasswordConfirm"}
              onBlur={this.checkPasswordMatch}
            />
            <p
              className={"updateWarning"}
              id={"passwordUnmatch"}
              style={{
                display: this.state.passwordUnmatch === true ? "block" : "none"
              }}
            >
              Your passwords do not match
            </p>
            <p
              className={"updateWarning"}
              id={"updatePasswordSuccess"}
              style={{
                display:
                  this.state.updatePasswordSuccess === true ? "block" : "none"
              }}
            >
              Your password has been updated succesfully
            </p>
            <p
              className={"updateWarning"}
              id={"updatePasswordFail"}
              style={{
                display:
                  this.state.updatePasswordSuccess === false ? "block" : "none"
              }}
            >
              Your password could not be updated. You password must be different
              from your current one..
            </p>
            <button
              id={"updatePasswordSend"}
              onClick={this.onUpdatePasswordSend}
            >
              Update
            </button>
          </form>
        </div>

        <style jsx>{`
          #userSettingsModal {
            position: fixed;
            z-index: 10;
            width: 300px;
            background-color: #fff;
            padding: 20px;
            box-shadow: 1px 1px 10px grey;
            border-radius: 5%;

            left: 50%;
            transform: translate(-50%);
            margin: 0 auto;

            font-family: helvetica, sans-serif;
            color: #565656;
          }
          .userSettingsOpt {
            text-align: center;
          }
          #userSettingsLabel {
            font-family: helvetica, sans-serif;
            text-align: center;
            margin-bottom: 25px;
          }
          .updatePhone *,
          .updatePassword * {
            display: flex;
            flex-direction: column;
          }
          .updatePhone input,
          .updatePassword input {
            display: flex;
            margin-top: 15px;
            padding: 5px;
            font-size: 16px;
          }
          .closeButton {
            float: right;
            font-size: 20px;
            color: grey;
            border: none;
          }
          #updatePhoneSend,
          #updatePasswordSend {
            background-color: #f97400;
            padding: 10px;
            text-align: center;
            color: white;
            margin: auto;
            margin-top: 10px;
            text-shadow: 1px 0px 3px grey;
            border-radius: 10%;
            font-size: 16px;
          }
          #updatePhoneSend:hover,
          #updatePasswordSend:hover {
            box-shadow: 0px 1px 5px #f9cf9a;
            top: 1px;
          }
          #updatePhoneSend:focus,
          #updatePasswordSend:focus {
            box-shadow: 0px 1px 5px #f9cf9a;
            top: 1px;
          }
          hr {
            border-color: grey;
            border: none;
            border-top: 1px solid #ccc;
          }
          .updateWarning {
            font-weight: bold;
          }
          #updatePhoneSuccess,
          #updatePasswordSuccess {
            color: green;
          }
          #updatePhoneFail,
          #updatePasswordFail,
          #passwordUnmatch {
            color: red;
          }
        `}</style>
      </div>
    );
  }
}
export default UpdateUserData;
