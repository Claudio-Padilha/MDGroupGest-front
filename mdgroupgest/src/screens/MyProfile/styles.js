import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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

const DivUploadPhoto = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 70%;
  height: 25vh;
  align-items: center;
`;

const UploadButton = styled.button`
  height: 4vh;
  background-color: black;
  color: white;
  font-size: 16px;
  border: none;
  box-shadow: 2px 2px 4px rgba(200,200,200,0.8);
  cursor: pointer;
  width: 10%;
`;

const RecoverPasswordButton = styled.button`
  height: 4vh;
  background-color: black;
  color: white;
  font-size: 18px;
  border: none;
  box-shadow: 2px 2px 4px rgba(200,200,200,0.8);
  cursor: pointer;
  width: 15%;
`;


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
  MainContainer,
  DivUploadPhoto,
  UploadButton,
  RecoverPasswordButton,
  WidthMessageContainer
}