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
  .lnIMEg {
    border-width: 0px 0px 1px 0px;
    border-color: ${CONSTANTS.colors.lightGrey};
    padding: 0;
    padding-bottom: 2%;
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
  height: 100vh;
  
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

.name, .employeeName {
  position: absolute;
  top: 30%;
  left: 25%;
  width: 15%;
}

.nif, .clientName {
  position: absolute;
  top: 43%;
  left: 25%;
  width: 15%;
}

.contact, .clientNif {
  position: absolute;
  top: 58%;
  left: 25%;
  width: 15%;
}

.email, .deliveryDate {
  position: absolute;
  top: 30%;
  left: 45%;
  width: 25%; 
}

.address, .signatureDate {
  position: absolute;
  top: 43%;
  left: 45%;
  width: 25%;
}

.employeeOffice, .clientContact {
  position: absolute;
  top: 58%;
  left: 45%;
  width: 25%;
}

.electronicBill {
  position: absolute;
  top: 58%;
  left: 45%;
  width: 25%;
}

.lightPPI {
  position: absolute;
  top: 58%;
  left: 45%;
  width: 25%;
}

.gasPPI {
  position: absolute;
  top: 58%;
  left: 45%;
  width: 25%;
}

.PEL {
  position: absolute;
  top: 58%;
  left: 45%;
  width: 25%;
}

.CUI {
  position: absolute;
  top: 28%;
  right: 28%;
  width: 22%;
}

.CPE {
  position: absolute;
  top: 38%;
  right: 28%;
  width: 22%;
}

.observations {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%; 
}

> form {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
}

button {
  align-self: flex-end;
  margin-bottom: 10%;
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
.lnIMEg {
  border-width: 0px 0px 1px 0px;
  border-color: ${CONSTANTS.colors.lightGrey};
  padding: 0;
  padding-bottom: 2%;
}

@media only screen and (max-width: 468px) {
  display: none;
}

`;

export const WidthMessageContainer = styled.div`
  display: flex;
  margin 20%;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 468px) {
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
      min-height: 161px;
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
