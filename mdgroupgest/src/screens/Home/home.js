import React, { useState } from "react";
import MenuNavbar from "./menuNavbar";
import BackOfficeHeader from "./backOfficeHeader";
import request from "../../components/Form/request";

import { MainContainer } from "./styles";

const Home = (props) => {

  const [destinationIndex, setDestinationIndex] = useState(0);

  return (
    <MainContainer>
      <MenuNavbar
        {...props}
        destinationIndex={destinationIndex}
        setDestinationIndex={setDestinationIndex}
      />
      <BackOfficeHeader
        {...props}
        destinationIndex={destinationIndex}
        setDestinationIndex={setDestinationIndex}
      />
    </MainContainer>
  );
};

export default Home;
