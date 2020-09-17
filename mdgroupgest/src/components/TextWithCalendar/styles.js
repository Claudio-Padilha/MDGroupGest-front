import styled from "styled-components";
import CONSTANTS from '../../constants?';

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  color: ${CONSTANTS?.colors.mediumGrey};
  .MuiFormControl-marginNormal {
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const SubLabelContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10%;
`;

const StyledInput = styled.input`
  padding: ${CONSTANTS?.margin}px;
  font-family: Merry Weather;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  outline: none;
`;

export { InputContainer, SubLabelContainer, StyledInput };
