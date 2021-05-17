import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Body } from '../Text/text';

import TextInput from "../../components/TextInput/textInput";
import TextArea from "../../components/TextArea/textArea";
import Select from "../../components/Select/select";
import Button from "../../components/Button/button";
import SwitchButton from "../ToggleComponent/toggleButton";
import { Heading, SubHeading } from "../Text/text";

import { CFormContainer, StyledForm, WidthMessageContainer} from "./styles";

const CForm = ({
  formFields,
  btnLabel,
  onSubmit,
  children,
  isFullWidth,
  validationSchema
}) => {

  const getInitialValues = () => {
    const initialValues = {};
    const keys = formFields && Object.keys(formFields);
    
    if(keys) {
      keys.forEach((i) => {
        const formField = formFields[i];
        initialValues[formField?.key] = formField?.initialValue;
      });
    }

    return initialValues;
  }

  // const Yup = require('yup')

  // const zipCodeRegex = new RegExp(/^\d{4}-\d{3}?$/)
  // const CPEAndCUIRegex = new RegExp(/^PT+[0-9]+[0-9]+[A-Z]+[A-Z]/)
  // const numberMessage = 'Este campo é numérico.'

  // const validationSchema = Yup.object().shape({
  //   name: Yup.string(),
  //   nr: Yup.string().max(5, 'Máximo 5 digits'),
  //   nif: Yup.number().test('len', 'Deve ter exatos 9 caracteres', val => val?.toString()?.length === 9),
  //   zipCode: Yup.string().test('format', 'O formato deve ser: 1234-123', val => val?.match(zipCodeRegex)),
  //   contact: Yup.number(numberMessage),
  //   clientNif: Yup.number().test('len', 'Deve ter exatos 9 caracteres', val => val?.toString()?.length === 9),
  //   clientContact: Yup.number(numberMessage),
  //   CPEDUAL: Yup.string()
  //     .test(
  //       'len',
  //       'O formato deve ser: PT0002554877874469YK',
  //       val => val?.match(CPEAndCUIRegex)?.toString()?.length === 20
  //     ),
  //   CPEForElectricity: Yup.string()
  //     .test(
  //       'len',
  //       'O formato deve ser: PT0002554877874469YK',
  //       val => val?.match(CPEAndCUIRegex)?.toString()?.length === 20
  //     ),
  //   CUIDUAL: Yup.string()
  //     .test(
  //       'len',
  //       'O formato deve ser: PT0002554877874469YK',
  //       val => val?.match(CPEAndCUIRegex)?.toString()?.length === 20
  //     ),
  //   CUIForGas: Yup.string()
  //     .test(
  //       'len',
  //       'O formato deve ser: PT0002554877874469YK',
  //       val => val?.match(CPEAndCUIRegex)?.toString()?.length === 20
  //     ),
  //   officeName: Yup.string(),
  //   officeNIPC: Yup.number().test('len', 'Deve ter exatos 9 caracteres', val => val?.toString()?.length === 9),
  //   officeZipCode: Yup.number().test('len', 'Deve ter exatos 9 caracteres', val => val?.toString()?.length === 9),
  //   email: Yup.string().email('Tipo de email inválido'),
  // });

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
          validationSchema={validationSchema}
        >
          {
            props => (
              <StyledForm onSubmit={props.handleSubmit}>
                <div>
                  {formFields &&
                    formFields.map((field, index) => {
                      return renderFields(field, index, props, formFields);
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
        </Formik>
      </CFormContainer>
    </>
  )
};

const renderFields = (field, index, formik, formFields) => {

  const fieldProps = {
    key: `${field?.key}-${index}`,
    name: field?.key,
    value: formik.values[field?.key],
    error: formik.errors[field?.key],
    label: field?.question,
    type: field?.type,
    onChange: formik.handleChange,
    subType: field?.subType,
    place: field?.place,
    icon: field?.icon,
    initialValue: field?.initialValue,
    booleanValue: formik.values[field?.booleanValue],
  };  


  switch (field?.type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return (
        <Form.Group as={Col} className={field?.key} controlId="validationFormik100">
          <TextInput {...fieldProps} className={"textInput"} placeholder={field?.place}/>
        </Form.Group>
      );
    case "text-area":
      return (
        <Form.Group as={Col} className={field?.key} controlId="validationFormik101">
          <TextArea {...fieldProps} />
        </Form.Group>
      );
    case "dropdown":
      const optionsSellState = JSON.parse(localStorage.getItem('sellStates'))
      return (
        <Form.Group as={Col} className={field?.key} controlId="validationFormik102">
          <Select
            onChange={async (option) => {
              if (field.key === 'feedbackCall'){
                if (option.label !== 'OK') {
                  let obj 

                  await formFields[index + 1]?.options?.map(el => {
                    if (el?.label === 'OK') {
                      obj = el
                    }
                  })
                  formFields[index + 1].options[formFields[index + 1].options.indexOf(obj)].label = ''

                } else {

                  await formFields[index + 1]?.options.map(el => {
                    if (el?.label === '') {
                      el.label = 'OK'
                    }
                  })
                }
              }
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
        <Form.Group as={Col} className={field?.subType === "twoColumns" ? field?.key : "" } controlId="validationFormik103">
          {field.question && <Body>{field.question}</Body>}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              format="dd/MM/yyyy"
              value={field.date}
              onChange={date => {
                if (field.key === 'signatureDate') {
                  if (formFields[index - 1]?.date === null) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'warning',
                      title: 'Você precisa selecionar uma data de entrega.',
                      showConfirmButton: true
                    })
                    return
                  } else if (date.getDate() > formFields[index - 1]?.date.getDate()) {
                    Swal.fire({
                      position: 'top-end',
                      icon: 'warning',
                      title: 'A data de assinatura não pode ser posterior à data de entrega.',
                      showConfirmButton: true
                    })
                    return
                  }
                }
                formik.setFieldValue(field.key ,_handleDateChange(date))
              }}
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
        <Form.Group as={Col} className={field?.subType === "twoColumns" ? field?.key : "" } controlId="validationFormik104">
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
