import React, { useState } from 'react';
import { Form, Col, InputGroup } from 'react-bootstrap';
import { Formik } from 'formik';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { ErrorText, Body } from '../Text/text';

import TextInput from "../../components/TextInput/textInput";
import { Row } from "../../components/Layout/layout";
import TextArea from "../../components/TextArea/textArea";
import Select from "../../components/Select/select";
import Button from "../../components/Button/button";
import TextWithCalendar from "../TextWithCalendar/textWithCalendar";
import SwitchButton from "../ToggleComponent/toggleButton";
import { Heading, SubHeading } from "../Text/text";

import { CFormContainer, StyledForm, WidthMessageContainer} from "./styles";



const CForm = ({
  formFields,
  btnLabel,
  bg,
  onSubmit,
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  isValid,
  errors,
  children,
  isFullWidth,
  initialValue,
  subType,
  place
}) => {

  const getInitialValues = () => {
    const initialValues = {};
    const keys = formFields && Object.keys(formFields);
    keys.forEach((i) => {
      const formField = formFields[i];
      initialValues[formField.key] = formField.initialValue;
    });

    return initialValues;
  }

  return (
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <CFormContainer>
        {children}
        <Formik 
          initialValues={ getInitialValues() }
          onSubmit={onSubmit}
        >
          {
            props => (
              <StyledForm onSubmit={props.handleSubmit}>
                <div>
                  {formFields &&
                    formFields.map((field, index) => {
                      return renderFields(field, index, props);
                    })}
                </div>
  
                <Button
                  type="submit"
                  isFullWidth={isFullWidth}
                  btnType="primary"
                  text={btnLabel}
                />
              </StyledForm>
            )
          }
          {/* <Form noValidate onSubmit={handleSubmit}>

            <Form.Row>

              <Form.Group as={Col} md="4" controlId="validationFormik101">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={values?.firstName}
                  onChange={handleChange}
                  isValid={touched?.firstName && !errors?.firstName}
                />
              </Form.Group>

            </Form.Row>

            <Form.Row>

              <Form.Group as={Col} md="3" controlId="validationFormik105">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={values?.zip}
                  onChange={handleChange}
                  isInvalid={!!errors?.zip}
                />

                <Form.Control.Feedback type="invalid" tooltip>
                  {errors?.zip}
                </Form.Control.Feedback>
              </Form.Group>

            </Form.Row>

            <Form.Group>
              <Form.File
                className="position-relative"
                required
                name="file"
                label="File"
                onChange={handleChange}
                isInvalid={!!errors?.file}
                feedback={errors?.file}
                id="validationFormik107"
                feedbackTooltip
              />
            </Form.Group>

            <Form.Group>
              <Form.Check
                required
                name="terms"
                label="Agree to terms and conditions"
                onChange={handleChange}
                isInvalid={!!errors?.terms}
                feedback={errors?.terms}
                id="validationFormik106"
                feedbackTooltip
              />
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form> */}

          
        </Formik>
      </CFormContainer>
    </>
  )
};

const renderFields = (field, index, formik) => {

  const fieldProps = {
    key: `${field.key}-${index}`,
    name: field.key,
    value: formik.values[field.key],
    error: formik.errors[field.key],
    label: field.question,
    type: field.type,
    onChange: formik.handleChange,
    subType: field.subType,
    place: field.place,
    icon: field.icon,
    initialValue: field.initialValue,
    booleanValue: formik.values[field.booleanValue]
  };  

  switch (field?.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return (
        <Form.Group as={Col} className={field?.key} >
          <TextInput {...fieldProps} className={"textInput"}/>
        </Form.Group>
      );
    case "text-area":
      return (
        <Form.Group as={Col} className={field?.key} >
          <TextArea {...fieldProps} />
        </Form.Group>
      );
    case "dropdown":
      return (
        <Form.Group as={Col} className={field?.key} >
          <Select
            onChange={option => {
              formik.setFieldValue(field.key, option.value);
            }}
            options={field.options}
            type="select"
            isMulti={field.multi}
            label={field.question}
            placeholder={field.placeholder}
          />
        </Form.Group>
      );
    case "dateField":
      function _handleDateChange(selectedDate) {
        field.date = selectedDate;
        return field.date;
      }

      return (
        <Form.Group as={Col} className={field?.subType === "twoColumns" ? field?.key : "" } >
          {field.question && <Body>{field.question}</Body>}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              value={field.date}
              onChange={date => formik.setFieldValue(field.key ,_handleDateChange(date))}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Form.Group>
      );
    case "toggle":

      function _handleChecked () {
        field.booleanValue = !field.booleanValue
        return field.booleanValue;
      }

      return (
        <Form.Group as={Col} className={field?.subType === "twoColumns" ? field?.key : "" } >
          <SwitchButton
            key={`${field.key}-${index}`}
            name={field.key}
            subType={field.subType}
            side={field.side}
            initialValue={field.initialValue}
            value={field.booleanValue}
            label={field.question}
            onChange={() => formik.setFieldValue(field.key, _handleChecked())}
          />
        </Form.Group>
      );
    default:
      return;
  }
};

export default CForm;