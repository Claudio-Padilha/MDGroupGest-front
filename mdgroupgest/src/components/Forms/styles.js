import styled from "styled-components";
import CONSTANTS from '../../constants';

const getSelectedBackground = props => {
  switch (props.bg) {
    case "primary":
      return CONSTANTS?.colors.white;
    case "secondary":
      return CONSTANTS?.colors.lightGrey;
    default:
      return ;
  }
};

export const MainFormContainer = styled.div`
  background-color: ${props => getSelectedBackground(props)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: 100%;
  text-align: center;
  > form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  div {
    padding: 0;
    border-bottom: 1px solid ${CONSTANTS?.colors.lightGrey};
    margin-left: 10%;
    margin-right: 10%;
    > input {
      font-family: Merry Weather;
      font-size: 14px;
      margin-bottom: 2%;
      height: 30%;
      border: 0;
      outline: 0;
      padding: 0px;
    }
  }
  button {
    align-self: center;
    margin-bottom: 10%;
    margin-top: 10%;
  }
  .isIsVp {
    border-bottom: 0px;
  }
`;

export const StyledForm = styled.form`
  div {
    & > p {
      text-align: left;
    }
  }
`;
