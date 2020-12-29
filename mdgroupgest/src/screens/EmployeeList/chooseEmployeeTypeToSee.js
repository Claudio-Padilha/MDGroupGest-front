import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  CardsContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  MainContainerEType
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import request from '../../components/Form/request';

import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from '../../hooks/requests/officesRequests';

const ChooseEmployeeTypeToSee = (props) => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const isFromCreation = props?.location?.state?.cameFromCreation;
  const isFromEdit = props?.location?.state?.cameFromEdit;
  const employeesAfterUpdate = props?.location?.state?.employeesAfterUpdate;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const currentOfficeID = currentUser?.user?.office;

  function _allEmployees() {
    if(isFromBackOffice || isFromCreation) {
      return employeesRequests.getAllEmployees(currentOfficeID)
    } else if (isFromEdit) {
      return employeesAfterUpdate
    }
  }
  _allEmployees()

  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [isFromBackOffice, isFromCreation, isFromEdit])

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const renderManagerCard = () => {
    const managers = allEmployees?.manager
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "manager",
          title: "Gerente",
          data: managers,
          dataGoingToList : currentUser,
          officeID: currentOfficeID,
          shouldRenderEmployeeAssociation: false
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
          { currentUser?.user?.user_type === "manager" &&
            <>
              <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
              <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
            </>
          }

          { currentUser?.user?.user_type === "secretary" &&
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Gerente </SubHeading>
          }
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderSecretaryCard = () => {
    const secretaries = allEmployees?.secretary
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "secretary",
          title: "Secretária",
          data: secretaries,
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          shouldRenderEmployeeAssociation: false
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
          { currentUser?.user?.user_type === "secretary" &&
            <>
              <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
              <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
            </>
          }

          { currentUser?.user?.user_type === "manager" &&
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Secretária </SubHeading>
          }
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderTeamLeaderCard = () => {
    const teamLeaders = allEmployees?.team_leader
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "teamLeader",
          title: "Team Leader",
          data: teamLeaders,
          employeeToAssociate: allEmployees?.manager,
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Team Leader</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderInstructorCard = () => {
    const instructors = allEmployees?.instructor
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "instructor",
          title: "Instrutor",
          data: instructors,
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          employeeToAssociate: allEmployees?.team_leader.concat(allEmployees?.manager),
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Instrutor</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderComercialCard = () => {
    const salesPersons = allEmployees?.sales_person
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "salesPerson",
          title: "Comercial",
          data: salesPersons,
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          employeeToAssociate: allEmployees?.instructor.concat(allEmployees?.manager, allEmployees?.team_leader),
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Comercial</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainerEType>
      <BackIcon onClick={_goBack} />
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

    </MainContainerEType>
  );
};

export default ChooseEmployeeTypeToSee;