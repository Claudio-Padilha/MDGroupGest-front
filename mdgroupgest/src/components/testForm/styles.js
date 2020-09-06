import styled from "styled-components";
import { Form } from "formik";
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
    margin-top: 30px;
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
