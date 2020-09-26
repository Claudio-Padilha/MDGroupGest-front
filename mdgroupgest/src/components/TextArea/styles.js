import styled from "styled-components";
import CONSTANTS from '../../constants';

const TextAreaContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  border: 0;
  outline: none;
  color: ${CONSTANTS?.colors.mediumGrey};
`;

const StyledTextArea = styled.textarea`
    ${(props) =>
      props.error
        ? CONSTANTS?.colors.red
        : CONSTANTS?.colors.mediumGrey};
  font-family: Merry Weather;
  font-style: normal;
  font-weight: normal;
  outline: none;
  font-size: 16px;
  line-height: 24px;
  &:focus {
    outline: none;
  }
  height: 120px;
`;

export { TextAreaContainer, StyledTextArea };
