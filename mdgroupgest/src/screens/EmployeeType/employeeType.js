import React from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  CardsContainer,
  FirstRow,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';



const EmployeeType = () => {
  function _goBack() {
    window.history.back();    
  }

  const renderManagerCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "manager",
          title: "Criar Gerente",
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
        pathname:"/CreateEmployee",
        state: {
          userType: "secretary",
          title: "Criar Secretária",
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
        pathname:"/CreateEmployee",
        state: {
          userType: "salesPerson",
          title: "Criar Comercial",
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
        pathname:"/CreateEmployee",
        state: {
          userType: "instructor",
          title: "Criar Instrutor",
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
        pathname:"/CreateEmployee",
        state: {
          userType: "teamLeader",
          title: "Criar Team Leader",
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
    <MainContainer>
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
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </CardsContainer>

    </MainContainer>
  );
};

export default EmployeeType;