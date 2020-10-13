import React from 'react';
import BackOfficeContent from './backOfficeContent';
import { MDContainer } from './md';
import { useHistory } from 'react-router-dom';

import { SubHeading } from "../../components/Text/text";
import Button from "../../components/Button/button";
import { LogoMD } from '../../components/Logo/logo';

import useLogin from '../../hooks/login';

import { WelcomeWithLogoContainer, LogoContainer } from "./styles";
import request from '../../components/Form/request';
import { AddIcon, OfficeIcon } from '../../components/Icon/icons';

export default function BackOfficeHeader(props) {
  const user = useLogin();
  const userName = user?.user?.name;
  const userType = user?.user?.user_type.charAt(0).toUpperCase() + user?.user?.user_type.slice(1);
  const history = useHistory();

  function _insertContract() {
    history.push("/CreateContract");
  }
  
  return (
    <MDContainer>
      <WelcomeWithLogoContainer>
        <SubHeading>Bem vindo, {userName}!</SubHeading>
        {userType === "Admin" && <OfficeIcon onClick={() => console.log('test')}/>}
        <Button
          fullWidth={false}
          disabled={true}
          small={true}
          text={userType}
        />
        <AddIcon onClick={_insertContract} className={"addIcon"}/>
        <LogoContainer><LogoMD /></LogoContainer>
      </WelcomeWithLogoContainer>
  
      <BackOfficeContent {...props} />
    </MDContainer>
  );
}
