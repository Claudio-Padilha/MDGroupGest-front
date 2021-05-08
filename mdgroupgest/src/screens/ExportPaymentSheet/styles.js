import styled from 'styled-components';
import CONSTANTS from '../../constants';
import { pulse } from '../../utils/animations';

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

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20vh;
  width: 80%;
  height: 65vh;
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
  a {
    height: 80%;
    width: ${props => props.ceo ? '22%' : props?.administrator ? '31%' : '25%'};
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
    width: ${props => props.ceo ? '22%' : props?.administrator ? '22%' : '25%'};
    text-decoration: none;
    margin-left: ${props => props.ceo ? '1%' : props?.administrator ? '0%' : '0%'};
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

const ExportButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 30%;
  height: 80%;
`;


export {
  FirstRow,
  SecondRow,
  GoHomeButton,
  ExportButton,
  CalendarContainer,
  MainContainerEType,
  WidthMessageContainer
};
