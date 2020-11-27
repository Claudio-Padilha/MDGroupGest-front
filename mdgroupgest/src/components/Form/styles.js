import styled from "styled-components";
import { Form } from "formik";
import { Row, Col } from 'react-bootstrap';
import CONSTANTS from '../../constants';

const getSelectedBackground = props => {
  switch (props.bg) {
    case "alt":
      return props.CONSTANTS?.colors.lightBeige;
    case "secondary":
      return props.CONSTANTS?.colors.brand.yellow;
    case "terceary":
      return props.CONSTANTS?.colors.brand.lightBlue;
    default:
      return props.CONSTANTS?.colors.white;
  }
};

export const FormContainer = styled.div`
  padding: 20px;

  background-color: ${props => getSelectedBackground(props)};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  top: ${props => (props.top ? "-80px" : "0")};
  margin: 0 auto;
  max-width: 760px;
  text-align: left;
  width: 60%;

  button {
    align-self: center;
    margin-bottom: 20px;
    margin-top: 20px;
    box-shadow: 0 1px 3px #000;
    outline: none;
    width: 25%;
    padding: 2.5%;
    background-color: #000;
    border: transparent;
  }

  .eAyWro {
    > div {
      margin-top: 5%;
    }
  }
  .YZKXG {
    width: 100%;
  }
`;

export const RightCFormContainer = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
`;

export const LeftCFormContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const CFormContainer = styled.div`

background-color: ${props => getSelectedBackground(props)};
border-radius: 10px;
display: flex;
flex-direction: column;
top: ${props => (props.top ? "-80px" : "0")};
margin: 0 auto;
max-width: 760px;
text-align: left;
width: 100%;

.officeName {
  position: absolute;
  top: 30%;
  left: 35%;
  width: 30%;
}

.officeNIPC {
  position: absolute;
  top: 40%;
  left: 35%;
  width: 30%;
}

.officeAddress {
  position: absolute;
  top: 50%;
  left: 35%;
  width: 30%;
}

.officeZipCode {
  position: absolute;
  top: 60%;
  left: 35%;
  width: 30%;
}

.officeEmail {
  position: absolute;
  top: 70%;
  left: 35%;
  width: 30%;
}

.name {
  position: absolute;
  top: 28%;
  left: 25%;
  width: 15%;
}

.nif {
  position: absolute;
  top: 41%;
  left: 25%;
  width: 15%;
}

.contact {
  position: absolute;
  top: 56%;
  left: 25%;
  width: 15%;
}

.clientNif {
  position: absolute;
  top: 56%;
  left: 25%;
  width: 15%;
}

.email {
  position: absolute;
  top: 28%;
  left: 45%;
  width: 25%; 
}


.address {
  position: absolute;
  top: 41%;
  left: 45%;
  width: 25%;
}

.office, .clientContact {
  position: absolute;
  top: 56%;
  left: 45%;
  width: 25%;
}

.employeeName {
  position: absolute;
  top: 27%;
  left: 20%;
  width: 15%;
  .css-2b097c-container {
    width: 70%;
  }
}

.clientName {
  position: absolute;
  top: 40%;
  left: 20%;
  width: 15%;
  input {
    width: 70%;
  }
}

.clientNif {
  position: absolute;
  top: 53%;
  left: 20%;
  width: 15%;
  input {
    width: 70%;
  }
}

.clientContact {
  position: absolute;
  top: 66%;
  left: 20%;
  width: 15%;
  input { 
    width: 70%;
  }
}

.PEL {
  position: absolute;
  top: 29%;
  left: 34%;
  width: 5%;
  > div > p  {
    margin-bottom: 1%;
    margin-top: 0;
  }
}

.lightPPI {
  position: absolute;
  top: 29%;
  left: 41%;
  width: 5%;
  > div > p  {
    margin-bottom: 1%;
    margin-top: 0;
  }
}

.gasPPI {
  position: absolute;
  top: 29%;
  left: 48%;
  width: 5%;
  > div > p  {
    margin-bottom: 1%;
    margin-top: 0;
  }
}

.electronicBill {
  position: absolute;
  top: 29%;
  left: 55%;
  width: 15%;
  > div > p  {
    margin-bottom: 1%;
    margin-top: 0;
  }
}

