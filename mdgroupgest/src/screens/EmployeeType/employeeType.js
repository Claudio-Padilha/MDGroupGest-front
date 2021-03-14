import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  CardsContainer,
  FirstRow,
  FirstRowForAdmin,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from "../../hooks/requests/officesRequests"; 

const EmployeeType = (props) => {
  function _goBack() {
    window.location.replace('#/BackOffice');    
  }

  const cameFromBackOffice = props?.location?.state?.isFromBackOffice;
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  const currentUser = props?.location?.state?.user;
  const isAdmin = currentUser?.user?.is_admin;
  const fromEmployeeCreation = props?.location?.state?.fromEmployeeCreation;

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const allEmployees = useMemo(() => {
    employeesRequests.getAllEmployees(currentOfficeID)
    
    return JSON.parse(localStorage?.getItem('allEmployees'));
  }, [cameFromBackOffice]);

  const renderManagerCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "manager",
          title: "Criar CEO",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          shouldRenderEmployeeAssociation: false
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>CEO</SubHeading>
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
    );
  };

  const renderTeamLeaderCard = () => {
    return (
      <Link to={{
        pathname:"/CreateEmployee",
        state: {
          userType: "team_leader",
          title: "Criar Gerente",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          employeeToAssociate: allEmployees?.manager,
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Gerente</SubHeading>
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
          title: "Criar Secretário(a)",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          employeeToAssociate: allEmployees?.team_leader.concat(allEmployees?.manager),
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Secretário(a)</SubHeading>
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
          userType: "sales_person",
          title: "Criar Funcionário(a)",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          employeeToAssociate: allEmployees?.instructor.concat(allEmployees?.manager, allEmployees?.team_leader),
          shouldRenderEmployeeAssociation: true
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Funcionário(a)</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <Heading style={{ position: 'absolute', top: '1%', textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)', color: CONSTANTS?.colors?.darkGrey }}>Qual é o tipo de funcionário a ser inserido?</Heading>
      <CardsContainer>

        {isAdmin && <FirstRowForAdmin>
          {renderManagerCard()}
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRowForAdmin>}

        {fromEmployeeCreation && <FirstRowForAdmin>
          {renderManagerCard()}
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRowForAdmin>}

        {!isAdmin && !fromEmployeeCreation && <FirstRow>
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRow>}
        
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