import React from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import request from '../../components/Form/request';

import {
  MainContainer,
  MyTeamContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const MyTeam = ({ state }) => {
  console.log(state, 'ESTADO DO TIME')
  function _goBack() {
    window.history.back();    
  }

  // aqui terá a lógica para receber os resultados do funcionário
  const renderResults = () => {
    return (
      <Link 
        to={{
          pathname: "/MyTeam",
          state: {
            team: "data"
          }
        }}
      >
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>TESTE</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <MyTeamContainer>
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
      
      </MyTeamContainer>

    </MainContainer>
  );
};

export default MyTeam;
