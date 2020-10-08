import React from 'react';
import BackOfficeContent from './backOfficeContent';
import { MDContainer, MDRow, MDCol } from './md';
import { useHistory } from 'react-router-dom';

import { SubHeading } from "../../components/Text/text";
import Button from "../../components/Button/button";
import { LogoMD } from '../../components/Logo/logo';

import useLogin from '../../hooks/login';

import { WelcomeWithLogoContainer, LogoContainer } from "./styles";
import request from '../../components/Form/request';

export default function BackOfficeHeader(props) {
  const user = useLogin();
  const userName = user?.user?.name;
  const userType = user?.user?.user_type.charAt(0).toUpperCase() + user?.user?.user_type.slice(1);
  const history = useHistory();

  return (
    <MDContainer>
      <WelcomeWithLogoContainer>
        <SubHeading>Bem vindo, {userName}!</SubHeading>
        <Button
          fullWidth={false}
          disabled={false}
          action={() => {
            request.logout()
            history.push("/")
          }}
          small={true}
          text={true}
        >
          <SubHeading isReverseColor={true}>{userType}</SubHeading>
        </Button>
        <LogoContainer><LogoMD /></LogoContainer>
      </WelcomeWithLogoContainer>
  
      <BackOfficeContent {...props} />
    </MDContainer>
  );
}
