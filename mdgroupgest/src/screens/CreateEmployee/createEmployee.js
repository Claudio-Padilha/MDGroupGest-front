import React from 'react';

import {
  MainContainer,
  RightContractContainer,
  LeftContractContainer,
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import Form from '../../components/testForm/testForm';

const CreateEmployee = () => { 

  const handleSubmitForm = formFields => console.log(formFields, 'Your form was submitted...');

  const FIELDS = [
    { type: "text", key:"employeeFirstName", question: "Primeiro Nome" },
    { type: "text", key:"employeeLastName", question: "Último Nome" },
    { type: "number", key:"employeeNIF", question: "NIF"},
    { type: "email", key:"email", question: "Email"},
    { type: "text", key:"address", question: "Morada"},
    { type: "number", key:"employeeContact", question: "Contacto"},
    {
      type: "dropdown",
      multi: false,
      key: "employeeOffice",
      question: "Selecione Escritório",
      options: [
        {
          value: "miguelOffice",
          label: "Miguel Pedro"
        },
        {
          value: "danielOffice",
          label: "Daniel Paiva"
        }
      ]
    }
  ];
  
  return (
    <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD /></LogoContainer>
      <Form 
        top
        bg="primary"
        isFullWidth={false}
        formFields={FIELDS}
        btnLabel="Próximo"
        onSubmit={handleSubmitForm}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateEmployee;