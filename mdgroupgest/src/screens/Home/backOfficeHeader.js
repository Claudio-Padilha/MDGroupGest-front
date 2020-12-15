import React, { useState } from 'react';
import BackOfficeContent from './backOfficeContent';
import AdminBackOfficeContent from './adminBackOfficeContent';
import { MDContainer } from './md';
import { useHistory } from 'react-router-dom';

import { SubHeading } from "../../components/Text/text";
import Button from "../../components/Button/button";
import { LogoMD } from '../../components/Logo/logo';

import useLogin from '../../hooks/login';

import { WelcomeWithLogoContainer, LogoContainer } from "./styles";
import { AddIcon, OfficeIcon } from '../../components/Icon/icons';

export default function BackOfficeHeader(props) {
  const user = useLogin();
  const userName = user?.user?.name;
  const userTypeCapilized = user?.user?.user_type.charAt(0).toUpperCase() + user?.user?.user_type.slice(1);
  const history = useHistory();

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  
  return (
    <MDContainer>
      <WelcomeWithLogoContainer>
        <SubHeading>Bem vindo, {userName}!</SubHeading>
        {userTypeCapilized === "Admin" && <OfficeIcon onClick={() => console.log('test')}/>}
        <Button
          fullWidth={false}
          disabled={true}
          small={true}
          text={userTypeCapilized}
        />
        <LogoContainer><LogoMD /></LogoContainer>
      </WelcomeWithLogoContainer>
    
      {isAdmin ? 
        <AdminBackOfficeContent {...props}/>
        :
        <BackOfficeContent {...props} />
      }
    </MDContainer>
  );
}
