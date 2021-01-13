import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import officesRequests from '../../hooks/requests/officesRequests';

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

  function _nipcValidation(nipc) {
    if(nipc?.length <= 9) {
      return null;
    }
    return 'O limite de caracteres no NIPC é de 9.';
  }

  function _addressValidation(address) {
    if(address?.length <= 120) {
      return null;
    }
    return 'O limite de caracteres na morada é de 120.'
  }

  function _nameValidation(name) {
    if(name?.length <= 80) {
      return null;
    }
    return 'O limite de caracteres no nome é de 80.'
  }

  function _emailValidation(email) {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    ) {
      return null;
    }
    return 'Por favor, insira um e-mail válido.';
  };

  function _zipCodeValidation(zipCode) {
    if (
      /(^\d{4}$)|(^\d{4}-\d{3}$)/.test(zipCode)
    ) {
        return null;
      }
    return `O formato correto para o código postal é: <br> "1234-123". <br> ${zipCode?.length === 0 ? 'Precisamos de um valor' : `Você digitou ${zipCode}`}.`
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
    var officeZipCode = data?.officeZipCode;

    function _hasValidations() {
      return (
        _nameValidation(name) !== null ||
        _nipcValidation(nipc) !== null ||
        _addressValidation(address) !== null ||
        _emailValidation(email) !== null ||
        _zipCodeValidation(officeZipCode) !== null
      )
    }

    function _executeAllValidations() {
      return (
        swalWithBootstrapButtons.fire(
          {
            title: 'Atente-se às validações',
            html: `
              ${_nameValidation(name) ? _nameValidation(name) : ''} <br>
              ${_nipcValidation(nipc) ? _nipcValidation(nipc) : ''} <br>                                            
              ${_addressValidation(address) ? _addressValidation(address) : ''} <br>                             
              ${_emailValidation(email) ? _emailValidation(email) : ''} <br>
              ${_zipCodeValidation(officeZipCode) ? _zipCodeValidation(officeZipCode) : ''} <br>
            `,
            icon: 'info'
          }
        )
      )
    }

    if(_hasValidations()) {
      return _executeAllValidations()
    }

    return (
      swalWithBootstrapButtons.fire({
      title: 'Confirme os dados do escritório:',
      text: 
        `Nome: ${name ? name : `❌`},
          NIPC: ${nipc ? nipc : `❌`}.                                               
          Morada: ${address ? address : `❌`},                                                               
          Código Postal: ${officeZipCode ? officeZipCode : `❌`},                                                               
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
            // swalWithBootstrapButtons.fire(
            //   'Boa!',
            //   'Escritório inserido com sucesso.',
            //   'success'
            // ).then((result) => {
            //   if(result) {
            //     return history.push("/BackOffice");
            //   }
            // });
            
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