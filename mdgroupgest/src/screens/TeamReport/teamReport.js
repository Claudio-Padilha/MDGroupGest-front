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

const TeamReport = (props) => {
  const history = useHistory()
  
  function _goBack() {
    history.push({
      pathname: '/BackOffice',
      state: {
        fromEmployeeType: true
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
  const fromTeamReportDetail = props?.location?.state?.fromTeamReportDetail

  useEffect(() => {
    if (fromTeamReportDetail) {
      window.location.reload()
    }
  }, [fromTeamReportDetail])
  
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

  const myTeam = useMemo(() => {
    return JSON.parse(localStorage.getItem('myTeamResults'))
  }, [isFromBackOffice, fromTeamReportDetail])

  console.log(myTeam, 'MY TEAM ')
 

  // const reducer = (firstState, action) => {
  //   let reducerState = {}
  //   const stateOnRAM = JSON.parse(localStorage.getItem('exportPaymentSheetState'))

  //   switch (action) {
  //     case 'MAINTAIN_SCREEN_STATE':
  //       reducerState = stateOnRAM
  //   }

  //   localStorage.removeItem('exportPaymentSheetState')
  //   localStorage.setItem('exportPaymentSheetState', JSON.stringify(reducerState))

  //   return reducerState
  // }

  // const [state, dispatch] = useReducer(reducer, initialState)

  // useEffect(() => {
  //   if(wasRefreshed) {
  //     return dispatch('MAINTAIN_SCREEN_STATE')
  //   } else {
  //     return state
  //   }
  // }, [wasRefreshed])

  const renderCard = (employee, i) => {

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

    const darkGrey = CONSTANTS?.colors?.darkGrey
    const rowInfoStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '15vh',
      alignSelf: 'center'
    }

    const linkStyle = {
      marginRight: '1vw',
      marginLeft: '1vw',
      height: '40%',
      width: '25%'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column'
    }

    const row = {
      display: 'flex',
      flexDirection: 'row'
    }

    const avatarContainerStyle = {
      width: '100%',
      justifyContent: 'center',
      display: 'flex',
      marginTop: '2vh'
    }

    const nameStyle = {
      color: darkGrey,
      textAlign: 'center',
      marginBottom: '0'
    }

    const resultStatusStyle = {
      width: total > 0 ? '80%' : '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      display: 'flex',
      height: '5vh',
      marginBottom: '2vh',
    }

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
      <Link style={linkStyle} key={i} to={{
        pathname:"/teamReportDetail",
        state: {
          employee,
          fromTeamReportList: true
        }
      }}>
        <MDCard className={"card"} style={{margin: '1vh'}}>
          <MDCardBody style={{...column, width: '100%'}}>
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

            <div style={{...column, width: '100%'}} className={'LADO ESQUERDO'}>
              <MDRow style={row}>
                <SubHeading style={nameStyle}>{employee?.employee}</SubHeading>
              </MDRow>
              
              {
                total > 0 && 
                <MDRow style={row}>
                  <Body style={{color: darkGrey, marginTop: '15px', marginBottom: '-5px'}}>
                    {'Taxa de anulados'}
                  </Body>
                </MDRow>
              }
              <MDRow style={rowInfoStyle}>
                
                <div style={resultStatusStyle}>
                  <Body style={{color: darkGrey, marginTop: '0', marginBottom: '0'}}>
                    {total > 0 ? `${koPercentage}%` : 'Sem contratos'}
                  </Body>
                  <SubHeading style={{color: darkGrey, marginTop: '0', marginBottom: '0'}}>
                    {resultStatus()}
                  </SubHeading>
                </div>
              </MDRow>
            </div>
          </MDCardBody>
        </MDCard>
        <Body style={{display: 'flex', width: '100%', justifyContent: 'center', marginLeft: '10px'}}>
          Clique para ver detalhes
        </Body>
      </Link>
    )
  }

  const managerAssistants = myTeam?.filter(employee => employee?.job === 'Gerente')
  const teamLeaders = myTeam?.filter(employee => employee?.job === 'Team Leader')
  const instructors = myTeam?.filter(employee => employee?.job === 'Instrutor')
  const salesPersons = myTeam?.filter(employee => employee?.job === 'Comercial')

  console.log(managerAssistants, 'GERENTES');
  console.log(teamLeaders, 'TEAM LEADERS');
  console.log(instructors, 'INSTRUTORES');
  console.log(salesPersons, 'COMERCIAIS');

  const handleScreen = () => {
    const horizontalLine = () => (
      <span>
        <hr style={{
          height:'2px',
          width: '100%',
          borderWidth: '0',
          color: CONSTANTS?.colors?.mediumGrey,
          backgroundColor: CONSTANTS?.colors?.mediumGrey
        }}/>
      </span>
    )

    return (

      <TeamContainer>
        { managerAssistants?.length > 0 &&
          <>
            <Heading style={{ color: CONSTANTS?.colors?.darkGrey }}>
              Gerentes
            </Heading>
            <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
              
              { 
                managerAssistants?.map((employee, i) => {
                  return renderCard(employee, i)
                }) 
              }
            </FirstRow>
          </>
        }  

        { teamLeaders?.length > 0 &&
          <>
            <Heading style={{ color: CONSTANTS?.colors?.darkGrey }}>
              { managerAssistants?.length > 0 && horizontalLine() }
              Team Leaders
            </Heading>
            <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
              { 
                teamLeaders?.map((employee, i) => {
                  return renderCard(employee, i)
                }) 
              }
            </FirstRow>
          </>
        }  

        { instructors?.length > 0 &&
          <>
            <Heading style={{ color: CONSTANTS?.colors?.darkGrey }}>
              { teamLeaders?.length > 0 && horizontalLine() }
              Instrutores
            </Heading>
            <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
              { 
                instructors?.map((employee, i) => {
                  return renderCard(employee, i)
                }) 
              }
            </FirstRow>
          </>
        }  

        { salesPersons?.length > 0 &&
          <>
            <Heading style={{ color: CONSTANTS?.colors?.darkGrey }}>
              { instructors?.length > 0 && horizontalLine() }
              Comerciais
            </Heading>
            <FirstRow style={{flexWrap: 'wrap', height: 'auto', marginBottom: '15vh'}}>
              
              { 
                salesPersons?.map((employee, i) => {
                  return renderCard(employee, i)
                }) 
              }
            </FirstRow>
          </>
        }  
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
        Olá, {currentUser?.user?.name}!
      </Heading>

      <SubHeading style={{
        position: 'absolute',
        top: '10%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.mediumGrey
      }}>
        Veja sua equipa
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

export default TeamReport