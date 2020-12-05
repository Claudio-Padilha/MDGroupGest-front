import React, { useMemo } from "react";
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

const EmployeeType = (props) => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const cameFromBackOffice = props?.location?.state?.isFromBackOffice;
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;

  const currentOfficeObject = useMemo(() => {
    request.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const allEmployees = useMemo(() => {
    request.getAllEmployees(currentOfficeID)
    
    return JSON.parse(localStorage?.getItem('allEmployees'));
  }, [cameFromBackOffice]);

  const renderManagerCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "manager",
          title: "Criar Gerente",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject
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
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          manager: allEmployees?.manager
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

  const renderTeamLeaderCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "teamLeader",
          title: "Criar Team Leader",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          manager: allEmployees?.manager
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

  const renderInstructorCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "instructor",
          title: "Criar Instrutor",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          teamLeaders: allEmployees?.team_leader
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

  const renderComercialCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "salesPerson",
          title: "Criar Comercial",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          instructors: allEmployees?.instructor
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