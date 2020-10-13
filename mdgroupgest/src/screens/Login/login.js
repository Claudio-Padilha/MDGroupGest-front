import React from 'react';

import { MainContainer, LoginContainer } from './styles';

import Form from '../../components/Form/normalForm';
import { LogoMD } from '../../components/Logo/logo';
import { Corner, Corner180} from '../../components/Corner/corner';
import request from '../../components/Form/request';
 
const Login = () => {

  const FIELDS = [
    { type: "email", key: "email", question: "Email" },
    { type: "password", key: "password", question: "Senha" },
  ];

  const handleSubmitForm = (formFields) => {
    try {
      request.login(formFields);
    } catch (error) {
      console.log('VOCE NÃO FOI BEM SUCEDIDO')
    }
  };

  return(
    <MainContainer>
      <LoginContainer>
      <Corner />
      <LogoMD />
        <Form
          top
          bg="primary"
          isFullWidth
          iconName='ios-lock'
          formFields={FIELDS}
          btnLabel="Entrar"
          onSubmit={handleSubmitForm}
        ></Form>
      <Corner180 />
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;