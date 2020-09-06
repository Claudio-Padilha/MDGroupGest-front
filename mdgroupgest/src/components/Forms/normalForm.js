import React, { useRef } from "react";
import PropTypes from "prop-types";

import TextInput from "../TextInput/textInput";
import TextArea from "../TextArea/textArea";
import TextWithCalendar from "../TextWithCalendar/textWithCalendar";
import Button from "../Button/button";

import { StyledForm, MainFormContainer } from "./styles";
import SwitchButton from "../ToggleComponent/toggleButton";

const Form = ({
  onSubmit,
  formFields,
  fullWidth,
  btnLabel,
  children,
  bg,
  formFieldsPaginated
}) => {
  const formRef = useRef();
  const firstHalfFields = formFieldsPaginated?.slice(0, 3);
  const secondHalfFields = formFieldsPaginated?.slice(3, 6);

  return (
    <MainFormContainer bg={bg}>
      {children}
      <StyledForm fullWidth={fullWidth} ref={formRef} onSubmit={onSubmit}>
        {formFieldsPaginated && 
          firstHalfFields.map((field) => {
            return renderFields(field);
          })
        }
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
    </MainFormContainer>
  );
};

const renderFields = field => {
  switch (field?.type) {
    case "text":
    case "password":
      return <TextInput key={field.label} {...field} />;
    case "date-field":
      return <TextWithCalendar key={field.label} {...field} />;
    case "text-area":
      return <TextArea key={field.label} {...field} />;
    case "boolean":
      return <SwitchButton labelName={field.labelName} />;
    default:
      return;
  }
};

Form.prototype = {
  formFields: PropTypes.arrayOf(PropTypes.object)
};

export default Form;
