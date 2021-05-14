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
  }, [isFromBackOffice])

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
    const darkGrey = CONSTANTS?.colors?.darkGrey
    const rowInfoStyle = {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '15vh',
      alignSelf: 'center'
    }
    const linkStyle = {
      marginRight: '1vw',
      marginLeft: '1vw',
      height: '40%',
      width: '30%'
    }

    const column = {
      display: 'flex',
      flexDirection: 'column'
    }

    const row = {
      display: 'flex',
      flexDirection: 'row'
    }

    return (
      <Link style={linkStyle} key={i} to={{
        pathname:"/",
        state: {
          teste: "Teste"
        }
      }}>
        <MDCard className={"card"} style={{margin: '1vh'}}>
          <MDCardBody style={{...row, width: '100%'}}>
            <div className={'AVATAR CONTAINER'} style={{
              width: '30%',
              justifyContent: 'center',
              display: 'flex',
            }}>
              <Avatar
                alt="Profile Image"
                className={screenStyle?.large}
                src={employee?.profile_url ?? 'https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png'}
              />
            </div>

            <div style={{...column, width: '70%'}} className={'LADO ESQUERDO'}>
              <SubHeading style={{color: darkGrey, textAlign: 'center', marginBottom: '0'}}>{employee?.employee}</SubHeading>

              <MDRow style={rowInfoStyle}>
                <SubHeading style={{color: darkGrey}}>723€</SubHeading>
                <div style={{marginLeft: '15px'}}>
                  <SubHeading style={{color: darkGrey, marginBottom: '0'}}>🔴</SubHeading>
                  <Body style={{color: darkGrey, marginTop: '0'}}>32%</Body>
                </div>
              </MDRow>
            </div>
          </MDCardBody>
        </MDCard>
      </Link>
    )
  };

  const handleScreen = () => (
    <TeamContainer>
      <FirstRow style={{flexWrap: 'wrap', height: 'auto'}}>
        { myTeam && 
          myTeam?.map((employee, i) => {
            return renderCard(employee, i)
          }) 
        }
      </FirstRow>    
    </TeamContainer>
  )

  
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
        Sua equipa
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
      <MainContainerEType>
        <BackIcon onClick={_goBack} />
        { isLoading ? loadingContainer() : contentOfThisPage() }
      </MainContainerEType>
    </>
  )
}

export default TeamReport