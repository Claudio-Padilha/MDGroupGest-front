import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import officesRequests from '../../hooks/requests/officesRequests';
import { _executeValidationsIfHas } from '../../hooks/validation';

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

  async function _ConfirmOfficeCreation(data) {

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
    var zipCode = data?.officeZipCode;

    // Vai genericamente
    var nif ='';
    var contact ='';
    var clientName='';
    var clientNif='';
    var clientContact='';
    var CUIDUAL='';
    var CUIForGas='';
    var CPEDUAL='';
    var CPEForElectricity='';
    var observations='';

    await _executeValidationsIfHas(
      name,
      nif,
      nipc,
      address,
      contact,
      email,
      zipCode,
      clientName,
      clientNif,
      clientContact,
      CUIDUAL,
      CUIForGas,
      CPEDUAL,
      CPEForElectricity,
      observations
    )
    const formWasValidated = JSON.parse(localStorage.getItem('formWasValidated'));

    if (!formWasValidated) {
      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do escritório:',
        text: 
          `Nome: ${name ? name : `❌`},
            NIPC: ${nipc ? nipc : `❌`}.                                               
            Morada: ${address ? address : `❌`},                                                               
            Código Postal: ${zipCode ? zipCode : `❌`},                                                               
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
              officesRequests.createOffice(data).then((res) => {
                const clientSideError = res?.message?.match(/400/g);
                const serverSideError = res?.message?.match(/500/g);
  
                if(clientSideError) {
                  return swalWithBootstrapButtons.fire(
                    'Erro',
                    'Escritório não inserido, tente de novo. (Verifique os campos)',
                    'error'
                  )
                } else if (serverSideError) {
                  return swalWithBootstrapButtons.fire(
                    'Erro',
                    'Erro no servidor. Tente novamente mais tarde.',
                    'error'
                  )
                } else {
                  swalWithBootstrapButtons.fire(
                    'Boa!',
                    'Escritório inserido com sucesso.',
                    'success'
                  ).then((result) => {
                    if(result) {
                      return history.push("/BackOffice");
                    }
                  });
                }
  
              })
              
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
    } else { localStorage.removeItem('formWasValidated') }
  }

  const handleSubmitForm = formFields => { _ConfirmOfficeCreation(formFields) }

  const FIELDS = [
    { type: "text", key: "officeName", question: "Nome do escritório" , initialValue: ''},
    { type: "number", key: "officeNIPC", question: "NIPC do escritório", initialValue: ''},
    { type: "text", key: "officeAddress", question: "Morada do escritório", initialValue: ''},
    { type: "text", key: "officeZipCode", question: "Código-postal", initialValue: ''},
    { type: "text", key: "officeEmail", question: "Email do escritório", initialValue: ''}
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