import styled from 'styled-components';
import CONSTANTS from '../../constants';

const MainContainer = styled.div`
  > div > label > span > span {
    color: ${ CONSTANTS?.colors.white }
  }
  > div > label {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
  }
  > div > label > span > span > span > span {
    box-shadow: 1px 2px 1px 0px rgba(0,0,0,0.2), 0px 0px 3px 3px rgba(0,0,0,0.14), 0px 1px 3px 2px rgba(0,0,0,0.12);
  }
  .MuiSwitch-switchBase.Mui-checked {
    color: ${ CONSTANTS?.colors.black }
  }
  .toggleContainer {
    width: 45%;
  }
`;

const ToggleContainer = styled.div`
  display: flex; 
  justify-content: space-between;
`;



export { MainContainer, ToggleContainer }; 