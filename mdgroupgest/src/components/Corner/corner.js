import React from "react";
import { CornerContainer, CornerContainer180 } from "./styles";
import CornerPath from "../../assets/icons/cornerGrey.png";

const Corner = () => {
  return (
    <CornerContainer>
      <img src={CornerPath} alt="Corner Right"/>
    </CornerContainer>
  );
};

const Corner180 = () => {
  return (
    <CornerContainer180>
      <img src={CornerPath} alt="Corner Left"/>
    </CornerContainer180>
  );
};

export { Corner, Corner180 };
