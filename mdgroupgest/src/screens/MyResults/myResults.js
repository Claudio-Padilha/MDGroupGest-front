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
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUserType = currentUser?.user?.user_type;

  console.log(currentUser, 'CURRENT USEEEEEEEER')

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
  const currentFacturing = props?.location?.state?.currentFacturing;
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
  console.log(allContractsQtd, 'QTD')
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function _colorToRender() {
    if (okNumber >= 80) {
      return <GreenCircle />;
    } else if (rNumber <= 70 && okNumber < 80) {
      return <YellowCircle />;
    } else if (koNumber >= 70 || rNumber < 70 && okNumber <= 70){
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
          { currentUserType !== "manager" && currentUserType !== "secretary"  && 
            <Col style={colStyle}>
              <SmallSubHeading style={{
                marginTop: '10%',
                color: `${CONSTANTS?.colors?.darkGrey}`,
              }}>O seu salário até agora está em</SmallSubHeading>
              <Heading style={{
                marginTop: '-5%',
                textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                color: `${CONSTANTS?.colors?.green}`,
                fontSize: '56px',
              }}>{currentSalary}€</Heading>
            </Col>
          }
          
          { currentUserType === "manager" || currentUserType === "secretary" &&
            <Col style={colStyle}>
              <SmallSubHeading style={{
                marginTop: '10%',
                color: `${CONSTANTS?.colors?.darkGrey}`,
              }}>A faturação do escritório até agora é de</SmallSubHeading>
              <Heading style={{
                marginTop: '-5%',
                textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                color: `${CONSTANTS?.colors?.green}`,
                fontSize: '56px',
              }}>{currentFacturing}€</Heading>
            </Col>
          }
          <Col style={colStyle}>
            {_colorToRender()}
            <Heading style={{
              marginTop: '-16%',
              textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
              color: `${CONSTANTS?.colors?.white}`,
              fontSize: '28px',
            }}>{okPercentage}</Heading>
            <Body style={{
              marginTop: '-9%',
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
                <Body style={{marginTop: '1%', marginBottom: '0'}}>{allContractsQtd !== 0 ? `Com mais ${80 - okNumber}% seu status passará a 🟢` : "Você ainda não tem contratos"}</Body>
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
          <Col style={colStyle}></Col>
        </Row>
        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de contratos:</SubHeading>
            <Body style={{marginTop: '0'}}>{`${contractQtdAverageFixedBy2} contratos por dia ${contractQtdAverageFixedBy2 > 2 ? "✅" : contractQtdAverageFixedBy2 < 0.7 ? "⛔️" : "⚠️"}`}</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo:</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.green}}>{`${bestContractDay?.best_day} (${bestContractDay?.value <= 1 ? `${bestContractDay?.value} contrato` : `${bestContractDay?.value} contratos`})`}</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo:</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.red}}>{`${worstContractDay?.worst_day} (${worstContractDay?.value <= 1 ? `${worstContractDay?.value} contrato` : `${worstContractDay?.value} contratos`})`}</Body>
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
        <Row style={{display: 'flex', height: '50%', marginTop: '-10%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Média de faturação:</SubHeading>
            <Body style={{marginTop: '0'}}>{salaryAverageFixedBy2}€ por dia</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.green}}>{`${bestComissionDay?.best_day} (${bestComissionDay?.value}€)`}</Body>
          </Col>
          <Col style={colStyle}>
            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.red}}>{`${worstComissionDay?.worst_day} (${worstComissionDay?.value}€)`}</Body>
          </Col>
        </Row>
      </>
    )
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <MyMonthContainer>
        { allContractsQtd !== 0 ?
          renderMyProfit() :
          <SubHeading style={{display: 'flex', justifyContent: 'center'}}>Ainda não há contratos...</SubHeading>
        }  
      </MyMonthContainer>

    </MainContainer>
  );
};

export default MyResults;
