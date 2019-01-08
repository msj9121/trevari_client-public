import React from "react";

class EditReview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(`modalStatus : ${this.props.modalStatus}`)
    return (
      <div id="myModal" className="modal" display={this.props.modalStatus}>
        <div className="modal-content">
          <span className="close-modal" onClick={this.props.closeModal}>
            &times;
          </span>
          <textarea className="edit-textarea" placeholder="내용을 수정해 주세요" />
          <button className="submit-btn" onClick={this.props.closeModal}>수정내용 등록하기</button>
        </div>
        <style jsx>{`
          .modal {
            display: ${this.props.modalStatus};
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgb(0, 0, 0);
            background-color: rgba(0, 0, 0, 0.4);
          }
          .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
          }
          .edit-textarea {
            width: 100%;
            height: 200px;
            font-size: 14px;
          }
          .submit-btn {
            width: 60%;
            align: center;
            font-size: 16px;
          }
          .close-modal {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          .close-modal:hover,
          .close-modal:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
};

export default EditReview;
