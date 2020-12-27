import styled from "styled-components";
import CONSTANTS from '../../constants?';

const InputContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  color: ${CONSTANTS?.colors.mediumGrey};
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
  border-width: 0px 0px 1px 0px;
  border-color: ${CONSTANTS.colors.lightGrey};
  padding: 0;
  padding-bottom: 2%;
`;

export { InputContainer, SubLabelContainer, StyledInput };
