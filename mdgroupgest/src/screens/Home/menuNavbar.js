import React, { useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import { MDNavbar, MDDropdown } from './md';

import { SubHeading, Body } from '../../components/Text/text';
import { LogoutIcon } from '../../components/Icon/icons';
import userRequests from '../../hooks/requests/userRequests';

import useLogin from '../../hooks/login';

import {
  ProfileContainer,
  NavbarOptionsContainer,
  LogoutDiv,
  OptionsDiv,
  useStyles,
} from './styles';

export default function MenuNavbar(props) {
  const user = useLogin();
  const userName = user?.user?.name;
  const currentUserIsAdmin = user?.user?.is_admin;

  console.log(props, 'PROPS DA NAVBAR')

  // const currentUserState = useMemo(() => {
  //   if (currentUserIsAdmin) {
  //     return "admin"
  //   } else {
  //     return "manager"
  //   }
  // }, [currentUserIsAdmin]) 

  // const isUserAdmin = useMemo(() => {
  //   return currentUserState === "admin";
  // }, [currentUserState])

  const history = useHistory();
  const avatarClasses = useStyles();

  function _setToAdmin(admin) {
    localStorage.removeItem('isAdmin')
    localStorage.setItem('isAdmin', !admin)
  }

  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))

  function _handleMyProfileNavigation() {
    history.push({
      pathname: "/MyProfile",
      state: {
        data: user
      }
    })
  }

  console.log(window.performance.navigation.type, )

  return (
    <MDNavbar bg="dark" variant="dark" fixed="left">
      <ProfileContainer>
        <Avatar
          alt="Profile Image"
          src={user.user.avatar}
          className={avatarClasses.large}
        />
        <SubHeading isReverseColor={true}>{userName}</SubHeading>
        <Body isSmall isReverseColor onClick={_handleMyProfileNavigation} className={"myProfileLink"}>Ver perfil</Body>
      </ProfileContainer>
      <NavbarOptionsContainer>
        <OptionsDiv>
          {!isAdmin && <Body isReverseColor={true}><Link to="/ChooseTypeOfContract" >Inserir Contrato</Link></Body>}
          
          { !isAdmin &&
            <Body isReverseColor={true}>
              <Link to={{
                pathname: "/EmployeeType",
                state: {
                  isFromBackOffice: true
                }    
              }} >Inserir Funcionário</Link>
            </Body>
          }
          
          { !isAdmin && 
            <Body isReverseColor={true}>
              <Link to={{
                pathname: "/ChooseEmployeeTypeToSee",
                state: {
                  isFromBackOffice: true
                }
              }}
              >Ver Funcionários</Link>
            </Body>
          }

          { !isAdmin && currentUserIsAdmin && 
            <Body isReverseColor={true}>
              <Link onClick={() => _setToAdmin(isAdmin)}>Versão Admin</Link>
            </Body>
          }

          { isAdmin && 
            <Body isReverseColor={true}>
              <Link to="/CreateOffice">Inserir Escritório</Link>
            </Body>
          }

          { isAdmin && 
            <Body isReverseColor={true} style={{marginTop: '-10%'}}>
              <Link onClick={() => _setToAdmin(isAdmin)}>Versão Gerente</Link>
            </Body>
          }
        </OptionsDiv>

        <LogoutDiv>
          <LogoutIcon className={"logoutIcon"} onClick={() => {
              userRequests.logout()
              history.push("/")
            }}
          /> 
        </LogoutDiv>
      </NavbarOptionsContainer>
    </MDNavbar>
  );
}
