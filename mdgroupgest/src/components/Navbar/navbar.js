import React from 'react';
import { NavbarContainer } from './styles';

const Navbar = ({
  options,
}) => {

  return (
    <NavbarContainer>

    </NavbarContainer>
  );
}

const renderLinks = (action, link, index) => {
  const linkProps = {
    name: link.name,
  };

  return <p {...linkProps}>{link}</p>
}

export default Navbar;