import React, { useMemo, useReducer, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit"
import { Avatar } from '@material-ui/core'

import { Heading, SubHeading, Body } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import {
  MDCard,
  MDCardBody,
  MDButton,
  MDRow,
  MDCol
} from '../../screens/Home/md'

import CONSTANTS from '../../constants'
import {
  TeamContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  ExportButton,
  MainContainerEType,
  WidthMessageContainer,
  useStyles
} from "./styles"

import { useRefresh } from '../../hooks/window/refresh'
import employeesRequests from "../../hooks/requests/employeesRequests"
import officesRequests from '../../hooks/requests/officesRequests'

const TeamReportDetail = (props) => {
  const history = useHistory()
  
  function _goBack() {
    history.push({
      pathname: '/TeamReport',
      state: {
        fromTeamReportDetail: true
      }
    })
  }

  const screenStyle = useStyles();

  const { wasRefreshed } = useRefresh()

  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500])
  }

  const isFromBackOffice = props?.location?.state?.isFromBackOffice
  const employee = props?.location?.state?.employee
  const fromTeamReportList = props?.location?.state?.fromTeamReportList

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const currentOfficeID = currentUser?.user?.office

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  function _allEmployees() {
    if(isFromBackOffice) {
      return employeesRequests.getAllEmployees(currentOfficeID)
    }
  }
  _allEmployees()

  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [isFromBackOffice])

  const initialState = { employee }

  if(!wasRefreshed || fromTeamReportList || initialState !== undefined) {
    localStorage.setItem('teamReportDetailState', JSON.stringify(initialState))
  }

  const reducer = (firstState, action) => {
    let reducerState = {}
    const stateOnRAM = JSON.parse(localStorage.getItem('teamReportDetailState'))

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
    }

    localStorage.removeItem('teamReportDetailState')
    localStorage.setItem('teamReportDetailState', JSON.stringify(reducerState))

    return reducerState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  }, [wasRefreshed])

  console.log(state, 'STATE')

  const total = employee?.ok_contract_amount + employee?.r_contract_amount + employee?.ko_contract_amount

  function _getPercentage(percent) {
    if (percent !== 0 || total !== 0) {
      const p = (percent / total) * 100
      return p.toFixed(2);
    } else {
      return 0;
    }
  }

  const koPercentage = _getPercentage(employee?.ko_contract_amount)
  const okPercentage = _getPercentage(employee?.ok_contract_amount)
  const rPercentage = _getPercentage(employee?.r_contract_amount)

  const renderFirstCards = (info, i) => {

    const darkGrey = CONSTANTS?.colors?.darkGrey

    const linkStyle = {
      marginRight: '1vw',
      marginLeft: '1vw',
      height: '35%',
      width: '24%'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column'
    }

    const row = {
      display: 'flex',
      flexDirection: 'row'
    }

    const nameStyle = {
      color: darkGrey,
      textAlign: 'center',
      marginBottom: '0'
    }

    return (
      <Link style={linkStyle} key={i}>
        <MDCard className={"card"} style={{margin: '1vh'}}>
          <MDCardBody style={{...column, width: '100%'}}>

            <div style={{...column, width: '100%', alignItems: 'center'}}>
              <Body>{info?.label}</Body>
              <MDRow style={column}>
                
                <SubHeading style={nameStyle}>{`${info?.qtd <= 1 ? `${info?.qtd} contrato` : `${info?.qtd} contratos`}`}</SubHeading>
                <SubHeading style={nameStyle}>{info?.percentage}%</SubHeading>
              </MDRow>
            </div>
          </MDCardBody>
        </MDCard>
      </Link>
    )
  }

  const renderSecondCards = (info, i) => {

    const darkGrey = CONSTANTS?.colors?.darkGrey

    const linkStyle = {
      marginRight: '1vw',
      marginLeft: '1vw',
      height: '35%',
      width: '40%'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column'
    }

    const row = {
      display: 'flex',
      flexDirection: 'row'
    }

    const nameStyle = {
      color: darkGrey,
      textAlign: 'center',
      marginBottom: '0'
    }

    return (
      <Link style={linkStyle} key={i}>
        <MDCard className={"card"} style={{margin: '1vh'}}>
          <MDCardBody style={{...column, width: '100%'}}>

            <div style={{...column, width: '100%', alignItems: 'center'}}>
              <SubHeading>{info?.label}</SubHeading>
              <MDRow style={column}>
                <SubHeading style={nameStyle}>{info?.comissionLabel}{info?.comissionValue}{info?.comissionDay}</SubHeading>
                <SubHeading style={nameStyle}>{info?.contractLabel}{info?.contractValue}{info?.contractDay}</SubHeading>
              </MDRow>
            </div>
          </MDCardBody>
        </MDCard>
      </Link>
    )
  }

  const renderThirdCards = (info, i) => {
    const darkGrey = CONSTANTS?.colors?.darkGrey

    const linkStyle = {
      marginRight: '1vw',
      marginLeft: '1vw',
      height: '35%',
      width: '40%'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column'
    }

    const nameStyle = {
      color: darkGrey,
      textAlign: 'center',
      marginBottom: '0'
    }

    return (
      <Link style={linkStyle} key={i}>
        <MDCard className={"card"} style={{margin: '1vh'}}>
          <MDCardBody style={{...column, width: '100%'}}>

            <div style={{...column, width: '100%', alignItems: 'center'}}>
              <Body>Valor</Body>
              <MDRow style={column}>

                { koPercentage > 30 &&
                  <Body style={nameStyle}>{`Este comercial está com a taxa de anulados em: ${koPercentage}%`}</Body>
                }
                <SubHeading style={
                  {
                    ...nameStyle, 
                    color: koPercentage > 30 ? CONSTANTS?.colors?.red : CONSTANTS?.colors?.green
                  }
                } id={koPercentage > 30 ? "pulse" : ""}>{employee?.total}€</SubHeading>
                
              </MDRow>
            </div>
          </MDCardBody>
        </MDCard>
      </Link>
    )
  }

  const handleScreen = () => {
    const horizontalLine = () => (
      <span>
        <hr style={{
          height: '1px',
          width: '100%',
          borderWidth: '0',
          color: CONSTANTS?.colors?.mediumGrey,
          backgroundColor: CONSTANTS?.colors?.mediumGrey
        }}/>
      </span>
    )

    const avatarContainerStyle = {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      marginTop: '-5vh'
    }

    const handleFirstSection = () => {
      const okContracts = employee?.ok_contract_amount
      const rContracts = employee?.r_contract_amount
      const koContracts = employee?.ko_contract_amount

      const resultStatus = () => {
    
        if (total === 0) {
          return "⚪️";
        } else if (okPercentage < 70) {
          return "🔴";
        } else if (okPercentage < 80){
          return "🟡";
        } else if (okPercentage > 80) {
          return "🟢"
        } else {
          return "⚪️"
        }
      }

      return (
        <div className={'CONTENT CONTAINER'}>
          <Heading style={{ color: CONSTANTS?.colors?.darkGrey, marginTop: '10vh' }}>
           { horizontalLine() }
            Contratos <span><SubHeading style={{marginTop: '0', color: CONSTANTS?.colors?.mediumGrey}}>({total} no total)</SubHeading></span>
          </Heading>
          <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
            { renderFirstCards({
              label: 'Contratos Válidos',
              qtd: okContracts,
              percentage: okPercentage,
            })}
            { renderFirstCards({
              label: 'Contratos Pendentes',
              qtd: rContracts,
              percentage: rPercentage,
            })}
            { renderFirstCards({
              label: 'Contratos Anulados',
              qtd: koContracts,
              percentage: koPercentage,
            })}
          </FirstRow>
        </div>
      )
    }

    const handleSecondSection = (info) => {
      const bestComissionDay = info?.best_comission_day
      const bestContractDay = info?.best_contract_day
      const worstComissionDay = info?.worst_comission_day
      const worstContractDay = info?.worst_contract_day

      return (
        total > 0 ?
        <div className={'CONTENT CONTAINER'}>
          <Heading style={{ color: CONSTANTS?.colors?.darkGrey, marginTop: '10vh' }}>
            { horizontalLine() }
            Resultados
          </Heading>
          <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
            { renderSecondCards({
              comissionValue: `${bestComissionDay?.value}€ - `, 
              comissionDay: bestComissionDay?.best_day,
              contractCounter: bestContractDay?.value,
              contractDay: bestContractDay?.best_day,
              comissionLabel: 'Comissões: ',
              contractLabel: 'Contratos: ',
              label: 'Melhor dia'
            })}
            { renderSecondCards({
              comissionValue: `${worstComissionDay?.value}€ - `, 
              comissionDay: worstComissionDay?.worst_day,
              contractCounter: worstContractDay?.value,
              contractDay: worstContractDay?.worst_day,
              comissionLabel: 'Comissões: ',
              contractLabel: 'Contratos: ',
              label: 'Pior dia'
            })}
          </FirstRow>
        </div>
        :
        <div className={'CONTENT CONTAINER'}>
          <Heading style={{ color: CONSTANTS?.colors?.darkGrey, marginTop: '10vh' }}>
            { horizontalLine() }
            Resultados
          </Heading>
          <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
            <SubHeading>Esse comercial ainda não tem resultados</SubHeading>
          </FirstRow>
        </div>
      )
    }

    const handleThirdSection = () => (
      <div className={'CONTENT CONTAINER'} style={{marginBottom: '10vh'}}>
        <Heading style={{ color: CONSTANTS?.colors?.darkGrey, marginTop: '10vh' }}>
          { horizontalLine() }
          Salário
        </Heading>
        <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
          { renderThirdCards()}
        </FirstRow>
      </div>
    )

    return (

      <TeamContainer>
        <div className={'AVATAR CONTAINER'} style={avatarContainerStyle}>
          <Avatar
            alt="Profile Image"
            className={screenStyle?.large}
            src={
              employee?.profile_url ?? 
              'https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png'
            }
          />
        </div>
        { handleFirstSection()}
        { handleSecondSection(employee?.results) }
        { handleThirdSection() }
      </TeamContainer>
    )
  }

  const contentOfThisPage = () => (
    <>
      <Heading style={{
        position: 'absolute',
        top: '0%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.darkGrey
      }}>
        {currentUser?.user?.name}, veja o relatório:
      </Heading>

      <SubHeading style={{
        position: 'absolute',
        top: '10%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.mediumGrey
      }}>
        {employee?.employee}
      </SubHeading>
    
      { handleScreen() }
    </>
  )  
  
  const loadingContainer = () => (
    <SwishSpinner size={200} color="#686769" loading={isLoading} />
  )
 
  return(
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainerEType style={isLoading ? { height: '100vh' } : {}}>
        <BackIcon onClick={_goBack} />
        { isLoading ? loadingContainer() : contentOfThisPage() }
      </MainContainerEType>
    </>
  )
}

export default TeamReportDetail