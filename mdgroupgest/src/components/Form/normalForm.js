import React, { Children } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import TextInput from "../../components/TextInput/textInput";
import { Row } from "../../components/Layout/layout";
import TextArea from "../../components/TextArea/textArea";
import Select from "../../components/Select/select";
import Button from "../../components/Button/button";
import { FormContainer, StyledForm } from "./styles";
import TextWithCalendar from "../TextWithCalendar/textWithCalendar";
import SwitchButton from "../ToggleComponent/toggleButton";

const Form = ({ formFields, btnLabel, bg, isFullWidth, children, onSubmit }) => {
  const getInitialValues = () => {
    const initialValues = {};
    const keys = formFields && Object.keys(formFields);
    keys.forEach((i) => {
      const formField = formFields[i];
      initialValues[formField.key] = formField.value;
    });

    return initialValues;
  };

  return (
    <FormContainer bg={bg}>
      {children}
      <Formik
        initialValues={getInitialValues()}
        onSubmit={onSubmit}
      >
        {
          props => (
            <StyledForm onSubmit={props.handleSubmit}>
              {formFields &&
                formFields.map((field, index) => {
                  return renderFields(field, index, props);
                })}
              <Row justify={isFullWidth ? "center" : "flex-start"}>
                <Button
                  type="submit"
                  isFullWidth={isFullWidth}
                  btnType="primary"
                  text={btnLabel}
                />
              </Row>
            </StyledForm>
          )
        }
      </Formik>
    </FormContainer>
  );
};

const renderFields = (field, index, formik) => {
  const fieldProps = {
    key: `${field.key}-${index}`,
    name: field.key,
    value: formik.values[field.key],
    error: formik.errors[field.key],
    label: field.question,
    type: field.type,
    onChange: formik.handleChange
  };

  switch (field?.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return <TextInput {...fieldProps} />;
    case "text-area":
      return <TextArea {...fieldProps} />;
    case "dropdown":
      return (
        <Select
          onChange={option => {
            formik.setFieldValue(field.key, option.value);
          }}
          options={field.options}
          type="select"
          isMulti={field.multi}
          label={field.question}
        />
      );
    case "date":
      return <TextWithCalendar key={field.label} /> ;  
    case "toggle":
      return <SwitchButton {...fieldProps} />;
    default:
      return;
  }
};

Form.defaultProps = {
  btnLabel: "Inscrever-se"
};

Form.propTypes = {
  formFields: PropTypes.array,
  bg: PropTypes.string,
  btnLabel: PropTypes.string,
  handleSubmit: PropTypes.func,
  isFullWidth: PropTypes.bool,
  children: PropTypes.node
};

export default Form;
