import styled from 'styled-components';
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
      margin-top: 8%;
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
  LogoContainer,
  EmptyContainer
};
