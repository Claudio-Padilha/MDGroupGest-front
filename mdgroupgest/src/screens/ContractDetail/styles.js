import styled from 'styled-components';
import CONSTANTS from '../../constants';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-width: 675px;
  z-index: 100
  
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
  .optionsAboutContract {
    width: 20%;
  }
  .hideContract {
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    width: 70%;
    height: 80vh;
    opacity: 0;
    transition: opacity 1s;
  }
  .contract {
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    width: 70%;
    height: 80vh;
    opacity: 1;
    transition: opacity 1s;
  }
  .content {
    height: 80%;
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .firstColumn {
      justify-content: flex-start;
      width: 40%;

      .firstRowInsideFirstColumn {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10%;
      }

      .secondRowInsideFirstColumn {
        width: 100%;
        justify-content: space-between;
      }

      h5 {
        margin: 0;
        margin-top: 10%;
      }
      p {
        margin-top: 0;
        margin-bottom: 10%;
      }
    }
    .secondColumn {
      justify-content: flex-start;
      width: 35%;

      .firstRowInsideFirstColumn {
        width: 100%;
        justify-content: space-between;
        margin-bottom: 10%;
        .fieldComission {
          color: ${CONSTANTS.colors.green};
          font-weight: bold;
          font-size: 18px;
        }
      }

      .secondRowInsideFirstColumn {
        width: 100%;
        justify-content: space-between;
      }

      h5 {
        margin-bottom: 0;
      }
      p {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
`;

const WidthMessageContainer = styled.div`
  display: flex;
  margin 20%;
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

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 1%;
  right: 8%;
`;

export {
  MainContainer,
  Column,
  Row,
  LogoContainer,
  WidthMessageContainer
};
