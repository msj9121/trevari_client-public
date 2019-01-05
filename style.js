import styled from "styled-components";

const MainDiv = styled.div`
  text-align: center;
`;

const Div = styled.div`
  font-size: 50px;
`;

const InputDiv = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 300px;
  height: 40px;
  font-size: 15px;
`;

const WarnningDiv = styled.div`
  color: red;
  font-size: 11px;
  height: 20px;
`;

const Button = styled.button`
  &:hover {
    cursor: pointer;

    background-color: #ff7f00;
  }
  font-size: 15px;
  width: 300px;
  height: 50px;
  border: orange solid 1px;
  color: whitesmoke;
  background-color: orange;

  border: orange solid 1px;
  padding: 10px;
  background-color: orange;
`;

const ADiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  height: 20px;
`;

const Alink = styled.a`
  font-size: 13px;
`;

export { MainDiv, Div, InputDiv, Input, WarnningDiv, Button, ADiv, Alink };
