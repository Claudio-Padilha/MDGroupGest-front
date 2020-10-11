import { 
  Col,
  Row,
  Nav,
  Card,
  Alert,
  Image,
  Button,
  Navbar,
  Carousel,
  Dropdown,
  Container,
  Jumbotron,
  ListGroup,
  ToggleButton,
  ToggleButtonGroup,

} from 'react-bootstrap';
import styled from 'styled-components';

import CONSTANTS from '../../constants';

const StyledCard = styled(Card)`
  width: 96%;
  height: 40vh;
  background-color: ${CONSTANTS.colors.white};
  color: ${CONSTANTS.colors.black};
  padding: 1% 2% 3% 2%;
  border-width: 1px;
  box-shadow: 0 1px 3px #000;
  font-family: "Nunito", sans-serif;
  margin-bottom: 20px;
  margin-left: ${props => props.isTheMiddleCard ? "2%" : "0"}; 
  margin-right: ${props => props.isTheMiddleCard ? "2%" : "0"}
`;

const StyledCardSubtitle = styled(Card.Subtitle)`
  border-bottom: dotted 1px;
  border-color: ${CONSTANTS.colors.black};
  margin-bottom: 10px;
`;

const StyledMDList = styled(ListGroup)`
  background-color: ${CONSTANTS.colors.grey};
  color: ${CONSTANTS.colors.black};
  border-color: ${CONSTANTS.colors.black};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
`;

const StyledButton = styled(Button)`
  &&& {
    color: ${CONSTANTS.colors.white};
    background-color: ${CONSTANTS.colors.black};
    border-color: ${CONSTANTS.colors.black};
    font-family: "Alegreya Sans SC", sans-serif;
  }

  &&&&&:hover {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }

  &&&&&:active {
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.5);
  }
  &&&&:focus {
    outline: 0;
    box-shadow: none;
  }
`;

const StyledMDHero = styled(Jumbotron)`
  background-color: ${CONSTANTS.colors.white};
  color: ${CONSTANTS.colors.black};
  padding: 1% 2% 3% 2%;
  border-width: 1px;
  box-shadow: 0 1px 3px #000;
  font-family: "Nunito", sans-serif;
  margin-bottom: 20px;
`;

const StyledNavbar = styled(Navbar)`
  background-color: ${CONSTANTS.colors.black};
  width: 20%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Nunito", sans-serif;
  position: fixed;
`; 

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  margin-left: 15%;
  justify-content: flex-start;
  width: 80%;
  h3 {
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 15%;
  }
`;

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  &&& {
    color: ${CONSTANTS.colors.white};
    background-color: ${CONSTANTS.colors.black};
    border-color: ${CONSTANTS.colors.black};
    font-family: "Alegreya Sans SC", sans-serif;
  }
`;


export const MDCol = Col;
export const MDRow = Row;
export const MDNav = Nav;
export const MDCard = StyledCard;
export const MDHero = StyledMDHero;
export const MDImage = Image;
export const MDButton = StyledButton;
export const MDNavbar = StyledNavbar;
export const MDCardBody = styled(Card.Body)``;
export const MDCardTitle = styled(Card.Title)``;
export const MDCardFooter = styled(Card.Footer)``;
export const MDCardSubtitle = StyledCardSubtitle;
export const MDCarousel = Carousel;
export const MDDropdown = Dropdown;
export const MDContainer = StyledContainer;
export const MDList = StyledMDList;
export const MDListItem = styled(ListGroup.Item)``;
export const MDAttribution = Alert;
export const MDToggleButton = ToggleButton;
export const MDToggleButtonGroup = ToggleButtonGroup;
