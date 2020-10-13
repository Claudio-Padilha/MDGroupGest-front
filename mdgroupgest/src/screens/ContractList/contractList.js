import React from "react";
import { Link } from "react-router-dom";

import { SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  ContractsContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const ContractList = () => {
  function _goBack() {
    window.history.back();    
  }

  // aqui terá a lógica para receber a lista de contratos e mostrar isso
  const renderContracts = () => {
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
            <SubHeading>Contrato 1</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <ContractsContainer>
        <SecondRow>
          {renderContracts()}
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </ContractsContainer>

    </MainContainer>
  );
};

export default ContractList;
