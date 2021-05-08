import React, { useMemo, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import {
  MDCard,
  MDCardBody,

} from './md';

import Button from "../../components/Button/button";
import { Heading, SubHeading, Body } from '../../components/Text/text';

import { useAuth } from '../../hooks/employees/auth';

import {
  ContentContainerForAdmin,
  OfficesContainer,
  ResultsContainer
} from './styles';

const AdminBackOfficeContent = (props) => {

  const { isCEO, isAdministrator } = useAuth();
  
  const offices = useMemo(() => {
    return JSON.parse(localStorage.getItem('offices'));
  }, [localStorage])
  
  const ramMySalary = JSON.parse(localStorage.getItem('myCurrentSalary'))

  const renderOfficeCard = (office) => {

    return (
      <MDCard className={'cardForOffice'}>
        <MDCardBody className={'bodyCardForOffice'}>
          <SubHeading className={'officeName'}>{office?.name}</SubHeading>
          <Heading className={'officeResult'}>{ramMySalary}€</Heading>
        </MDCardBody>
      </MDCard>
    );
  };

  return (
    (isCEO || isAdministrator) ?
      <ContentContainerForAdmin>
        <OfficesContainer>
          { offices?.map((office) => {
            return renderOfficeCard(office);
          })}
        </OfficesContainer>
      </ContentContainerForAdmin>
    :
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <p>Você precisa ser administrador para ver este ecrã.</p>
    </div>        
  );
}

export default AdminBackOfficeContent;