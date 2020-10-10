import React from 'react';
import { useHistory } from 'react-router-dom';

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
import CForm from '../../components/Form/complexForm';

const CreateOffice = () => { 

  const history = useHistory();

  const FIELDS = [
    { type: "text", key: "officeName", question: "Nome do escritório" },
    { type: "number", key: "officeNIPC", question: "NIPC do escritório"},
    { type: "text", key: "officeAddress", question: "Morada do escritório"},
    { type: "text", key: "officeEmail", question: "Email do escritório"}
  ];
  
  return (
    <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
      <CForm 
        top
        bg="primary"
        isFullWidth
        formFields={FIELDS}
        btnLabel="Criar Escritório"
        onSubmit={() => console.log('test from submit')}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateOffice;