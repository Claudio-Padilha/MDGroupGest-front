import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import CONSTANTS from '../../constants';
import { fadeIn } from "../../utils/animations";

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
  align-items: center;
  justify-content: center;
  h3 {
    margin-top: 5%;
    margin-bottom: 0;
  }
  p {
    margin: 0;
  }
  .makeStyles-large-2 {
    margin-top: 20%;
  }
  .myProfileLink {
    font-weight: bold;
    &:hover {
      cursor: pointer;
    }
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
  a {
    text-decoration: none;
    color: white;
  }

  .logoutIcon {
    align-self: center;
    width: 12%;
    height: 12%;
    fill: ${CONSTANTS.colors.white}
  }

  .logoutIcon:hover {
    cursor: pointer;
  }

`;

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  .jumbotron {
    display: flex;
    flex-direction: row;
  }
  .container {
    margin-bottom: 3%;
    width: 50%;
    margin-left: 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h3 {
      margin-left: 1%;
      display: flex;
      flex-direction: row;
    }
    button {
      width: 40%;
    }

  }
`;

const TeamAvatarsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentContainerLoader = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  justify-content: flex-start;
  width: 80%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  justify-content: flex-start;
  width: 80%;
  animation: ${fadeIn} 1s linear;
`;

const ContentContainerForAdmin = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  justify-content: flex-start;
  width: 80%;
  height: 70%;
  animation: ${fadeIn} 1s linear;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .card {
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
    }
  }

  .officeMonth {
    padding-top: 0;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: -2%;
    width: 100%;
    a, h2 {
      width: 100%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      margin: 0;
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }

  .officeMonthResult {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    a, h2 {
      width: 100%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      margin: 0;
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }

  .officeMonthCardBody {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 19.75vh;
    width: 100%;
    a, h2 {
      width: 80%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      margin: 0;
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }

  .managerMonth {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    a, h2 {
      width: 100%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      margin: 0;
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }

  .managerMonthCardBody {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 19.75vh;
    width: 100%;
    margin-bottom: 0;
    a, h2 {
      width: 80%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      margin: 0;
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }


  .monthCardBody {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 90%;
    width: 100%;
    a, h2 {
      width: 80%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    .mySalary {
      font-size: 58px;
      font-weight: bold;
      color: ${CONSTANTS.colors.green}
    }
  }
  .contractsCardBody {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    a, h2 {
      width: 80%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
  }
  .resultsCardBody {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 10%;
    align-items: center;
    height: 90%;
    a {
      width: 80%;
      text-align: center;
      h3 {
        margin-left: 0;
      }
    }
    h2 {
      font-size: 32px;
      color: ${CONSTANTS.colors.green};
      margin-top: 35%;
    }
  }
`;

const OfficesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100%;

  .cardForOffice {
    width: 30%;
    height: 25vh;
    margin-right: 4%;
  }

  .bodyCardForOffice {
    height: 95%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .officeName {
    margin-left: 0;
    color: ${CONSTANTS?.colors?.darkGrey}
  }

  .officeResult {
    font-size: 62px;
  }
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
    background-color: ${CONSTANTS.colors.lightGrey};
    align-items: center;
    align-self: center;
    padding: 0%;
    margin-left: 2%;
    span {
      font-size: 150%;
      color: ${CONSTANTS.colors.black};
      &:hover {
        color: ${CONSTANTS.colors.black};
      }
    }
    &:hover {
      cursor: inherit;
      background-color: ${CONSTANTS.colors.lightGrey};
    }
    h3 {
      position: absolute;
      top: -1.5%;
      right: 38.125%;
    }
  }
  .addIcon {
    position: absolute;
    width: 2%;
    bottom: 14%;
    left: 66.5%;
    color: ${CONSTANTS.colors.green};
    &:hover {
      cursor: pointer;
    }
  }
`;

const LogoContainer = styled.span`
  flex: 1;
  position: absolute;
  top: 1%;
  right: 8%;
`;

const OptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 50%;
  margin-top: 10%;
`;

const LogoutDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 15%;
  width: 100%;
  height: 100%;
`;

// STYLES FOR AVATAR
export const useStyles = makeStyles((theme) => ({ 
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

export {
  LogoutDiv,
  OptionsDiv,
  ResultsCard,
  TeamContainer,
  MainContainer,
  LogoContainer,
  ProfileContainer,
  ContentContainer,
  ContentContainerLoader,
  ContentContainerForAdmin,
  ResultsContainer,
  OfficesContainer,
  TeamAvatarsContainer,
  NavbarOptionsContainer,
  WelcomeWithLogoContainer,
};