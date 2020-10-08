import styled from 'styled-components';

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
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
  div {
    margin: 2%;
    width: 80%;
    height: 30vh;
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-left: 10%;
    }
  }
  button:hover {
    cursor: pointer
  }
`;

export { MainContainer, CardsContainer };
