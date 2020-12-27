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
  HomePageButton,
  EmptyContainer
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDRow,
  MDCol,
  MDButton 
} from '../../screens/Home/md';


const OfficeMonthResult = (props) => {

  const data = props?.location?.state?.contracts?.dataToDiagram
  const user = JSON.parse(localStorage.getItem('currentUser'))

  const ko = props?.location?.state?.contracts?.ko?.length;
  const ok = props?.location?.state?.contracts?.ok?.length;
  const pending = props?.location?.state?.contracts?.pending?.length;
  const all = props?.location?.state?.contracts?.all?.length;

  

  const currentMonth = useDate();

  function _goBack() {
    window.location.assign("/BackOffice");    
  }

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
          {all !== 0 ? renderOfficeMonthResult(): <></>}
          <ContractsInfo>
          {all === 0 ? 
            <> 
            <EmptyContainer>
              <SubHeading>Ainda não há contratos...</SubHeading>
            </EmptyContainer>
            </>
            :
            <MDRow style={{display: 'flex', justifyContent: 'space-between'}}>
              <MDCol>
              <SmallSubHeading>{ok !== 0 ? ok : "Ainda não há contratos válidos"} {ok === 1 ? "contrato válido" : ok > 1 ?  "contratos válidos": null}</SmallSubHeading>
              </MDCol>

              <MDCol>
              <SmallSubHeading>{pending !== 0 ? pending : "Não há contratos pendentes"} {pending === 1 ? "contrato pendente" : pending > 1 ? "contratos pendentes" : null}</SmallSubHeading>
              </MDCol>

              <MDCol>
              <SmallSubHeading>{ko !== 0 ? ko : "Não há contratos anulados"} {ko === 1 ? "contrato anulado" : ko > 1 ? "contratos anulados" : null}</SmallSubHeading>
              </MDCol>
            </MDRow>

          }
          </ContractsInfo>
        </FirstRow>
        
        { all !== 0 ?
        <SecondRow>
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
        :
        <>
        </>
        } 
      
      </OfficeMonthResultContainer>

    </MainContainer>
  );
};

export default OfficeMonthResult;
