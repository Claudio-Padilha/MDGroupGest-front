import styled from 'styled-components';
import { pulse } from '../../utils/animations';

const MainContainer = styled.div`
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

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  margin-top: 20vh;
  height: 75vh;
  button:hover {
    cursor: pointer
  }
`;

const FirstRowForAdmin = styled.div`
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

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  a {
    height: ${ props => props?.admin ? '70%' : '80%'};
    width: ${ props => props?.ceo || props?.admin ? '45%' : '42%'};
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
    margin-right: ${ props => props?.admin ? '16vw' : '0'};
    height: ${ props => props?.admin ? '70%' : '80%'};
    width: ${ props => props?.ceo || props?.admin ? '45%' : '25%'};
    text-decoration: none;
    div {
      align-self: center;
    }
    &:hover {
      animation: ${pulse} 1s infinite;
    }
  }
`;

const HomePageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: center;
  width: 25%;
  height: 73%;
`;

export {
  MainContainer,
  CardsContainer,
  FirstRow,
  FirstRowForAdmin,
  SecondRow,
  HomePageButton,
  WidthMessageContainer
};
