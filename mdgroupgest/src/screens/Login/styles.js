import styled from 'styled-components';
import { CONSTANTS } from '../../constants';

const MainContainer = styled.div`
  display: flex;
  flex-flow: column-nowrap;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 475px;
  max-width: 300vh;
`;

const LoginContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 100vh;
  @media (max-width: 1024px) {
    width: 80%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 375px) {
    width: 100%;
    height: 100%;
  }
`;

export { MainContainer, LoginContainer };