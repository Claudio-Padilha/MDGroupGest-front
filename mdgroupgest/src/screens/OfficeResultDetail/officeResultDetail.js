import React, { useCallback, useEffect, useState } from "react"
import { DateRange } from 'react-date-range'
import { pt } from 'react-date-range/src/locale/index'
import Chart from "react-google-charts"
import { SwishSpinner } from "react-spinners-kit"

import {  SubHeading, SmallSubHeading, Heading, Body } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import { useDate } from '../../hooks/date'
import officesRequests from '../../hooks/requests/officesRequests'

import CONSTANTS from '../../constants'
import {
  MainContainer,
  OfficeMonthResultContainer,
  FirstRow,
  CalculateButton,
  ContractsInfo,
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
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const currentOfficeID = currentUser?.user?.office

  const currentMonth = useDate()

  let today = new Date()
  let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)

  const [date, setDate] = useState([
    {
      key: 'selection',
      startDate: today,
      endDate: lastDayOfMonth
    }
  ])

  function _goBack() {
    window.location.replace('#/BackOffice')    
  }

  function _chart(){
    const loader = () => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30%',
        marginRight: '10%'
      }}>
        <SwishSpinner size={200} color="#686769" />
      </div>
    )

    return (
      <div style={{marginTop: '5rem'}}>
        <Chart
          width={'550px'}
          height={'400px'}
          chartType="Line"
          loader={loader()}
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
      </div>
    )
  }

  const verticalLine = () => (
    <div style={
      {
        borderLeft: '1px solid black',
        height: '47%',
        position: 'absolute',
        left: '56.5rem',
        top: '6rem',
      }
    }></div>
  )

  const renderOfficeMonthResult = () => {
    const parentStyle = () => ({
      width: '94%',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '3rem'
    })

    const childStyle = () => ({
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      marginRight: '5rem',
      alignItems: 'center'
    })
    
    return (
      <div style={parentStyle()}>
        <div style={childStyle()}>
          <DateRange
            editableDateInputs={true}
            onChange={item => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            showPreview={true}
            rangeColors={'#000000'}
            color={'#000000'}
            dateDisplayFormat={'dd MMMM, yyyy'}
            locale={pt}
            endDatePlaceholder={'fim período'}
            months={2}
            direction="horizontal"
          />
          <CalculateButton onClick={() => {
            officesRequests.officeResultsByPeriod(
              {
                start: date?.[0]?.startDate,
                end: date?.[0]?.endDate,
                office_id: currentOfficeID
              }
            )
          }}>
            <Body>
              <MDButton style={{width: '15vw', height: '4vh', fontSize: '18px'}}>
                Calcular período
              </MDButton>
            </Body>
          </CalculateButton>
        </div>
        { verticalLine() }
        { _chart() }
      </div>
    )
  }

  const textStyle = (fontSize, color) => {
    return {
      color: CONSTANTS?.colors?.[color],
      textAlign: 'center',
      fontSize,
      textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'
    }
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
            { all !== 0 ? renderOfficeMonthResult() : <></>}
            <ContractsInfo>
              { all === 0 ? 
                <> 
                <EmptyContainer>
                  <SubHeading>Ainda não há contratos...</SubHeading>
                </EmptyContainer>
                </>
                :
                <MDRow style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: '120%',
                  height: '20rem',
                  marginRight: '5rem',
                  alignSelf: 'center',
                  flexDirection: 'row',
                  borderTop: '1px solid black',
                  borderBottom: '1px solid black',
                }}>
                  <MDCol style={{marginRight: '5%'}}>
                    <SmallSubHeading style={{textAlign: 'center'}}>
                      {ok !== 0 ? null : "Ainda não há contratos válidos"} {ok !== 0 ? "Contratos válidos: " : null}
                    </SmallSubHeading>
                    <Heading style={textStyle('72px', 'darkGrey')}>
                      {ok === 0 ? null : ok}
                    </Heading>
                    <SmallSubHeading style={textStyle('42px', 'green')}>
                      {valid_contract_value + ' €'}
                    </SmallSubHeading>
                  </MDCol>

                  <MDCol>
                    { pending !== 0 &&
                      <SmallSubHeading style={{textAlign: 'center'}}>
                        {pending !== 0 ? "Contratos pendentes: " : null}
                      </SmallSubHeading>
                    }
                    <Heading style={textStyle('72px', 'darkGrey')}>
                      {pending === 0 ? null : pending}
                    </Heading>
                  </MDCol>

                  <MDCol style={{marginLeft: '5%', marginRight: '5%'}}>
                  {ko !== 0 && <SmallSubHeading style={{textAlign: 'center'}}>{ko !== 0 ? null : "Não há contratos anulados"} {ko !== 0 ? "Contratos anulados: " : null}</SmallSubHeading>}
                  <Heading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center', fontSize: '96px', textShadow: '1px 1px 1px rgba(0, 0, 0, 0.4)'}} >{ko === 0 ? null : ko}</Heading>
                  </MDCol>
                </MDRow>
              }
            </ContractsInfo>
          </FirstRow>        
        </OfficeMonthResultContainer>
      </MainContainer>
    </>
  )
}

export default OfficeMonthResult
