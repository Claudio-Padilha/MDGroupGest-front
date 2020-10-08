import React from "react";
import { Link } from "react-router-dom";

import { MainContainer, CardsContainer } from "./styles";
import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

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
      <MDCard>
        <MDCardBody>
          <SubHeading>Gerente</SubHeading>
          <Body>
            <Link to={{
              pathname:"/CreateEmployee",
              state: {
                userType: "manager",
                title: "Criar Gerente",
              }  
            }}>
              <MDButton>Inserir</MDButton>
            </Link>
          </Body>
        </MDCardBody>
      </MDCard>
    );
  };

  const renderSecretaryCard = () => {
    return (
      <MDCard>
        <MDCardBody>
          <SubHeading>Secretária</SubHeading>
          <Body>
            <Link to={{
              pathname:"/CreateEmployee",
              state: {
                userType: "secretary",
                title: "Criar Secretária",
              }  
            }}>
              <MDButton>Inserir</MDButton>
            </Link>
          </Body>
        </MDCardBody>
      </MDCard>
    );
  };

  const renderComercialCard = () => {
    return (
      <MDCard>
        <MDCardBody>
          <SubHeading>Comercial</SubHeading>
          <Body>
            <Link to={{
              pathname:"/CreateEmployee",
              state: {
                userType: "salesPerson",
                title: "Criar Comercial",
              }  
            }}>
              <MDButton>Inserir</MDButton>
            </Link>
          </Body>
        </MDCardBody>
      </MDCard>
    );
  };

  const renderInstructorCard = () => {
    return (
      <MDCard>
        <MDCardBody>
          <SubHeading>Instrutor</SubHeading>
          <Body>
            <Link to={{
              pathname:"/CreateEmployee",
              state: {
                userType: "instructor",
                title: "Criar Instrutor",
              }  
            }}>
              <MDButton>Inserir</MDButton>
            </Link>
          </Body>
        </MDCardBody>
      </MDCard>
    );
  };

  const renderTeamLeaderCard = () => {
    return (
      <MDCard>
        <MDCardBody>
          <SubHeading>Team Leader</SubHeading>
          <Body>
            <Link to={{
              pathname:"/CreateEmployee",
              state: {
                userType: "teamLeader",
                title: "Criar Team Leader",
              }  
            }}>
              <MDButton>Inserir</MDButton>
            </Link>
          </Body>
        </MDCardBody>
      </MDCard>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <CardsContainer>
        {renderManagerCard()}
        {renderSecretaryCard()}
        {renderTeamLeaderCard()}
        {renderInstructorCard()}
        {renderComercialCard()}
      </CardsContainer>

    </MainContainer>
  );
};

export default EmployeeType;