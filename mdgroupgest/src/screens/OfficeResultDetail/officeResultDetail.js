import React, { useCallback, useMemo, useState } from "react"
import { DateRange } from 'react-date-range'
import { pt } from 'react-date-range/src/locale/index'
import Chart from "react-google-charts"
import { SwishSpinner } from "react-spinners-kit"

import {  SubHeading, SmallSubHeading, Heading, Body } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import { useDate } from '../../hooks/date'
import officesRequests from '../../hooks/requests/officesRequests'
import useChart from '../../hooks/chart'

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

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const officeResultsByPeriod = JSON.parse(localStorage.getItem('officeResultsByPeriod'))
  const dataToChartFromBackOffice = props?.location?.state?.contracts?.dataToChartFromBackOffice

  const dataToPopulateGraphic = useMemo(() =>
    officeResultsByPeriod?.chart_info
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[])

  const cameFromBackoffice = useMemo(() =>
    props?.location?.state?.cameFromBackoffice
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[props])

  const currentSelectedPeriod = useMemo(() =>
    JSON.parse(localStorage.getItem('currentSelectedPeriod'))
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[props])
 
  const valid_contract_value = useMemo(() => 
    cameFromBackoffice ? 
      JSON.parse(localStorage.getItem('officeResults'))
      : officeResultsByPeriod?.faturacao
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[cameFromBackoffice, officeResultsByPeriod])

  const ko = useMemo(() =>
    cameFromBackoffice ?
      props?.location?.state?.contracts?.ko?.length
      : officeResultsByPeriod?.quantidade_ko
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[cameFromBackoffice, officeResultsByPeriod])

  const r = useMemo(() =>
    cameFromBackoffice ?
      props?.location?.state?.contracts?.r?.length
      : officeResultsByPeriod?.quantidade_r
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[cameFromBackoffice, officeResultsByPeriod])

  const ok = useMemo(() =>
    cameFromBackoffice ?
      props?.location?.state?.contracts?.ok?.length
      : officeResultsByPeriod?.quantidade_ok
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[cameFromBackoffice, officeResultsByPeriod])

  const all = useMemo(() =>
    cameFromBackoffice ?
      props?.location?.state?.contracts?.all?.length
      : officeResultsByPeriod?.quantidade_ko + officeResultsByPeriod?.quantidade_ok + officeResultsByPeriod?.quantidade_r
  //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[cameFromBackoffice, officeResultsByPeriod])

  const dynamicDataToChart = useChart({
    dataToPopulateGraphic,
    ko: officeResultsByPeriod?.quantidade_ko,
    ok: officeResultsByPeriod?.quantidade_ok,
    r: officeResultsByPeriod?.quantidade_r
  })

  const currentOfficeID = currentUser?.user?.office

  const currentMonth = useDate()

  let today = new Date()

  const [date, setDate] = useState([
    {
      key: 'selection',
      startDate: cameFromBackoffice ? today : new Date(currentSelectedPeriod?.startDate),
      endDate: cameFromBackoffice ? today : new Date(currentSelectedPeriod?.endDate)
    }
  ])

  function _goBack() {
    localStorage.removeItem('currentSelectedPeriod')
    window.location.replace('#/BackOffice')    
  }

  const _chart = useCallback(() => {
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
          data={cameFromBackoffice ? dataToChartFromBackOffice : dynamicDataToChart}
          options={{
            chart: {
              title: `Produção mês ${currentMonth}: `,
              subtitle: 'por estado de contrato',
            },
            series: {
              0: { color: ok !== 0 ? CONSTANTS?.colors?.green : CONSTANTS?.colors?.white },
              1: { color: r !== 0 ? CONSTANTS?.colors?.brand?.yellow : CONSTANTS?.colors?.white },
              2: { color: ko !== 0 ? CONSTANTS?.colors?.red : CONSTANTS?.colors?.white },
            }
          }}
          rootProps={{ 'data-testid': '3' }}
        />
      </div>
    )
  }, [
    r,
    ko,
    ok,
    currentMonth,
    cameFromBackoffice,
    dynamicDataToChart,
    dataToChartFromBackOffice
  ])

  const _contractsInfo = useCallback(() => (
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
            { r !== 0 &&
              <SmallSubHeading style={{textAlign: 'center'}}>
                {r !== 0 ? "Contratos pendentes: " : null}
              </SmallSubHeading>
            }
            <Heading style={textStyle('72px', 'darkGrey')}>
              {r === 0 ? null : r}
            </Heading>
          </MDCol>

          <MDCol style={{marginLeft: '5%', marginRight: '5%'}}>
            { ko !== 0 &&
              <SmallSubHeading style={{textAlign: 'center'}}>
                {ko !== 0 ? null : "Não há contratos anulados"} {ko !== 0 ? "Contratos anulados: " : null}
              </SmallSubHeading>
            }
            <Heading style={textStyle('72px', 'darkGrey')}>
              {ko === 0 ? null : ko}
            </Heading>
          </MDCol>
        </MDRow>
      }
    </ContractsInfo>
  ), [all, ko, ok, r, valid_contract_value])

  const _dateRange = useCallback(() => (
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
  ), [date])
 
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
          { _dateRange() }
          <CalculateButton onClick={() => {
            const start = `${date?.[0]?.startDate.getFullYear()}-${date?.[0]?.startDate.getMonth() + 1}-${date?.[0]?.startDate.getDate()}`
            const end = `${date?.[0]?.endDate.getFullYear()}-${date?.[0]?.endDate.getMonth() + 1}-${date?.[0]?.endDate.getDate()}`

            officesRequests.officeResultsByPeriod(
              {
                start,
                end,
                office_id: currentOfficeID
              }
            ).then(() => {
              const period = {
                startDate: start,
                endDate: end,
              }
              
              localStorage.removeItem('currentSelectedPeriod')
              localStorage.setItem('currentSelectedPeriod', JSON.stringify(period))
              window.location.reload()
            })
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
            { _contractsInfo() } 
          </FirstRow>        
        </OfficeMonthResultContainer>
      </MainContainer>
    </>
  )
}

export default OfficeMonthResult
