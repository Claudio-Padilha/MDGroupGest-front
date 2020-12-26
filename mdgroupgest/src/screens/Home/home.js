import React from "react";
import MenuNavbar from "./menuNavbar";
import BackOfficeHeader from "./backOfficeHeader";

import { MainContainer } from "./styles";

const Home = (props) => {
  console.log(props, 'PROPS DA HOME')

  return (
    <MainContainer>
      <MenuNavbar
        {...props}
      />
      <BackOfficeHeader
        {...props}
      />
    </MainContainer>
  );
};

export default Home;
