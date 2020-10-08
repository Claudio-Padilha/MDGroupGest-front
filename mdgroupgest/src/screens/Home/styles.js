import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  height: 40%;
  width: 100%;
  flex-direction: column;
  h3 {
    margin-top: 60%;
    margin-bottom: 0;
    align-self: center;
  }
  p {
    margin: 0;
    align-self: center
  }
`;

const NavbarOptionsContainer = styled.div`
  display: flex;
  height: 60%;
  width: 100%;
  flex-direction: column;
  p {
    align-self: center
  }
`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  justify-content: flex-start;
  width: 80%;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ResultsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const WelcomeWithLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 3%;
  button {
    width: 15%;
    height: 5vh;
    align-items: center;
    align-self: center;
    padding: 0%;
    margin-left: 2%;
    &:hover {
      cursor: inherit;;
    }
    h3 {
      position: absolute;
      top: -1.5%;
      right: 38.125%;
    }
  }
`;

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 1%;
  right: 8%;
`;

export {
  ResultsCard,
  TeamContainer,
  MainContainer,
  LogoContainer,
  ProfileContainer,
  ContentContainer,
  ResultsContainer,
  NavbarOptionsContainer,
  WelcomeWithLogoContainer,
};