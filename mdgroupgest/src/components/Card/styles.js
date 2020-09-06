import styled from "styled-components";

export const getSelectedBackground = props => {
  switch (props.bg) {
    case "alt":
      return props.CONSTANTS?.colors.lightBeige;
    case "secondary":
      return props.CONSTANTS?.colors.brand.yellow;
    case "terceary":
      return props.CONSTANTS?.colors.brand.lightBlue;
    case "transparent":
      return "transparent";
    default:
      return props.CONSTANTS?.colors.white;
  }
};

const Card = styled.div`
  border-radius: 16px;
  padding: ${props => props.CONSTANTS?.margin * (props.padding || 1)}px;
  box-shadow: ${props => (props.shadow ? props.CONSTANTS?.boxShadow : 0)};
  background-color: ${props => getSelectedBackground(props)};
  color: ${props => props.CONSTANTS?.colors.darkBlue};
  align-items: ${props => (props.align ? `${props.align}` : "")};
  justify-content: ${props => (props.justify ? `${props.justify}` : "none")};
`;

export default Card;
