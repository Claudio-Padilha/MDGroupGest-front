import React from "react";
import PropTypes from "prop-types";

import { ErrorText, Body } from "../Text/text";
import { StyledTextArea, TextAreaContainer } from "./styles";

const TextArea = ({ 
  error,
  placeholder,
  defaultValue,
  label,
  onChange,
  type
}) => (
  <TextAreaContainer error={error}>
    {label && <Body>{label}</Body>}
    <StyledTextArea
      resize={false}
      error={error}
      placeholder={placeholder}
      onChange={onChange}
      type={type}
    ></StyledTextArea>
    {error && <ErrorText>{error}</ErrorText>}
  </TextAreaContainer>
);

TextArea.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};

export default TextArea;
