import React from 'react';
import Swal from 'sweetalert2';

import { MainContainer, LoginContainer } from './styles';

import Form from '../../components/testForm/testForm';
import { LogoMD } from '../../components/Logo/logo';
import { Corner, Corner180} from '../../components/Corner/corner';

import request from '../../components/testForm/request';
 
const Login = () => {
  const email = "lucas_padilha@icloud.com" // will come from API 
  const password = "derpherp123@" // will come from API
  
  const FIELDS = [
    { type: "email", key: "email", question: "Email" },
    { type: "password", key: "password", question: "Senha" },
  ];

  const handleSubmitForm = (formFields) => {
    // if (formFields.email === email && formFields.password === password) {
    //   console.log(formFields, '--> VOCÊ FOI AUTENTICADO COM SUCESSO!')
    // } else
    // console.log(formFields, '--> ACESSO NEGADO!')
    request.login(formFields);
  };

  const HandleConfirmLoginAlert = () => {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn-success',
        cancelButton: 'btn-danger'
      },
      buttonsStyling: true
    })
    return (
      swalWithBootstrapButtons.fire({
        title: 'Você foi autenticado com sucesso!',
        text: 'Escolha o que quer fazer',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Inserir contrato',
        cancelButtonText: 'Ir para dashboard',
        reverseButtons: false
      }).then((result) => {
        if (result.value) {
          handleSubmitForm();
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
            return HandleDeniedLogin
        }
      })
    );    
  }

  const HandleDeniedLogin = () => {
    return (
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Você não foi autenticado.',
        footer: '<a href>Why do I have this issue?</a>'
      })
    )
  }

  return(
    <MainContainer>
      <LoginContainer>
      <Corner />
      <LogoMD />
        <Form
          top
          bg="primary"
          isFullWidth
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