import React from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  MyMonthContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const MyMonth = () => {
  function _goBack() {
    window.history.back();    
  }

  // aqui terá a lógica do mês de cada um
  const renderMyMonth = () => {
    return (
      <Link to={{
        pathname:"/MyMonth",
        state: {
          data: "MEU MÊS",
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
      <MyMonthContainer>
        <SecondRow>
          {renderMyMonth()}
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </MyMonthContainer>

    </MainContainer>
  );
};

export default MyMonth;
