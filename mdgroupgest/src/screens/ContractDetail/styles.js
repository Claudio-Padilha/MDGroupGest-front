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
  .contract {
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    width: 70%;
    height: 80vh;
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

export {
  MainContainer,
  Column,
  Row,
  LogoContainer
};
