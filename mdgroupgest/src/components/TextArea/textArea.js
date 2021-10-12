import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { ErrorText, Body } from '../Text/text'
import { StyledTextArea, TextAreaContainer } from './styles'

const TextArea = ({ 
  error,
  placeholder,
  defaultValue,
  label,
  onChange,
  type,
  ...otherProps
}) => {
  // eslint-disable-next-line no-unused-vars
  const [inputType, setInputType] = useState(type || 'text-area')

  return (
    <TextAreaContainer error={error}>
      {label && <Body>{label}</Body>}
      <StyledTextArea
        resize={false}
        error={error}
        placeholder={placeholder}
        onChange={onChange}
        type={inputType}
        {...otherProps}
      ></StyledTextArea>
      {error && <ErrorText>{error}</ErrorText>}
    </TextAreaContainer>
  )
}

TextArea.propTypes = {
  error: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
}

export default TextArea
