import React from 'react';

import { MainContainer, LoginContainer } from './styles';

import Swal from 'sweetalert2';

import Form from '../../components/Form/normalForm';
import { LogoMD } from '../../components/Logo/logo';
import { Corner, Corner180} from '../../components/Corner/corner';
import userRequests from '../../hooks/requests/userRequests';
 
const Login = () => {

  const FIELDS = [
    { type: "email", key: "email", question: "Email" },
    { type: "password", key: "password", question: "Senha" },
  ];

  const handleSubmitForm = (formFields) => {
    try {
      userRequests.login(formFields)
    } catch (error) {
      console.log('VOCE NÃO FOI BEM SUCEDIDO')
    }
  };

  return(
    <MainContainer>
      <LoginContainer>
      <Corner />
      <LogoMD animated />
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