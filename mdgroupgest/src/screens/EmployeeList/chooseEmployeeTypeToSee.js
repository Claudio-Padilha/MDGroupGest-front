import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

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

const ChooseEmployeeTypeToSee = (props) => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const isFromCreation = props?.location?.state?.cameFromCreation;
  const isFromEdit = props?.location?.state?.cameFromEdit;

  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;

  // const allEmployees = useMemo(() => {
  //   request.getAllEmployees(currentOfficeID)

  //   const employees = JSON.parse(localStorage?.getItem('allEmployees'));
    
  //   return employees;
  // }, [isFromBackOffice, isFromCreation, isFromEdit]);

  function _allEmployees() {
    if(isFromBackOffice || isFromCreation || isFromEdit) {
      request.getAllEmployees(currentOfficeID)
    }
    
    return JSON.parse(localStorage.getItem('allEmployees'))
  }

  const renderManagerCard = () => {
    const managers = _allEmployees()?.manager
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "manager",
          title: "Gerente",
          data: managers
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Gerente</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderSecretaryCard = () => {
    const secretaries = _allEmployees()?.secretary
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "secretary",
          title: "Secretária",
          data: secretaries
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Secretária</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderComercialCard = () => {
    const salesPersons = _allEmployees()?.sales_person
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "salesPerson",
          title: "Comercial",
          data: salesPersons
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Comercial</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderInstructorCard = () => {
    const instructors = _allEmployees()?.instructor
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "instructor",
          title: "Instrutor",
          data: instructors
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Instrutor</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderTeamLeaderCard = () => {
    const teamLeaders = _allEmployees()?.team_leader
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "teamLeader",
          title: "Team Leader",
          data: teamLeaders
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Team Leader</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainerEType>
      <BackIcon onClick={_goBack} />
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