import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 675px;
  max-width: 300vh;
  margin: 10%;
`;

const RightContractContainer = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  background-color: red;
`;

const LeftContractContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
`;
const MainDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  .jxbNCh {
    align-self: center;
    background-color: #FFF;
    display: flex;
    width: 25%;
    height: 40%;
    position: absolute;
    top: auto;
    bottom: 25%;
    left: 25%;
    .efmjdB {
      > div {
        margin-bottom: 5%;
      }
      > button {
        margin-top: 20%;
        position: absolute;
        top: 100%;
        left: 72%;
      }
      justify-content: space-around;
    }
  }
`;

const CornerLeft = styled.span`
  flex: 1;
  position: absolute;
  top: 83%;
  left: 15%;
`;

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 5%;
  left: 10%;
  right: 10%;
`;

const CornerRight = styled.span`
  flex: 1;
  position: absolute;
  bottom: 83%;
  right: 15%;
`;

export { 
  MainContainer,
  RightContractContainer,
  LeftContractContainer,
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
};