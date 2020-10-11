import React from 'react';
import { Link } from 'react-router-dom';
import { MDNavbar, MDNav, MDDropdown } from './md';
import { SubHeading, Body } from '../../components/Text/text';
import { ProfileContainer, NavbarOptionsContainer } from './styles';

import useLogin from '../../hooks/login';

export default function MenuNavbar(props) {
  const user = useLogin();
  const userName = user?.user?.name;

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
        <SubHeading isReverseColor={true}>{userName}</SubHeading>
        <Body isSmall isReverseColor>Ver perfil</Body>
      </ProfileContainer>
      <NavbarOptionsContainer>
        <Body isReverseColor={true}><Link to="/CreateContract" >Inserir Contrato</Link></Body>
        <Body isReverseColor={true}><Link to="/EmployeeType" >Inserir Funcionário</Link></Body>
        {user?.user?.user_type === "admin" && <Body isReverseColor={true}><Link to="/CreateOffice" >Inserir Escritório</Link></Body>}
        
        <Body isReverseColor={true}>Opção 4</Body>
      </NavbarOptionsContainer>

    </MDNavbar>
  );
}
