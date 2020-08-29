import React from "react";
import { LogoContainer } from "./styles";

import MDGroupLogoM from "../../assets/icons/loboMD.png";
import MDGroupLogoL from "../../assets/icons/loboLG.png";

const LogoMD = () => {
  return (
    <LogoContainer>
      <img src={MDGroupLogoM} alt="MDGroup Logo MD"/>
    </LogoContainer>
  );
};

const LogoLG = () => {
  return (
    <LogoContainer>
      <img src={MDGroupLogoL} alt="MDGroup Logo MD" />
    </LogoContainer>
  );
};

export { LogoMD, LogoLG };
