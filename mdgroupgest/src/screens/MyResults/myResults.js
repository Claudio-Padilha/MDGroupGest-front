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
import dataRequests from "../../hooks/requests/dataRequests";

const MyResults = (props) => {
  console.log(props, 'PROPS DE RESULTS')

  const percentageState = props?.location?.state?.percentages;
  const okPercentage = `${percentageState?.ok}%`;
  const okNumber = parseInt(okPercentage);
  const rPercentage = `${percentageState?.r}%`;
  const rNumber = parseInt(rPercentage);
  const koPercentage = `${percentageState?.ko}%`;
  const koNumber = parseInt(koPercentage);

  const resultsInfo = props?.location?.state?.resultsInfo;
  const allContractsQtd = props?.location?.state?.contracts?.all?.length;
  const currentSalary = props?.location?.state?.currentSalary;
  var bestContractDay = resultsInfo?.best_contract_day;
  var bestComissionDay = resultsInfo?.best_comission_day;
  var worstContractDay = resultsInfo?.worst_contract_day;
  var worstComissionDay = resultsInfo?.worst_comission_day;

  const today = new Date()
  const todayNumber = today.getDate()

  var contractQtdAverage = allContractsQtd / todayNumber;
  const contractQtdAverageFixedBy2 = contractQtdAverage.toFixed(2);
  
  var salaryAverage = currentSalary / todayNumber;
  const salaryAverageFixedBy2 = salaryAverage.toFixed(2);

  console.log(bestContractDay, 'BEST CONTRACT DAY')
  console.log(bestComissionDay, 'BEST COMISSION DAY')
  console.log(worstContractDay, 'worst CONTRACT DAY')
  console.log(worstComissionDay, 'worst COmission DAY')
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function _colorToRender() {
    if (okNumber > 80) {
      return <GreenCircle />;
    } else if (rNumber < 70 && okNumber < 80) {
      return <YellowCircle />;
    } else if (koNumber > 70 || rNumber < 70 && okNumber < 70){
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
              marginTop: '-5.5%',
              textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
              color: `${CONSTANTS?.colors?.white}`,
              fontSize: '28px',
            }}>{okPercentage}</Heading>
            <Body style={{
              marginTop: '-3%',
              textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
              color: `${CONSTANTS?.colors?.white}`,
              fontSize: '14px',
            }}>Contratos OK</Body>
            {okNumber < 80 && 
              <Row style={{
                display: 'flex',
                height: '3vh',
                width: '100%',
                justifyContent: 'center'
              }}>
                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>⬆️</SmallSubHeading>
              </Row>
            }
            {okNumber < 80 && 
              <Row style={{
                display: 'flex',
                height: '3vh',
                width: '100%',
                justifyContent: 'center'
              }}>
                <Body style={{marginTop: '1%', marginBottom: '0'}}>Com mais {80 - okNumber}% seu status passará a 🟢</Body>
              </Row>
            }
            {rNumber > 20 && okNumber < 80 && 
              <Row style={{
                display: 'flex',
                height: '3vh',
                width: '100%',
                justifyContent: 'center'
              }}>
                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>Atenção aos pendentes!</SmallSubHeading> <Body style={{marginTop: '1%', marginBottom: '0', marginLeft: '2%'}}>Está em {rPercentage} 🟡</Body>
              </Row>
            }
            {koNumber > 10 && okNumber < 70 && 
              <Row style={{
                display: 'flex',
                height: '3vh',
                width: '100%',
                justifyContent: 'center'
              }}>
                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>Atenção aos anulados!</SmallSubHeading> <Body style={{marginTop: '1%', marginBottom: '0', marginLeft: '2%'}}>Está em {koPercentage} 🔴</Body>
              </Row>
            }
          </Col>
        </Row>
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de contratos:</SubHeading>
            <Body style={{marginTop: '0'}}>{`${contractQtdAverageFixedBy2} contratos por dia ${contractQtdAverageFixedBy2 > 2 ? "✅" : contractQtdAverageFixedBy2 < 0.7 ? "⛔️" : "⚠️"}`}</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo:</SubHeading>
            <Body style={{marginTop: '0'}}>{`${bestContractDay?.best_day} (${bestContractDay?.value <= 1 ? `${bestContractDay?.value} contrato` : `${bestContractDay?.value} contratos`})`}</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo:</SubHeading>
            <Body style={{marginTop: '0'}}>{`${worstContractDay?.worst_day} (${worstContractDay?.value <= 1 ? `${worstContractDay?.value} contrato` : `${worstContractDay?.value} contratos`})`}</Body>
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
            <Body style={{marginTop: '0'}}>{salaryAverageFixedBy2}€ por dia</Body>
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
