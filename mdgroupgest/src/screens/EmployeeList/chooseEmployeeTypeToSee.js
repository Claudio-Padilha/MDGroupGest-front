import React from "react";
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

  const cameFromList = props?.location?.state?.fromEmployeeList;

  const renderManagerCard = () => {
    if (!cameFromList) {
      request.getEmployees("manager")
    }
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "manager",
          title: "Gerente",
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
    if (!cameFromList) {
      request.getEmployees("secretary")
    }
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "secretary",
          title: "Secretária",
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
    if (!cameFromList) {
      request.getEmployees("salesPerson")
    }
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "salesPerson",
          title: "Comercial",
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
    if (!cameFromList) {
      request.getEmployees("instructor")
    }
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "instructor",
          title: "Instrutor",
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
    if (!cameFromList) {
      request.getEmployees("teamLeader")
    }
    return (
      <Link to={{
        pathname:"/EmployeeList",
        state: {
          userType: "teamLeader",
          title: "Team Leader",
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