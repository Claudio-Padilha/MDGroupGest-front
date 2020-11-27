import React, { useMemo } from "react";
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

  console.log(props, 'props para ver') 

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const isFromCreation = props?.location?.state?.cameFromCreation;

  const allEmployees = useMemo(() => {
    console.log('entrei desde deletion')
    request.getAllEmployees()
    
    return JSON.parse(localStorage?.getItem('allEmployees'));
  }, [isFromBackOffice, isFromCreation]);

  console.log(allEmployees, 'VER EMPLOYEES')

  const renderManagerCard = () => {
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "manager",
          title: "Gerente",
          data: allEmployees?.manager
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
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "secretary",
          title: "Secretária",
          data: allEmployees?.secretary
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
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "salesPerson",
          title: "Comercial",
          data: allEmployees?.sales_person
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
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "instructor",
          title: "Instrutor",
          data: allEmployees?.instructor
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
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "teamLeader",
          title: "Team Leader",
          data: allEmployees?.team_leader
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