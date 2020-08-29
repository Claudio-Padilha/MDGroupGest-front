import styled from "styled-components";
import { CONSTANTS } from '../../constants';

const getStyleFromBtnType = (type = "primary") => {
  switch (type) {
    case "primary":
      return `   
        background-color: ${CONSTANTS.colors.black};
        border: transparent;
        &:hover {
          background-color: ${CONSTANTS.colors.black};
        }
      `;
    case "secondary":
      return `
        background-color: transparent;
        border: 1px solid ${CONSTANTS.colors.mediumGrey};
        &:hover {
          border: transparent;
          background-color: ${CONSTANTS.colors.mediumGrey};
        }
      `;
    default:
      break;
  }
};

const Button = styled.button`
  box-shadow: 0 1px 3px #000;
  outline: none;
  width: 60%;
  padding: 1%;
  ${props => getStyleFromBtnType(props.btnType)}
  > * {
    margin: 0 auto;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
