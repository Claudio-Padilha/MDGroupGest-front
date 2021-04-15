import React, { useMemo, useCallback, useReducer, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  CardsContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  MainContainerEType,
  WidthMessageContainer
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import { useEmployees, useEmployeesActions } from '../../hooks/employees/employees';
import { useAuth } from '../../hooks/employees/auth';
import { useRefresh } from '../../hooks/window/refresh';
import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from '../../hooks/requests/officesRequests';

const ChooseEmployeeTypeToSee = (props) => {
  const history = useHistory()
  
  function _goBack() {
    localStorage.removeItem('chooseEmployeeTypeScreenState')
    history.push({
      pathname: '/BackOffice',
      state: {
        fromEmployeeType: true
      }
    })
  }

  const { wasRefreshed } = useRefresh()

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500]);
  }

  const isFromList = props?.location?.state?.cameFromList;
  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const isFromCreation = props?.location?.state?.cameFromCreation;
  const isFromEdit = props?.location?.state?.cameFromEdit;
  const employeesAfterUpdate = props?.location?.state?.employeesAfterUpdate;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const currentOfficeID = currentUser?.user?.office;

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  function _allEmployees() {
    if(isFromBackOffice || isFromCreation || isFromList) {
      return employeesRequests.getAllEmployees(currentOfficeID)
    } else if (isFromEdit) {
      return employeesAfterUpdate
    }
  }
  _allEmployees()

  const { ceo, administrator, regularManager, regularSecretary, teamLeaders, instructors, comercials } = useEmployees()
  const { isCEO, isRegularManager, isAdministrator, isRegularSecretary } = useAuth()

  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [isFromBackOffice, isFromCreation, isFromEdit])

  let initialState = {
    ceo,
    administrator,
    regularManager, 
    regularSecretary,
    teamLeaders,
    instructors,
    comercials,
    currentOffice: currentOfficeObject
  }

  useEffect(() => {
    if(isFromList) {
      initialState = props?.location?.state?.dataToGoBack
      window.location.reload()
    }
  }, [isFromList])

  if(!wasRefreshed) {
    localStorage.setItem('chooseEmployeeTypeScreenState', JSON.stringify(initialState))
  }

  const reducer = (firstState, action) => {
    let reducerState = {}
    const stateOnRAM = JSON.parse(localStorage.getItem('chooseEmployeeTypeScreenState'))

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM;
    }

    localStorage.removeItem('chooseEmployeeTypeScreenState')
    localStorage.setItem('chooseEmployeeTypeScreenState', JSON.stringify(reducerState))

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

  const renderCEOCard = () => ( 
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "manager",
        title: "CEO",
        data: state?.ceo,
        dataGoingToList: state,
        officeID: currentOfficeID,
        shouldRenderEmployeeAssociation: false,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isCEO && 
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { isAdministrator && // administrator
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>CEO</SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderAdminCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "secretary", // is_admin
        title: "Administrador(a)",
        data: state?.administrator,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isAdministrator && // is_admin
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { isCEO && // ceo
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Administrador(a) </SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderManagerCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "manager",
        title: "Gerente",
        data: state?.regularManager,
        dataGoingToList : currentUser,
        officeID: currentOfficeID,
        shouldRenderEmployeeAssociation: false,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isRegularManager &&
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { (isRegularSecretary || isCEO || isAdministrator) &&
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Gerente</SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderSecretaryCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "secretary", 
        title: "Secretário(a)",
        data: state?.regularSecretary,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isRegularSecretary &&
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { (isCEO || isRegularManager || isAdministrator) &&
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Secretário(a)</SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderTeamLeaderCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "teamLeader",
        title: "Team Leader",
        data: state?.teamLeaders,
        employeeToAssociate: regularManager || ceo,
        shouldRenderEmployeeAssociation: true,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Team Leader</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderInstructorCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "instructor",
        title: "Instrutor(a)",
        data: state?.instructors,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: teamLeaders.concat(regularManager).concat(ceo),
        shouldRenderEmployeeAssociation: true,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Instrutor(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderComercialCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "salesPerson",
        title: "Comercial",
        data: state?.comercials,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: instructors.concat(allEmployees?.manager),
        shouldRenderEmployeeAssociation: true,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Comercial</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const ceoView = () => (
    <CardsContainer>

      <FirstRow ceo>
        {renderCEOCard()}
        {renderAdminCard()}
        {renderManagerCard()}
        {renderSecretaryCard()}
      </FirstRow>
      
      <SecondRow ceo>
        {renderTeamLeaderCard()} 
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const administratorView = () => (
    <CardsContainer>

      <FirstRow administrator >
        {renderAdminCard()}
        {renderManagerCard()}
        {renderSecretaryCard()}      
      </FirstRow>
      
      <SecondRow administrator >
        {renderTeamLeaderCard()}
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const managerAndSecretaryView = () => (
    <CardsContainer>

      <FirstRow>
        {renderManagerCard()}
        {renderSecretaryCard()}
        {renderTeamLeaderCard()}
      </FirstRow>
      
      <SecondRow>
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const handleUserView = useCallback(
    () => {

      if (isCEO) {
        return ceoView()
      } else if (isAdministrator) {
        return administratorView()
      } else if (isRegularManager) {
        return managerAndSecretaryView()
      } else if (isRegularSecretary) {
        return managerAndSecretaryView()
      }
    },
    [currentUser],
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
        top: '7%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.mediumGrey
      }}>
        Que tipo de funcionário queres ver?
      </SubHeading>
    
      { handleUserView(currentUser) }
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
  );
};

export default ChooseEmployeeTypeToSee;