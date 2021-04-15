import styled from 'styled-components';
import CONSTANTS from '../../constants';
import { fadeIn, increaseSize, increaseSizeVertical } from "../../utils/animations";

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

  .listContainer {
    width: 80%;
    height: 80vh;
    overflow: scroll;

    .employeeComission {
      justify-content: center;
      display: flex;
      color: ${CONSTANTS.colors.green};
      font-weight: bold;
    }

    .clientInfoContent {
      margin-top: 0%;
    }

    .clientInfoTitle {
      margin: 0;
      color: ${CONSTANTS.colors.black}
    }

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

    .eachContract {
      .optionsAboutContract {
        width: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25%;
        margin-top: 5%;
        .secondaryButton {
          background-color: ${CONSTANTS.colors.white};
          span {
            color: ${CONSTANTS.colors.black};
          }
        }
      }
      .contractComission {
        margin-top: 3%;
      }
      .clientInfo {
        width: 30%;
      }
      .rowOfClientInfo {
        width: 100%;
        .pairOfClientInfo {
          width: 50%;
        }
      }
      height: 40%;
      margin-top: 2%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }

    .eachContractSearched {
      .optionsAboutContract {
        width: 20%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25%;
        margin-top: 5%;
        .secondaryButton {
          background-color: ${CONSTANTS.colors.white};
          span {
            color: ${CONSTANTS.colors.black};
          }
        }
      }
      .contractComission {
        margin-top: 3%;
      }
      .clientInfo {
        width: 30%;
      }
      .rowOfClientInfo {
        width: 100%;
        .pairOfClientInfo {
          width: 50%;
        }
      }
      height: 40%;
      margin-top: 2%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      display: flex;
      border: double;
      box-shadow: 5px 3px 7px rgba(0, 0, 0, 0.8);
      animation: ${fadeIn} 3s;
    }
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

const Col = styled.div`
display: flex;
flex-direction: column;
`;

const HomePageButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  height: 73%;
`;

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 1%;
  right: 8%;
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
  Column,
  Row,
  Col,
  LogoContainer,
  EmptyContainer,
  WidthMessageContainer
};
