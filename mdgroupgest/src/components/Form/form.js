import React, { useRef } from "react";
import PropTypes from "prop-types";

import TextInput from "../TextInput/textInput";
import TextArea from "../TextArea/textArea";
import Button from "../Button/button";

import { FormContainer, StyledForm } from "./styles";

const Form = ({
  onSubmit,
  formFields,
  fullWidth,
  btnLabel,
  children,
  bg
}) => {
  const formRef = useRef();
  return (
    <FormContainer bg={bg}>
      {children}
      <StyledForm fullWidth={fullWidth} ref={formRef} onSubmit={onSubmit}>
        {formFields &&
          formFields.map((field) => {
            return renderFields(field);
          })}
        <Button 
          text={btnLabel}
          btnType="primary"
          action={onSubmit}
        />
      </StyledForm>
    </FormContainer>
  );
};

const renderFields = field => {
  switch (field?.type) {
    case "text":
    case "password":
      return <TextInput key={field.label} {...field} />;
    case "text-area":
      return <TextArea key={field.label} {...field} />;
    default:
      return;
  }
};

Form.prototype = {
  formFields: PropTypes.arrayOf(PropTypes.object)
};

export default Form;
