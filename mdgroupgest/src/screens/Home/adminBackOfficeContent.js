import React, { useMemo, useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import {
  MDCard,
  MDCardBody,

} from './md';

import Button from "../../components/Button/button";
import { Heading, SubHeading, Body } from '../../components/Text/text';

import useLogin from '../../hooks/login';

import {
  ContentContainerForAdmin,
  OfficesContainer,
  ResultsContainer
} from './styles';

import officesRequests from '../../hooks/requests/officesRequests'

const AdminBackOfficeContent = (props) => {
  const currentUser = useLogin();
  const currentUserIsAdmin = currentUser?.user?.is_admin;
  const [isAdmin, setIsAdmin] = useState(currentUserIsAdmin);

  async function _getOffices() {
    await officesRequests.getOffices()
  }

  _getOffices()
  
  const offices = useMemo(() => {
    return JSON.parse(localStorage.getItem('offices'));
  }, [localStorage])

  console.log(offices, 'OFFICES')

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
    isAdmin ?
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