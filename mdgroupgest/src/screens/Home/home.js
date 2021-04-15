import React from "react";
import MenuNavbar from "./menuNavbar";
import BackOfficeHeader from "./backOfficeHeader";
import { Heading, SubHeading } from "../../components/Text/text";

import { MainContainer, WidthMessageContainer } from "./styles";

const Home = (props) => {

  return (
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer>
        <MenuNavbar
          {...props}
        />
        <BackOfficeHeader
          {...props}
        />
      </MainContainer>
    </>
  );
};

export default Home;
