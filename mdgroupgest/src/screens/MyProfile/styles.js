import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

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
  border: none;
  box-shadow: 2px 2px 4px rgba(200,200,200,0.8);
  cursor: pointer;
  width: 10%;
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

export { MainContainer, DivUploadPhoto, UploadButton }