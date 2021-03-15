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

import officesRequests from '../../hooks/requests/officesRequests'

const AdminBackOfficeContent = (props) => {

  const { isCEO } = useAuth();

  async function _getOffices() {
    await officesRequests.getOffices()
  }

  _getOffices()
  
  const offices = useMemo(() => {
    return JSON.parse(localStorage.getItem('offices'));
  }, [localStorage])

  const renderOfficeCard = (office) => {
    return (
      <MDCard className={'cardForOffice'}>
        <MDCardBody className={'bodyCardForOffice'}>
          <SubHeading className={'officeName'}>{office?.name}</SubHeading>
          <Heading className={'officeResult'}>3453€</Heading>
        </MDCardBody>
      </MDCard>
    );
  };

  return (
    isCEO ?
      <ContentContainerForAdmin>
        <OfficesContainer className={"TESTEZAAAAACO"}>
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