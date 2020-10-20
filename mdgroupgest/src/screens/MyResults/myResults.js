import React from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  ResultsContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const MyResults = () => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  // aqui terá a lógica para receber os resultados do funcionário
  const renderResults = () => {
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
            <SubHeading>RESULTADOS</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <ResultsContainer>
        <SecondRow>
          {renderResults()}
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </ResultsContainer>

    </MainContainer>
  );
};

export default MyResults;
