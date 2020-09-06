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
import Form from '../../components/Forms/normalForm';

const CreateContract = () => { 

  const mockedFields = [
    { type: "text", label: "Nome do Comercial" },
    { type: "text", label: "Nome do Cliente"},
    { type: "text", label: "NIF/NIPC do Cliente"},
    { type: "date-field", label: "Data de entrega"},
    { type: "text", label: "Data de assinatura"},
    { type: "text", label: "Contacto cliente"}
  ];
  
  return (
    <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD /></LogoContainer>
      <Form 
        top
        bg="primary"
        fullWidth
        formFieldsPaginated={mockedFields}
        btnLabel="Próximo"
        onSubmit={() => console.log('test from submit')}
        onChange={() => console.log('test from changing')}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateContract;