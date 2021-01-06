import React from "react";
import MenuNavbar from "./menuNavbar";
import BackOfficeHeader from "./backOfficeHeader";

import { MainContainer } from "./styles";

const Home = (props) => {

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
