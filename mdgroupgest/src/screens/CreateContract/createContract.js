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

const CreateContract = () => { 

  const FIELDS = [
    { type: "text", key:"comercialName", question: "Nome do Comercial" },
    { type: "text", key:"clientName", question: "Nome do Cliente"},
    { type: "text", key:"clientNIF", question: "NIF/NIPC do Cliente"},
    { type: "date", key:"deliveryDate", question: "Data de entrega"},
    { type: "text", key:"assignDate", question: "Data de assinatura"},
    { type: "text", key:"clientContact", question: "Contacto cliente"}
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
        onSubmit={() => console.log('test from submit')}
        onChange={() => console.log('test from changing')}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateContract;