import styled from "styled-components";

const media = {
  mobile: styles => `
    @media only screen and (max-width: 375px) {
      ${styles}
    }
  `,
  tablet: styles => `
    @media only screen and (max-width: 768px) {
      ${styles}
    }
  `,
  smallDesktop: styles => `
    @media only screen and (max-width: 1024px) {
      ${styles}
    }
  `,
  desktop: styles => `
    @media only screen and (min-width: 1024px) {
      ${styles}
    }
  `
};

const Page = styled.div`
  max-width: ${props => props.theme.maxWidth}px;
  ${media.desktop(`
    margin: 0 auto;
  `)}
  ${media.smallDesktop(`
    margin: 0 120px;
  `)}
  ${media.tablet(`
    margin: 0 48px;
  `)}
  ${media.mobile(`
    margin: 0 32px;
  `)}
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: ${props => (props.align ? props.align : "none")};
  justify-content: ${props => (props.justify ? props.justify : "none")};
  min-height: ${props => props.theme.margin * props.size}px;
`;

const Col = styled.div`
  flex: ${props => props.size};
  padding: ${props => props?.padding}px;
  ${props =>
    props.collapse &&
    media[props.collapse](`
  display: none;
  `)}
`;

const GridRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: ${props => (props.align ? props.align : "none")};
  justify-content: ${props => (props.justify ? props.justify : "none")};
  max-width: ${props => props.theme.maxWidth}px;

  ${media.desktop(`
    margin: 0 auto;
  `)}
  ${media.smallDesktop(`
    margin: 0 120px;
  `)}
  ${media.tablet(`
    margin: 0 48px;
  `)}
  ${media.mobile(`
    margin: 0 32px;
  `)}
`;

const GridCol = styled.div`
  text-align: ${props => (props.text ? "center" : "left")};
  width: ${props => `${(100 * props.size) / 12}%`};
  align-self: ${props => (props.self ? "center" : "")}
    ${props =>
      props.collapse &&
      media[props.collapse](`
  display: none;
  `)};
`;

const Hero = styled(GridRow)`
  ${media.tablet(`
    flex-flow: column;
    
    top: 0px;
  `)}
  
    min-height: ${props => props.theme.heroSize}px;
    background-color: ${props =>
      props.bg === "alt"
        ? props.theme.colors.lightBeige
        : props.theme.colors.white};
    ${props =>
      props.top
        ? `
      position: relative;
      top: -80px;
    `
        : ``}
`;

export { media, Page, Row, Col, Hero, GridRow, GridCol };
