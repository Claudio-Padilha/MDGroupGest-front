import React, { useMemo, useCallback } from "react"
import { Link, Redirect } from "react-router-dom"

import { Heading, SubHeading, Body } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import CONSTANTS from '../../constants'

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md'

import { useAuth } from '../../hooks/employees/auth'
import { useEmployees } from '../../hooks/employees/employees'
import employeesRequests from "../../hooks/requests/employeesRequests"
import officesRequests from "../../hooks/requests/officesRequests" 
import { GoHomeButton } from "../EmployeeList/styles"

import {
  MainContainer,
  CardsContainer,
  FirstRow,
  SecondRow,
  WidthMessageContainer
} from "./styles"

const EmployeeType = (props) => {
  function _goBack() {
    window.location.replace('#/BackOffice')
  }

  const isFromBackOffice = props?.location?.state?.isFromBackOffice
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office
  const currentUser = props?.location?.state?.user

  const { isCEO, isRegularManager, isAdministrator, isRegularSecretary } = useAuth()
  const {
    regularManager,
    managerAssistants,
    teamLeaders, 
    instructors,
  } = useEmployees()

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const _allEmployees = useCallback(() => {
    return employeesRequests.getAllEmployees(currentOfficeID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFromBackOffice])

  _allEmployees()

  const renderAdminCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "admin",
        title: "Criar Administrador(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Administrador(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderManagerCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "manager",
        title: "Criar Empresário",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Empresário</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderSecretaryCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "secretary",
        title: "Criar Secretário(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Secretário(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderComercialCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "sales_person",
        title: "Criar Comercial",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: regularManager?.concat(managerAssistants, teamLeaders, instructors),
        shouldRenderEmployeeAssociation: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Comercial</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  )
    // ceo e admin deverão ver um shouldShowOffice assim como employeeToAssociate
  const ceoView = () => (
    <CardsContainer>
      <FirstRow ceo>
        {renderAdminCard()}
        {renderManagerCard()}
        
      </FirstRow>

      <SecondRow ceo>
        {renderSecretaryCard()}
        {renderComercialCard()}
      </SecondRow>

      <GoHomeButton style={{alignSelf: 'center' }}>
        <Body>
          <Link to={"/BackOffice"}>
            <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
          </Link>
        </Body>
      </GoHomeButton>

    </CardsContainer>
  )

  const administratorView = () => (
    <CardsContainer>
      <FirstRow admin>
        {renderManagerCard()}
        {renderSecretaryCard()}
      </FirstRow>

      <SecondRow admin>
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
      
    </CardsContainer>
  )

  const managerView = () => (
    <CardsContainer>

      <FirstRow>
        {renderSecretaryCard()}
        {renderComercialCard()}
      </FirstRow>
      
      <SecondRow>
        
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  function _navigateToEmployeeForm() {
    return (
      <Redirect
        to={{
          pathname: "/CreateEmployee",
          state: {
            userType: "sales_person",
            title: "Criar Comercial",
            officeID: currentOfficeID,
            officeOBJ: currentOfficeObject,
            shouldGoToBackOffice: true,
            employeeToAssociate: regularManager?.concat(teamLeaders, instructors),
            shouldRenderEmployeeAssociation: true
          }  
        }}
      />
    )
  }
  
  const handleUserView = useCallback(
    () => {
      if(isCEO) {
        return ceoView()
      } else if (isAdministrator) {
        return administratorView()
      } else if (isRegularManager) {
        return managerView()
      } else if (isRegularSecretary) {
        return _navigateToEmployeeForm()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser],
  )

  return(
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer>
        <BackIcon onClick={_goBack} />
        <Heading style={
          {
            position: 'absolute',
            top: '1%',
            textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
            color: CONSTANTS?.colors?.darkGrey
          }
        }>
          Qual é o tipo de colaborador a ser inserido?
        </Heading>
        { handleUserView(currentUser) }
      </MainContainer>
    </>
  )
}

export default EmployeeType