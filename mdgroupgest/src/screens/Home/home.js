import React, { useState } from "react";
import MenuNavbar from "./menuNavbar";
import BackOfficeHeader from "./backOfficeHeader";
import { Link } from 'react-router-dom';

import { MainContainer } from "./styles";

export default function Home(props) {


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
}

