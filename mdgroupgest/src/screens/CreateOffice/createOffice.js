import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import request from '../../components/Form/request';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { Corner, Corner180 } from '../../components/Corner/corner';
import { BackIcon } from '../../components/Icon/icons';
import { LogoMD } from '../../components/Logo/logo';
import CForm from '../../components/Form/complexForm';

const CreateOffice = () => { 

  const history = useHistory();

  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function _ConfirmOfficeCreation(data) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    var name = data?.officeName; 
    var nipc = data?.officeNIPC?.toString(); 
    var address = data?.officeAddress; 
    var email = data?.officeEmail;

      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do escritório:',
        text: 
          `Nome: ${name ? name : `❌`},
           NIPC: ${nipc ? nipc : `❌`}.                                               
           Morada: ${address ? address : `❌`},                                                               
           Email: ${email ? email : `❌`},
          `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then((result) => {

        // "result.isConfimed significa clicar em "Refazer"
          if (result.isConfirmed) {
            try {
              request.createOffice(data);
              swalWithBootstrapButtons.fire(
                'Boa!',
                'Escritório inserido com sucesso.',
                'success'
              ).then((result) => {
                if(result) {
                  return history.push("/BackOffice");
                }
              });
              
            } catch (error) {
              swalWithBootstrapButtons.fire(
                'Erro',
                `${error}`,
                'error'
              )
            }
 
        // "!result.isConfimed significa clicar em "'E isso!"
          } else if (!result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              'Cancelado',
              'Corrija o que estava errado...',
              'info'
            )
          }
        })
      )
  }

  const handleSubmitForm = formFields => { _ConfirmOfficeCreation(formFields)  }

  const FIELDS = [
    { type: "text", key: "officeName", question: "Nome do escritório" },
    { type: "number", key: "officeNIPC", question: "NIPC do escritório"},
    { type: "text", key: "officeAddress", question: "Morada do escritório"},
    { type: "text", key: "officeEmail", question: "Email do escritório"}
  ];
  
  return (
    <MainDiv>
      <BackIcon onClick={_goBack} />
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
      <CForm 
        top
        bg="primary"
        isFullWidth
        formFields={FIELDS}
        btnLabel="Criar Escritório"
        onSubmit={handleSubmitForm}
      />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  ); 
};

export default CreateOffice;