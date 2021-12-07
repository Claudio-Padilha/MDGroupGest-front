import styled from 'styled-components';
import CONSTANTS from '../../constants';
import { pulse } from '../../utils/animations';

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

  @media only screen and (max-width: 1260px) {
    display: none;
  }

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
  svg {
    position: absolute;
    width: 3%;
    top: 4%;
    left: 2%;
    &:hover {
      cursor: pointer;
    }
  }
  h3 {
    position: absolute;
    top: 16%;
    left: 19.5%;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  margin-top: 10vh;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 65vh;
  button:hover {
    cursor: pointer
  }
`;

const BackContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 83%;
  left: 0%;
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

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  a {
    height: 80%;
    width: 25%;
    text-decoration: none;
    div {
      align-self: center;
    }
    &:hover {
      animation: ${pulse} 1s infinite;
    }
  }
`;

const SecondRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  a {
    height: 80%;
    width: 25%;
    text-decoration: none;
    div {
      align-self: center;
    }
    &:hover {
      animation: ${pulse} 1s infinite;
    }
  }
`;

const GoHomeButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 73%;
`;

const MainContainerEType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 675px;

  @media only screen and (max-width: 1260px) {
    display: none;
  }

  svg {
    position: absolute;
    width: 3%;
    top: 4%;
    left: 2%;
    &:hover {
      cursor: pointer;
    }
  }
  .card {
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const WidthMessageContainer = styled.div`
  display: flex;
  margin 20%;
  height: 50vh;
  flex-direction: column;
  justify-content: center;
  @media only screen and (min-width: 1260px) {
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

export { 
  MainContainer,
  RightContractContainer,
  LeftContractContainer,
  MainDiv,
  FirstRow,
  SecondRow,
  CornerLeft,
  LogoContainer,
  GoHomeButton,
  CornerRight,
  BackContainer,
  CardsContainer,
  MainContainerEType,
  WidthMessageContainer
};