import styled from 'styled-components';
import { pulse } from '../../utils/animations';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 675px;

  .backIcon {
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

const OfficeMonthResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 90%;
  height: 80vh;
  button:hover {
    cursor: pointer
  }
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin-left: 5%;
  margin-top: 3%;
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

const ContractsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  margin-left: 15%;
`;

const HomePageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;


const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export {
  MainContainer,
  OfficeMonthResultContainer,
  FirstRow,
  SecondRow,
  ContractsInfo,
  HomePageButton,
  EmptyContainer
};
