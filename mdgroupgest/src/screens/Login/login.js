import React from 'react';
import Swal from 'sweetalert2';

import { MainContainer, LoginContainer } from './styles';

import Form from '../../components/Form/normalForm';
import { LogoMD } from '../../components/Logo/logo';
import { Corner, Corner180} from '../../components/Corner/corner';
import request from '../../components/Form/request';

import { useHistory, Link } from 'react-router-dom';

import useLogin from '../../hooks/login';
import Navigation from '../Home/menuNavbar';
import currentUser from '../../components/Form/request';

// import history from '../../utils/history'; 
 
const Login = () => {

  const login = useLogin();
  const history = useHistory();
  const currentUser = localStorage.getItem('currentUser')
  const FIELDS = [
    { type: "email", key: "email", question: "Email" },
    { type: "password", key: "password", question: "Senha" },
  ];

  const handleSubmitForm = (formFields) => {
    try {
      request.login(formFields);
      // if (currentUser !== null && localStorage.length !== 0) {
      //   HandleConfirmLoginAlert();
      // }

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