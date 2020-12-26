import React from "react";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";

import {  SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import { useDate } from '../../hooks/date';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  OfficeMonthResultContainer,
  FirstRow,
  SecondRow,
  ContractsInfo,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDRow,
  MDCol,
  MDButton 
} from '../../screens/Home/md';
import dataRequests from "../../hooks/requests/dataRequests";


const OfficeMonthResult = (props) => {

  const user = JSON.parse(localStorage.getItem('currentUser'))

  const ko = props?.location?.state?.contracts?.ko?.length;
  const ok = props?.location?.state?.contracts?.ok?.length;
  const pending = props?.location?.state?.contracts?.pending?.length;
  const all = props?.location?.state?.contracts?.all?.length;

  

  const currentMonth = useDate();

  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const data = props?.location?.state?.contracts?.dataToGraphic

  console.log()

  console.log("ANTES DA EXECITAR O CHART: ", data)

  function _chart(){
    return (
      <Chart
        width={'600px'}
        height={'500px'}
        chartType="Line"
        loader={<div><Body>Carregando gráfico...</Body></div>}
        data={data}
        options={{
          chart: {
            title: `Produção mês ${currentMonth}: `,
            subtitle: 'por estado de contrato',
          },
          series: {
            0: { color: `${CONSTANTS?.colors?.green}` },
            1: { color: `${CONSTANTS?.colors?.brand?.yellow}` },
            2: { color: `${CONSTANTS?.colors?.red}` },
          }
        }}
        rootProps={{ 'data-testid': '3' }}
      />
    )
  }

  // aqui terá a lógica do mês de cada um
  const renderOfficeMonthResult = () => {
    return (
      <>
        <div style={{width: '100%', marginLeft: '5%'}}>
          {_chart()}
        </div>
      </>
    );
  };

  return(
    <MainContainer>
      <BackIcon className={"backIcon"} onClick={_goBack} />
      <OfficeMonthResultContainer>
        <FirstRow>
          {renderOfficeMonthResult()}
          <ContractsInfo>
          {all === 0 ? 
            <> 
            <MDRow style={{display: 'flex', width: '60%', justifyContent: 'space-between'}}>
              <MDRow style={{display: 'flex', width: '100%'}}>
                <MDCol style={{marginRight: '4%'}}><SubHeading>🟢</SubHeading></MDCol>

                <MDCol>
                  <SmallSubHeading>{ok} {`${ok === 1 ? "contrato" : "contratos"} ${ok === 1 ? "válido" : "válidos"}`}</SmallSubHeading>
                </MDCol>
              </MDRow>


              <MDCol><SubHeading>834€</SubHeading></MDCol>
            </MDRow>

            <MDRow style={{display: 'flex', width: '60%', justifyContent: 'space-between'}}>
              <MDRow style={{display: 'flex', width: '100%'}}>
                <MDCol style={{marginRight: '4%'}}><SubHeading>🟡</SubHeading></MDCol>

                <MDCol>
                  <SmallSubHeading>{pending} {`${pending === 1 ? "contrato" : "contratos"} ${pending === 1 ? "pendente" : "pendentes"}`}</SmallSubHeading>
                </MDCol>
              </MDRow>

              <MDCol><SubHeading>122€</SubHeading></MDCol>
            </MDRow>

            <MDRow style={{display: 'flex', width: '60%', justifyContent: 'space-between'}}>
              <MDRow style={{display: 'flex', width: '100%'}}>
                <MDCol style={{marginRight: '4%'}}><SubHeading>🔴</SubHeading></MDCol>

                <MDCol>
                  <SmallSubHeading>{ko} {`${ko === 1 ? "contrato" : "contratos"} ${ko === 1 ? "anulado" : "anulados"}`}</SmallSubHeading>
                </MDCol>
              </MDRow>

              <MDCol><SubHeading>20€</SubHeading></MDCol>

            </MDRow>
              <SmallSubHeading>Total: {all} {`${all === 1 ? "contrato" : "contratos"}`}</SmallSubHeading>
            </>
            :
            <SmallSubHeading>{all !== 0 ? 'OK' : null} {all !== 0 ? all : null} {`${all === 0 ? "Ainda não há" : all === 1 ? "contrato" : "contratos"} ${all === 0 ? "contratos" : all === 1 ? "válido" : "válidos"}`}</SmallSubHeading>
          }
          </ContractsInfo>
        </FirstRow>

        <SecondRow>
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </OfficeMonthResultContainer>

    </MainContainer>
  );
};

export default OfficeMonthResult;
