import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';

import {  Heading, SubHeading, Body } from '../../components/Text/text';
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
  const rPercentage = `${percentageState?.r}%`;
  const koPercentage = `${percentageState?.ko}%`;

  console.log(okPercentage, 'OKOKOKKOKO')
  function _goBack() {
    window.location.assign("/BackOffice");    
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
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <Col style={colStyle}><YellowCircle /></Col>
          <Col style={{
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <GreenCircle />
            <Heading style={{
              marginTop: '-22%',
              marginLeft: '1%',
              textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
              color: `${CONSTANTS?.colors?.white}`,
              fontSize: '28px',
            }}>{okPercentage}</Heading>
          </Col>
          <Col style={colStyle}><RedCircle /></Col>
        </Row>
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col>COLUNA 1 - ROW 2</Col>
          <Col>COLUNA 2 - ROW 2</Col>
          <Col>COLUNA 3 - ROW 2</Col>
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
