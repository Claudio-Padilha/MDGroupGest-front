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
  ContentContainer,
  OfficesContainer
} from './styles';

const AdminBackOfficeContent = (props) => {
  const history = useHistory();
  const currentUser = useLogin();
  const currentUserIsAdmin = currentUser?.user?.is_admin;
  const [isAdmin, setIsAdmin] = useState(currentUserIsAdmin);

  const renderOfficeCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Escritório 1</SubHeading>
            <Button
              fullWidth={false}
              disabled={false}
              action={() => {
                history.push({
                  pathname: "/ContractList",
                })
              }}

              small={true}
              text="Ver escritório"
            />
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return (
    isAdmin ?
      <ContentContainer>
        <OfficesContainer>
          {renderOfficeCard()}
        </OfficesContainer>
      </ContentContainer>
    :
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <p>Você precisa ser administrador para ver este ecrã.</p>
    </div>        
  );
}

export default AdminBackOfficeContent;