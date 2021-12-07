import React, { useReducer, useEffect, useState } from "react";
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import {  Heading, SubHeading, SmallSubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import { useRefresh } from '../../hooks/window/refresh'
import { useAuth } from '../../hooks/employees/auth'

import {
  MainContainer,
  MyMonthContainer,
  GreenCircle,
  YellowCircle,
  RedCircle,
  WidthMessageContainer
} from "./styles";

import CONSTANTS from "../../constants";

const MyResults = (props) => {
  
  const { wasRefreshed } = useRefresh();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentUserType = currentUser?.user?.user_type;
  const history = useHistory()

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

  const today = new Date();
  const todayNumber = today.getDate();

  const {
    isCEO,
    isRegularManager,
    isAdministrator,
    isRegularSecretary
  } = useAuth()

  var contractQtdAverage = allContractsQtd / todayNumber;
  const contractQtdAverageFixedBy2 = contractQtdAverage.toFixed(2);
  
  var salaryAverage = currentSalary / todayNumber;
  const salaryAverageFixedBy2 = salaryAverage.toFixed(2);

  const initialState = { 
    results: resultsInfo,
    allContractsQtd,
    currentSalary,
    currentFacturing,
    currentUser,
    percentageState: props?.location?.state?.percentages,
    okPercentage: `${percentageState?.ok}%`,
    okNumber: parseInt(okPercentage),
    rPercentage: `${percentageState?.r}%`,
    rNumber: parseInt(rPercentage),
    koPercentage: `${percentageState?.ko}%`,
    koNumber: parseInt(koPercentage),
    contractQtdAverage: contractQtdAverageFixedBy2,
    salaryAverageFixedBy2
  }

  if(!wasRefreshed) {
    localStorage.setItem('myResultsScreenState', JSON.stringify(initialState))
  }
  
  const reducer = (firstState, action) => {
    let reducerState = {}

    const stateOnRAM = JSON.parse(localStorage.getItem('myResultsScreenState'))

    if (wasRefreshed) {
      switch (action) {
        case 'MAINTAIN_SCREEN_STATE':
          reducerState = stateOnRAM;
      }
      return reducerState
    }

    localStorage.removeItem('myResultsScreenState')
    localStorage.setItem('myResultsScreenState', JSON.stringify(reducerState))
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  }, [wasRefreshed])

  function _goBack() {
    localStorage.removeItem('myResultsScreenState');

    history.push({
      pathname: "/BackOffice",
      state: {
        fromMyResults: true
      }
    })
  }

  function _colorToRender() {
    if (state?.okNumber >= 80) {
      return <GreenCircle />;
    } else if (state?.koNumber <= 30 && state?.rNumber <= 70 && state?.okNumber < 80) {
      return <YellowCircle />;
    } else if (state?.koNumber >= 30 && state?.rNumber < 70 && state?.okNumber <=70){
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
    console.log(state, 'ESTADO');
    return (
      <>
        <Row style={{display: 'flex', height: '20%', justifyContent: 'space-between', alignItems: 'flex-start'}}>

          { !isCEO && !isAdministrator && !isRegularManager && !isRegularSecretary && 
            <Col style={colStyle}>

              <SmallSubHeading style={
                {
                  marginTop: '10%',
                  color: `${CONSTANTS?.colors?.darkGrey}`,
                }
              }>
                A tua faturação até agora está em
              </SmallSubHeading>
              <Heading style={
                {
                  marginTop: '-5%',
                  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                  color: `${CONSTANTS?.colors?.green}`,
                  fontSize: '56px',
                }
              }>
                {state?.currentSalary}€
              </Heading>
            </Col>
          }

          { (isAdministrator || isRegularSecretary) && 
            <Col style={colStyle}>

              <SmallSubHeading style={
                {
                  marginTop: '10%',
                  color: `${CONSTANTS?.colors?.darkGrey}`,
                }
              }>
                O total de contratos é de
              </SmallSubHeading>
              <Heading style={
                {
                  marginTop: '-5%',
                  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                  color: `${CONSTANTS?.colors?.green}`,
                  fontSize: '56px',
                }
              }>
                {state?.allContractsQtd}
              </Heading>
            </Col>
          }
          
          { isRegularManager &&
            <Col style={colStyle}>

              <SmallSubHeading style={
                {
                  marginTop: '10%',
                  color: `${CONSTANTS?.colors?.darkGrey}`,
                }
              }>
                A faturação do escritório até agora é de
              </SmallSubHeading>
              <Heading style={
                {
                  marginTop: '-5%',
                  textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                  color: `${CONSTANTS?.colors?.green}`,
                  fontSize: '56px',
                }
              }>
                {state?.currentFacturing}€
              </Heading>

            </Col>
          }

          <Col style={colStyle}>
            {_colorToRender()}
            <Heading style={
              {
                marginTop: '-17%',
                textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                color: `${CONSTANTS?.colors?.white}`,
                fontSize: '28px',
              }
            }>
              {state?.okPercentage}
            </Heading>

            <Body style={
              {
                marginTop: '-10%',
                textShadow: '2px 2px 3px rgba(0, 0, 0, 0.4)',
                color: `${CONSTANTS?.colors?.white}`,
                fontSize: '14px',
              }
            }>
              dos contratos OK
            </Body>

            { state?.okNumber < 80 && 
              <Row style={
                {
                  display: 'flex',
                  height: '3vh',
                  width: '100%',
                  justifyContent: 'center'
                }
              }>
                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>⬆️</SmallSubHeading>
              </Row>
            }
            { state?.okNumber < 80 && 
              <Row style={{
                display: 'flex',
                height: '3vh',
                width: '100%',
                justifyContent: 'center'
              }}>

                <Body style={{marginTop: '1%', marginBottom: '0'}}>
                  {state?.allContractsQtd !== 0 ? `Com mais ${80 - state?.okNumber}% seu status passará a 🟢` : "Você ainda não tem contratos"}
                </Body>

              </Row>
            }
            { state?.rNumber > 20 && state?.okNumber < 80 && 
              <Row style={
                {
                  display: 'flex',
                  height: '3vh',
                  width: '100%',
                  justifyContent: 'center'
                }
              }>

                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>
                  Atenção aos pendentes!
                </SmallSubHeading>
                <Body style={{marginTop: '1%', marginBottom: '0', marginLeft: '2%'}}>
                  Está em {state?.rPercentage} 🟡
                </Body>

              </Row>
            }
            { state?.koNumber > 10 && state?.okNumber < 70 && 
              <Row style={
                {
                  display: 'flex',
                  height: '3vh',
                  width: '100%',
                  justifyContent: 'center'
                }
              }>
                <SmallSubHeading style={{marginTop: '1%', marginBottom: '0'}}>
                  Atenção aos anulados!
                </SmallSubHeading>
                <Body style={{marginTop: '1%', marginBottom: '0', marginLeft: '2%'}}>
                  Está em {state?.koPercentage} 🔴
                </Body>

              </Row>
            }
          </Col>
          <Col style={colStyle}></Col>
        </Row>

        <Row style={{display: 'flex', height: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Média de contratos:</SubHeading>
            <Body style={{marginTop: '0'}}>
              {`${state?.contractQtdAverage} contratos por dia ${state?.contractQtdAverage > 2 ? "✅" : state?.contractQtdAverage < 0.7 ? "⛔️" : "⚠️"}`}
            </Body>

          </Col>

          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo:</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.green}}>
              {`${state?.results?.best_contract_day?.best_day} (${state?.results?.best_contract_day?.value <= 1 ? `${state?.results?.best_contract_day?.value} contrato` : `${state?.results?.best_contract_day?.value} contratos`})`}
            </Body>

          </Col>

          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo:</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.red}}>
              {`${state?.results?.worst_contract_day?.worst_day} (${state?.results?.worst_contract_day?.value <= 1 ? `${state?.results?.worst_contract_day?.value} contrato` : `${state?.results?.worst_contract_day?.value} contratos`})`}
            </Body>
          
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
        <Row style={
          {
            display: 'flex',
            height: '50%',
            marginTop: '-10%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }>

          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Média de faturação:</SubHeading>
            <Body style={{marginTop: '0'}}>
              {state?.salaryAverageFixedBy2}€ por dia
            </Body>

          </Col>

          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Dia mais produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.green}}>
              {`${state?.results?.best_comission_day?.best_day} (${state?.results?.best_comission_day?.value}€)`}
            </Body>

          </Col>

          <Col style={colStyle}>

            <SubHeading style={{marginBottom: '1%'}}>Dia menos produtivo (faturação):</SubHeading>
            <Body style={{marginTop: '0', color: CONSTANTS?.colors?.red}}>
              {`${state?.results?.worst_comission_day?.worst_day} (${state?.results?.worst_comission_day?.value}€)`}
            </Body>

          </Col>

        </Row>
      </>
    )
  };

  return(
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer>
        <BackIcon onClick={_goBack} />
        <MyMonthContainer>
          { state?.allContractsQtd !== 0 ?
            renderMyProfit() :
            <SubHeading style={{display: 'flex', justifyContent: 'center'}}>Ainda não há contratos...</SubHeading>
          }  
        </MyMonthContainer>

      </MainContainer>
    </>
  );
};

export default MyResults;
