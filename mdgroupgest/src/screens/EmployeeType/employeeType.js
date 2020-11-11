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
import request from "../../components/Form/request";

const EmployeeType = () => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function offices() {
    request.getOffices()
    const officesList = JSON.parse(localStorage.getItem('offices'));

    return officesList?.map(office => {
      return {
        value: office?.id,
        label: office?.name
      }
    })
  }

  console.log(offices(), 'lista de offices')

  const renderManagerCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "manager",
          title: "Criar Gerente",
          officesList: offices()
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
          officesList: offices()
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
          officesList: offices()
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
          officesList: offices()
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
          officesList: offices()
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