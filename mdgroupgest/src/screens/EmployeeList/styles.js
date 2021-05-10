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
  
  @media only screen and (max-width: 1260px) {
    display: none;
  }

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
      width: 25%;
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
        height: 100%;
        margin-top: -5%;

        .deleteOrGenerateContract {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40%;
        }

        .promotionContainer {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60%;
          margin-top: -10%;
        }

        .secondaryButton {
          background-color: ${CONSTANTS.colors.white};
          span {
            color: ${CONSTANTS.colors.black};
          }
        }
        .promotionButton {
          height: 5vh;
          width: 80%;
          background-color: ${CONSTANTS.colors.green};
          span {
            color: ${CONSTANTS.colors.white}
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
  margin-top: 10vh;
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
  MainContainerEType,
  WidthMessageContainer
};
