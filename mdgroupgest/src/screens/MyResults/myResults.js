import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

import {  Heading, SubHeading, SmallSubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  MyMonthContainer,
  GreenCircle,
  YellowCircle,
  RedCircle,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';
import CONSTANTS from "../../constants";


const MyResults = (props) => {
  console.log(props, 'PROPS DE RESULTS')

  const percentageState = props?.location?.state?.percentages;
  const okPercentage = `${percentageState?.ok}%`;
  const okNumber = parseInt(okPercentage);
  const rPercentage = `${percentageState?.r}%`;
  const koPercentage = `${percentageState?.ko}%`;

  console.log(okPercentage, 'OKOKOKKOKO')
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function _colorToRender() {
    if (okNumber > 80) {
      return <GreenCircle />;
    } else if (okNumber > 70 && okNumber < 80) {
      return <YellowCircle />;
    } else if (okNumber < 70){
      return <RedCircle />;
    } 
  }


  const renderMyProfit = () => {
    const colStyle = {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    };
    return (
      <>
        <Row style={{display: 'flex', height: '20%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Col style={colStyle}>
            {_colorToRender()}
            <Heading style={{
              marginTop: '-4.75%',
              textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
              color: `${CONSTANTS?.colors?.white}`,
              fontSize: '28px',
            }}>{okPercentage}</Heading>
          </Col>
        </Row>
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de contratos:</SubHeading>
            <Body style={{marginTop: '0'}}>3 por dia</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo:</SubHeading>
            <Body style={{marginTop: '0'}}>22/12/2020 (12 contratos)</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo:</SubHeading>
            <Body style={{marginTop: '0'}}>13/12/2020 (1 contrato)</Body>
          </Col>
        </Row>
        {/* <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de contratos:</SubHeading>
            <Body style={{marginTop: '0'}}>3 por dia</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo (contratos):</SubHeading>
            <Body style={{marginTop: '0'}}>22/12/2020 (12 contratos)</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo: (faturação)</SubHeading>
            <Body style={{marginTop: '0'}}>13/12/2020 (1 contrato)</Body>
          </Col>
        </Row> */}
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de faturação:</SubHeading>
            <Body style={{marginTop: '0'}}>72€</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0'}}>22/12/2020 (437€)</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0'}}>13/12/2020 (23€)</Body>
          </Col>
        </Row>
      </>
    )
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <MyMonthContainer>
        {renderMyProfit()}
        {/* <HomePageButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </HomePageButton> */}
    
      </MyMonthContainer>

    </MainContainer>
  );
};

export default MyResults;
