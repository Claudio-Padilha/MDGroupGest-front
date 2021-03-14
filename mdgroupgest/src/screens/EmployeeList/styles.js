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
  .backIcon {
    position: absolute; 
    top: 4%;
    left: 2%;
  }
  svg {
    width: 3%;


    &:hover {
      cursor: pointer;
    }
  }
  .card {
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .titleRow {
    margin-top: 2%;
    height: 10%;
    width: 50%;
    display: flex;
    justify-content: flex-start;
    h3 {
      margin-top: 1%;
      margin-bottom: 0;
    }
    .userTypeTag {
      width: 20%;
      height: 60%;
      margin-left: 10%;
      cursor: auto;
    }
  }

  .listContainer {
    width: 80%;
    height: 80vh;
    overflow: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }
     
    &::-webkit-scrollbar-track {
      box-shadow: none;
    }
     
    &::-webkit-scrollbar-thumb {
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }

    .eachEmployee {
      .optionsAboutEmployee {
        margin-right: 10%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50%;
        margin-top: 1%;
        .secondaryButton {
          background-color: ${CONSTANTS.colors.white};
          span {
            color: ${CONSTANTS.colors.black};
          }
        }
      }

      .employeeInfo {
        p {
          margin-top: 0;
          margin-bottom: 0;
        }
        h5 {
          margin-bottom: 0;
        }
        display: flex;
        flex-direction: column;
        height: 80%;
        justify-content: space-around;
        width: 100%;
        margin-left: 2%;
        .employeeComission {
          justify-content: flex-start;
          display: flex;
          color: ${CONSTANTS.colors.green};
          font-weight: bold;
        }
      }
      height: 25%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-start;
    }
  }
`;

const MainContainerEType = styled.div`
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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .truncate {
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 1%;
  right: 8%;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const GoHomeButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 73%;
`;

export {
  MainContainer,
  Column,
  CardsContainer,
  Row,
  FirstRow,
  SecondRow,
  LogoContainer,
  EmptyContainer,
  GoHomeButton,
  MainContainerEType
};
