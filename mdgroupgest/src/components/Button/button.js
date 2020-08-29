import React from "react";
import PropTypes from "prop-types";

import { ButtonText } from "../Text/text";
import StyledButton from "./styles";

const Button = ({
  isDisabled,
  btnType,
  text,
  isSmall,
  action,
  fullWidth,
  children
}) => {
  if (text) {
    return (
      <StyledButton
        fullWidth={fullWidth}
        btnType={btnType}
        disabled={isDisabled}
        small={isSmall}
        onClick={action}
      >
        {children}
        {text && <ButtonText>{text}</ButtonText>}
      </StyledButton>
    );
  }
  return <StyledButton />;
};

Button.propTypes = {
  isDisabled: PropTypes.bool,
  action: PropTypes.func,
  isSmall: PropTypes.bool,
  fullWidth: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  btnType: PropTypes.oneOf([
    "primary",
    "secondary"
  ])
};

Button.defaultProps = {
  type: "primary"
};

export default Button;
