import styled from "styled-components";
import CONSTANTS from '../../constants?';

export const Jumbo = styled.h1`
  font-family: Space Grotesk;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 64px;
  color: ${props => props.CONSTANTS?.colors.darkBlue};
`;

const headingSizes = [
  `
  font-size: 48px;
  line-height: 64px;
  `,
  `
  font-size: 32px;
  line-height: 40px;
  `,
  `
  font-size: 24px;
  line-height: 32px;
  `,
  `
  font-size: 20px;
  line-height: 24px;
  `,
  `
  font-size: 18px;
  line-height: 24px;
  `,
  `
  font-size: 16px;
  line-height: 24px;
  `
];

export const Heading = styled.h2`
  font-family: Merry Weather;
  font-style: normal;
  font-weight: bold;
  ${props => (props.size ? headingSizes[props.size - 1] : headingSizes[0])}
  color: ${props => (props.isReverseColor ? CONSTANTS?.colors.white : CONSTANTS?.colors.black)};
`;

export const SubHeading = styled.h3`
  font-family: Merry Weather;
  font-style: normal;
  font-weight: bold;
  ${props => (props.size ? headingSizes[props.size - 1] : headingSizes[2])}
  color: ${props => (props.isReverseColor ? CONSTANTS?.colors.white : CONSTANTS?.colors.black)};
`;

export const Body = styled.p`
  font-family: Merry Weather;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => (props.isSmall ? "10px" : "16px")};
  line-height: 24px;
  color: ${props => (props.isReverseColor ? CONSTANTS?.colors.white : CONSTANTS?.colors.mediumGrey)};
`;
export const SmallBody = styled.a`
  padding-top: 1%;
  font-family: Merry Weather;
  font-style: normal;
  font-weight: ${props => (props.bold ? "bold" : "normal")};
  font-size: 10px;
  line-height: 16px;
  color: ${CONSTANTS?.colors.mediumGrey};
  :hover {
    cursor: pointer;
  }
`;

export const ButtonText = styled.span`
  text-decoration: none;
  text-shadow: 0 1px 2px #fff;
  font-family: Merry Weather;
  font-style: normal;
  font-weight: normal;
  color: white;
  font-size: 16px;
  line-height: 24px;
  :hover {
    color: white;
  }
  :active {
    color: white;
  }
  :visited {
    color: white;
  }
`;

export const ErrorText = styled(SmallBody)`
  color: ${CONSTANTS?.colors.red};
`;
