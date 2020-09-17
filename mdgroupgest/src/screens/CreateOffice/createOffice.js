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

const CreateOffice = () => { 

  const mockedFields = [
    { type: "text", label: "Nome do escritório" },
    { type: "text", label: "NIPC do escritório"},
    { type: "text", label: "Endereço do escritório"},
    { type: "text", label: "Email do escritório"}
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
        btnLabel="Criar Escritório"
        onSubmit={() => console.log('test from submit')}
        // onChange={() => console.log('test from changing')}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateOffice;