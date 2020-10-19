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
  children, 
  type,
  className
}) => {
  if (text) {
    return (
      <StyledButton
        type={type}
        fullWidth={fullWidth}
        btnType={btnType}
        disabled={isDisabled}
        small={isSmall}
        onClick={action}
        className={className}
      >
        {children}
        {text && <ButtonText>{text}</ButtonText>}
      </StyledButton>
    );
  }
  return <StyledButton />;
};

Button.propTypes = {
  type: PropTypes.string,
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