.CUI {
  position: absolute;
  top: 40%;
  left: 34%;
  width: 15%;
  > div > input {
    position: absolute;
    top: 100%;
    width: 100%;
  }
}

.CPE {
  position: absolute;
  top: 40%;
  left: 51%;
  width: 15%;
  > div > input {
    position: absolute;
    top: 100%;
    width: 100%;
  }
}

.deliveryDate {
  position: absolute;
  top: 52.5%;
  left: 34%;
  width: 12%;
  .MuiFormControl-marginNormal {
    margin: 0;
    width: 70%;
  }
  p {
    margin-bottom: 10%;
  }
  button {
    position: absolute;
    top: 5%;
    right: 1%;
  }
}

.signatureDate {
  position: absolute;
  top: 66%;
  left: 34%;
  width: 12%;
  .MuiFormControl-marginNormal {
    margin: 0;
    width: 70%;
  }
  p {
    margin-bottom: 8%;
  }
  button {
    position: absolute;
    top: 5%;
    right: 1%;
  }
}

.observations {
  position: absolute;
  top: 52.5%;
  left: 47%;
  width: 19%;
}

.feedbackCall {
  position: absolute;
  top: 29%;
  left: 69%;
  width: 15%;
  p {
    margin-top: 0;
  }
  .css-2b097c-container {
    width: 70%;
  }
  .css-1pk01j8-menu {
    width: 40%;
  }
}

.sellState {
  position: absolute;
  top: 41%;
  left: 69%;
  width: 15%;
    p {
    margin-top: 0;
  }
  .css-2b097c-container {
    width: 70%;
  }
  .css-1pk01j8-menu {
    width: 30%;
  }
}

.paymentMethods {
  position: absolute;
  top: 54%;
  left: 69%;
  width: 15%;
    p {
    margin-top: 0;
  }
  .css-2b097c-container {
    width: 70%;
  }
  .css-1pk01j8-menu {
    width: 50%;
  }
}

.power {
  position: absolute;
  top: 67%;
  left: 69%;
  width: 15%;
    p {
    margin-top: 0;
  }
  .css-2b097c-container {
    width: 70%;
  }
  .css-1pk01j8-menu {
    width: 70%;
  }
}

.gasScale {
  position: absolute;
  top: 79%;
  left: 69%;
  width: 15%;
    p {
    margin-top: 0;
  }
  .css-2b097c-container {
    width: 70%;
  }
  .css-1pk01j8-menu {
    width: 30%;
  }
}

.fa-check-circle {
  width: 15%;
  color: ${CONSTANTS?.colors?.black}
}

> form {
  width: 100%;
  height: 80vh;
  justify-content: center;
  display: flex;
  align-items: center;
}

button {
  position: absolute;
  top: 85%;
  box-shadow: 0 1px 3px #000;
  outline: none;
  width: 17%;
  height: 7%;
  background-color: ${CONSTANTS?.colors?.black};
  border: transparent;
}

.eAyWro {
  > div {
    margin-top: 5%;
  }
}
.YZKXG {
  width: 100%;
}
.lnIMEg {
  border-width: 0px 0px 1px 0px;
  border-color: ${CONSTANTS.colors.lightGrey};
  padding: 0;
  padding-bottom: 2%;
}

@media only screen and (max-width: 768px) {
  display: none;
}

`;

export const WidthMessageContainer = styled.div`
  display: flex;
  margin 20%;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 768px) {
    display: none;
  }
  > h3 {
    text-align: center;
  }
  > h2 {
    text-align: center;
    font-size: 35px;
    line-height: 45px;
    margin-top: 50%;
  }
`;

export const CFormRow = styled(Row)`
  display: flex;
  justify-content: space-around;
`;

export const StyledForm = styled(Form)`
  div {
    & > textarea {
      min-height: 100px;
    }
    & > p {
      text-align: left;
    }
  }
`;

export const SplitSelectContainer = styled.div`
  justify-content: space-between;
  align-items: flex-end;
  display: flex;
  flex-direction: row;
  nav {
    margin-bottom: 15px;
  }
  & > div {
    width: 48%;
  }
`;
