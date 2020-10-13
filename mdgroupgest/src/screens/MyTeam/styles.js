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


  .custom-container {
    background-color: #242424;
  }
  
  .custom .node circle {
    fill: #F3F3FF;
    stroke: black;
    stroke-width: 1px;
  }
  
  .custom .node text {
    font-size: 11px;
    background-color: black;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    fill: black;
    text-shadow: 0 1px 4px ${CONSTANTS.colors.lightGrey};
    text-color: black;
  }
  
  .custom .node {
    cursor: pointer;
  }
  
  .custom path.link {
    fill: none;
    stroke: ${CONSTANTS.colors.lightGrey};
    stroke-width: 1.5px;
  }

  
  body {
    background-color: white;
    overflow: hidden;
  }
  
  span {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #F4F4F4;
    text-shadow: 0 1px 4px black;
    float: right;
  }


`;

const MyTeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
  height: 65vh;
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
`

export {
  MainContainer,
  MyTeamContainer,
  SecondRow,
  HomePageButton
};
