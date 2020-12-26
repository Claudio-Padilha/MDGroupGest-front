import styled from 'styled-components';
import { pulse } from '../../utils/animations';
import CONSTANTS from '../../constants';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 675px;
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

const MyMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 90vh;
  button:hover {
    cursor: pointer
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

const HomePageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 73%;
`;

const GreenCircle = styled.div`
  display: block;
  border-radius: 3%;
  height: 70px;
  width: 200px;
  margin: 0;
  background: ${CONSTANTS?.colors?.green};
  box-shadow: 0px 1px 6px rgba(0,0,0,0.8);
`;

const YellowCircle = styled.div`
  display: block;
  border-radius: 3%;
  height: 70px;
  width: 200px;
  margin: 0;
  background: ${CONSTANTS?.colors?.brand?.yellow};
  box-shadow: 0px 1px 6px rgba(0,0,0,0.8);
`;

const RedCircle = styled.div`
  display: block;
  border-radius: 3%;
  height: 70px;
  width: 200px;
  margin: 0;
  background: ${CONSTANTS?.colors?.red};
  box-shadow: 0px 1px 6px rgba(0,0,0,0.8);
`;

export {
  MainContainer,
  MyMonthContainer,
  SecondRow,
  HomePageButton,
  GreenCircle,
  YellowCircle,
  RedCircle
};
