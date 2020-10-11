import React from "react";
import PropTypes from "prop-types";

import { LogoContainer } from "./styles";

import MDGroupLogoM from "../../assets/icons/loboMD.png";
import MDGroupLogoL from "../../assets/icons/loboLG.png";

const LogoMD = ({ action }) => {
  return (
    <LogoContainer onClick={action} >
      <img src={MDGroupLogoM} alt="MDGroup Logo MD"  />
    </LogoContainer>
  );
};

const LogoLG = ({ action }) => {
  return (
    <LogoContainer onClick={action} >
      <img src={MDGroupLogoL} alt="MDGroup Logo MD" />
    </LogoContainer>
  );
};

// LogoMD.propTypes = { action: PropTypes.func, isAnimated: PropTypes.func };
// LogoLG.propTypes = { action: PropTypes.func, isAnimated: PropTypes.func };

export { LogoMD, LogoLG };
