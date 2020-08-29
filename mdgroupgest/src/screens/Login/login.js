import React from 'react';
import Swal from 'sweetalert2';

import { MainContainer, LoginContainer } from './styles';

import Form from '../../components/Form/form';
import { LogoMD } from '../../components/Logo/logo';
import { Corner, Corner180} from '../../components/Corner/corner';

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
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
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
 
const Login = ({navigation}) => {
  
  const mockedFields = [
    { type: "text", label: "Email" },
    { type: "password", label: "Senha", subLabel: "Esqueceu sua senha?" },
  ];

  return(
    <MainContainer>
      <LoginContainer>
        <Corner />
        <LogoMD />
        <Form
          top
          bg="primary"
          fullWidth
          formFields={mockedFields}
          btnLabel="Entrar"
          onSubmit={true ? HandleConfirmLoginAlert() : HandleDeniedLogin()}
          onChange={() => console.log('test from changing')}
        >
        </Form>
        <Corner180 />
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;