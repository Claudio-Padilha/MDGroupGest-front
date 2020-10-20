import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import { MDNavbar, MDDropdown } from './md';

import { SubHeading, Body } from '../../components/Text/text';
import { LogoutIcon } from '../../components/Icon/icons';
import request from '../../components/Form/request';

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

  const history = useHistory();
  const avatarClasses = useStyles();

  const renderItem = (destination, index) => {
    return (
      <MDDropdown.Item
        onSelect={() => props.setDestinationIndex(index)}
        key={index}
      >
        {destination.title}
      </MDDropdown.Item>
    );
  };

  return (
    <MDNavbar bg="dark" variant="dark" fixed="left">
      <ProfileContainer>
        <Avatar
          alt="Profile Image"
          src="../../assets/icons/func9.png"
          className={avatarClasses.large}
        />
        <SubHeading isReverseColor={true}>{userName}</SubHeading>
        <Body isSmall isReverseColor>Ver perfil</Body>
      </ProfileContainer>
      <NavbarOptionsContainer>
        <OptionsDiv>
          <Body isReverseColor={true}><Link to="/CreateContract" >Inserir Contrato</Link></Body>
          <Body isReverseColor={true}><Link to="/EmployeeType" >Inserir Funcionário</Link></Body>
          {user?.user?.user_type === "admin" && <Body isReverseColor={true}><Link to="/CreateOffice" >Inserir Escritório</Link></Body>}
        </OptionsDiv>

        <LogoutDiv>
          <LogoutIcon className={"logoutIcon"} onClick={() => {
              request.logout()
              history.push("/")
            }}
          /> 
        </LogoutDiv>

      </NavbarOptionsContainer>

    </MDNavbar>
  );
}
