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
import Form from '../../components/Form/normalForm';

const CreateOffice = () => { 

  const mockedFields = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome" },
    { type: "number", subType: "twoColumns", side: "right", key: "nipc", question: "NIPC" },
    { type: "email", subType: "twoColumns", side: "left", key: "email", question: "E-mail" },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada" },
  ];
  
  return (
    <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD /></LogoContainer>
      <Form 
        top
        bg="primary"
        fullWidth
        formFields={mockedFields}
        btnLabel="Criar Escritório"
        onSubmit={() => console.log('test from submit')}
        // onChange={() => console.log('test from changing')}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateOffice;