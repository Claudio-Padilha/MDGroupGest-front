import React from "react";
import { Link } from "react-router-dom";
import Chart from "react-google-charts";

import {  SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import { useDate } from '../../hooks/date';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  OfficeMonthResultContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const OfficeMonthResult = (props) => {

  console.log(props, 'props from office result')

  const currentMonth = useDate();

  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const ko = props?.location?.state?.contracts?.ko?.length;
  const ok = props?.location?.state?.contracts?.ok?.length;
  const pending = props?.location?.state?.contracts?.pending?.length;
  const all = props?.location?.state?.contracts?.all?.length;

  function _chart(){
    return (
      <Chart
        width={'500px'}
        height={'400px'}
        chartType="Line"
        loader={<div><Body>Carregando gráfico...</Body></div>}
        data={[
          [
            'Dias',
            `${ok === 1 || ok === 0 ? `(${ok}) Válido` : `(${ok}) Válidos`}`,
            `${pending === 1 || pending === 0 ? `(${pending}) Pendente` : `(${pending}) Pendentes`}`,
            `${ko === 1 || ko === 0 ? `(${ko}) Anulado` : `(${ko}) Anulados`}`,
          ],
          [1, ok, pending, ko],
          [2, ok, pending, ko],
          [3, ok, pending, ko],
          [4, ok, pending, ko],
          [5, ok, pending, ko],
          [6, ok, pending, ko],
          [7, ok, pending, ko],
          [8, ok, pending, ko],
          [9, ok, pending, ko],
          [10, ok, pending, ko],
          [11, ok, pending, ko],
          [12, ok, pending, ko],
          [13, ok, pending, ko],
          [14, ok, pending, ko],
        ]}
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
        <div>
          {_chart()}
        </div>
      </>
    );
  };

  return(
    <MainContainer>
      <BackIcon className={"backIcon"} onClick={_goBack} />
      <OfficeMonthResultContainer>
        <SecondRow>
          {renderOfficeMonthResult()}
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
