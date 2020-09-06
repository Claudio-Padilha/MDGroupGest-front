import React from "react";
import PropTypes from "prop-types";

import { ErrorText, Body } from "../Text/text";
import StyledSelect, { SelectContainer, selectStyles } from "./styles";

const Select = ({
  error,
  placeholder,
  options = [],
  label,
  onChange,
  isDisabled,
  isMulti,
  defaultValue
}) => {
  // TODO Add different color to placeholder
  return (
    <SelectContainer error={error}>
      {label && <Body>{label}</Body>}
      <StyledSelect
        onChange={onChange}
        isDisabled={isDisabled}
        styles={selectStyles}
        isMulti={isMulti}
        options={options}
        error={error}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </SelectContainer>
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  isMulti: PropTypes.bool,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
};

export default Select;
