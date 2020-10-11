import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {
  MDRow,
  MDCol,
  MDCard,
  MDHero,
  MDButton,
  MDDropdown,  
  MDContainer,
  MDList,
  MDListItem,
  MDCardSubtitle,
  MDCardBody, 
  MDCardTitle,
  MDCardFooter,
  MDToggleButton,
  MDToggleButtonGroup
} from './md';

import { Heading, SubHeading, Body } from '../../components/Text/text';

import {
  TeamContainer,
  ContentContainer,
  ResultsContainer, 
  ResultsCard
} from './styles';
import request from '../../components/Form/request';

export default function BackOfficeContent(props) {
  const { destinations, destinationIndex: index } = props;
  const destination = destinations[index];

  const [arrivalSiteIndex, setArrivalSiteIndex] = useState(0);
  const [carrierIndex, setCarrierIndex] = useState(0);
  const [cryoSelection, setCryoSelection] = useState(true);

  useEffect(() => {
    setCarrierIndex(0);
    setArrivalSiteIndex(0);
    setCryoSelection(
      destination.cryoSleep === "optional" ||
        destination.cryoSleep === "required"
    );
  }, [destination]);

  const renderHero = () => {
    request.getEmployees();

    const employees = localStorage.getItem('myTeam');

    return (
      <MDHero>
        <MDContainer>
          <SubHeading>Minha equipe</SubHeading>
          <Link
            to={{
              pathname: "/MyTeam",
              state: {
                team: employees
              }
            }}
          >
            <Body>Wolverines</Body>  
          </Link>       
        </MDContainer>
      </MDHero>
    );
  };

  const renderMyMonth = () => {
    return (
      <MDCard>
        <MDCard.Body className={"cardBody"}>
          <Link
            to={{
              pathname: "/MyMonth",
              state: {
                data: "MÊS"
              }
            }}
          >
            <SubHeading>Meu mês</SubHeading>
          </Link> 
          <Body>1247€</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyContracts = () => {
    return (
      <MDCard isTheMiddleCard>
        <MDCard.Body className={"cardBody"}>
          <Link
            to={{
              pathname: "/ContractList",
              state: {
                data: "CONTRATOS",
              }
            }}
          >
            <SubHeading>Contratos</SubHeading>
          </Link>
          <Heading>284</Heading>
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyResults = () => {
    return (
      <MDCard>
        <MDCard.Body className={"cardBody"}>
          <Link to={{
            pathname:"/MyResults",
            state: {
              data: "RESULTADOS",
            }  
          }}>
            <SubHeading>Meus resultados</SubHeading>   
          </Link>
          <Body>+ 12.4%</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  return (
    <ContentContainer>
      <TeamContainer>{renderHero()}</TeamContainer>
      <ResultsContainer>
        {renderMyMonth()}
        {renderMyContracts()}
        {renderMyResults()}
      </ResultsContainer>
    </ContentContainer>
  );
}
