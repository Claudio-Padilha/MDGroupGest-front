import React from "react"
import { Link } from "react-router-dom"
import Chart from "react-google-charts"
import { SwishSpinner } from "react-spinners-kit"

import {  SubHeading, Body, SmallSubHeading, Heading } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import { useDate } from '../../hooks/date'

import CONSTANTS from '../../constants'
import {
  MainContainer,
  OfficeMonthResultContainer,
  FirstRow,
  SecondRow,
  ContractsInfo,
  HomePageButton,
  EmptyContainer,
  WidthMessageContainer
} from "./styles"

import { MDRow, MDCol, MDButton } from '../../screens/Home/md'

const OfficeMonthResult = (props) => {

  const valid_contract_value = JSON.parse(localStorage.getItem('officeResults'))

  const data = props?.location?.state?.contracts?.dataToDiagram

  const ko = props?.location?.state?.contracts?.ko?.length
  const ok = props?.location?.state?.contracts?.ok?.length
  const pending = props?.location?.state?.contracts?.pending?.length
  const all = props?.location?.state?.contracts?.all?.length

  const currentMonth = useDate()

  function _goBack() {
    window.location.replace('#/BackOffice')    
  }

  function _chart(){
    return (
      <Chart
        width={'600px'}
        height={'500px'}
        chartType="Line"
        loader={<div style={{display: 'flex', justifyContent: 'center', marginTop: '30%', marginRight: '10%'}}><SwishSpinner size={200} color="#686769" /></div>}
        data={data}
        options={{
          chart: {
            title: `Produção mês ${currentMonth}: `,
            subtitle: 'por estado de contrato',
          },
          series: {
            0: { color: ok !== 0 ? CONSTANTS?.colors?.green : CONSTANTS?.colors?.white },
            1: { color: pending !== 0 ? CONSTANTS?.colors?.brand?.yellow : CONSTANTS?.colors?.white },
            2: { color: ko !== 0 ? CONSTANTS?.colors?.red : CONSTANTS?.colors?.white },
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
    )
  }

  return(
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
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
              <MDRow style={{display: 'flex',  justifyContent: 'space-around', width: '100%', flexDirection: 'row'}}>
                <MDCol style={{marginRight: '5%'}}>
                <SmallSubHeading style={{textAlign: 'center'}}>{ok !== 0 ? null : "Ainda não há contratos válidos"} {ok !== 0 ? "Contratos válidos: " : null}</SmallSubHeading>
                <Heading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center', fontSize: '96px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'}}>{ok === 0 ? null : ok}</Heading>
                <SmallSubHeading style={{color: CONSTANTS?.colors?.green, textAlign: 'center', fontSize: '32px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)' }} >{valid_contract_value + ' €'}</SmallSubHeading>
                </MDCol>

                <MDCol>
              
                {pending !== 0 && <SmallSubHeading style={{textAlign: 'center'}}>{pending !== 0 ? "Contratos pendentes: " : null}</SmallSubHeading>}
                <Heading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center', fontSize: '96px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'}} >{pending === 0 ? null : pending}</Heading>
                </MDCol>

                <MDCol style={{marginLeft: '5%', marginRight: '5%'}}>
                {ko !== 0 && <SmallSubHeading style={{textAlign: 'center'}}>{ko !== 0 ? null : "Não há contratos anulados"} {ko !== 0 ? "Contratos anulados: " : null}</SmallSubHeading>}
                <Heading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center', fontSize: '96px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'}} >{ko === 0 ? null : ko}</Heading>
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
    </>
  )
}

export default OfficeMonthResult
