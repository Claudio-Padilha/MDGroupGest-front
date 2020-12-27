import React, { useMemo } from 'react';
import BackOfficeContent from './backOfficeContent';
import AdminBackOfficeContent from './adminBackOfficeContent';
import { MDContainer } from './md';
import { useHistory } from 'react-router-dom';

import { SubHeading } from "../../components/Text/text";
import Button from "../../components/Button/button";
import { LogoMD } from '../../components/Logo/logo';

import useLogin from '../../hooks/login';

import { WelcomeWithLogoContainer, LogoContainer } from "./styles";
import {  OfficeIcon } from '../../components/Icon/icons';

export default function BackOfficeHeader(props) {
  const user = useLogin();
  const userName = user?.user?.name;
  // const userTypeCapitalized = user?.user?.user_type.charAt(0).toUpperCase() + user?.user?.user_type.slice(1);
  const userType = user?.user?.user_type;
  const history = useHistory();

  const userTypeInPortuguese = useMemo(() => {
    switch (userType) {
      case "manager":
        return "Gerente"
      case "secretary":
        return "Secretária"
      case "team_leader":
        return "Team Leader"
      case "instructor":
        return "Instrutor"
      case "sales_person":
        return "Comercial"
    
      default:
        return "";
    }
  }, [userType])

  console.log(userType, 'USER TYPE IN ENGLISH')

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  
  return (
    <MDContainer>
      <WelcomeWithLogoContainer>
        <SubHeading>Bem vindo, {userName}!</SubHeading>
        {userType === "admin" && <OfficeIcon onClick={() => console.log('test')}/>}
        <Button
          fullWidth={false}
          disabled={true}
          small={true}
          text={userTypeInPortuguese}
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
