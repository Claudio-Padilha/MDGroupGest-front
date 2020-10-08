import React, { useState, useEffect } from 'react';
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
    return (
      <MDHero>
        <h2>{destination.header}</h2>
        <p>{destination.subHeader}</p>
      </MDHero>
    );
  };

  const renderMyMonth = () => {
    return (
      <MDCard>
        <MDCardBody>
          <SubHeading>Meu mês</SubHeading>
          <Body>1247€</Body>
        </MDCardBody>
      </MDCard>
    );
  };

  const renderMyContracts = () => {
    return (
      <MDCard isTheMiddleCard>
        <MDCard.Body>
          <SubHeading>Contratos</SubHeading>
          <Heading>284</Heading>
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyResults = () => {
    return (
      <MDCard>
        <MDCard.Body>
          <SubHeading>Meus resultados</SubHeading>
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
