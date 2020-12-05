import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { SubHeading, SmallSubHeading } from '../../components/Text/text';
import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import { BackIcon } from '../../components/Icon/icons';
import request from '../../components/Form/request';

const CreateEmployee = (props) => {

  const history = useHistory();

  console.log(props, 'PROPS DA CRIAÇÃO DE EMPLOYEE')

  const officeID = props?.location?.state?.officeID;
  const officeOBJ = props?.location?.state?.officeOBJ;

  function _goBack() {
    history.push({
      pathname: "/EmployeeType",
      state: {
        fromEmployeeCreation: true
      }
    });    
  }

  function _ConfirmEmployeeCreation(office, data) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    var name = data?.name; 
    var nif = data?.nif?.toString(); 
    var address = data?.address; 
    var contact = data?.contact?.toString();
    var email = data?.email;

      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do funcionário:',
        html: 
          `<b>Nome:</b> ${name ? name : `❌`} <br>
           <b>NIF:</b> ${nif ? nif : `❌`} <br>                                            
           <b>Morada:</b> ${address ? address : `❌`} <br>                                    
           <b>Contato:</b> ${contact ? contact : `❌`} <br>                             
           <b>Email:</b> ${email ? email : `❌`} <br>
          `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "É isto"
          if (result.isConfirmed) {
            await request.createEmployee(office, data)
            .then(res => {
              const clientSideError = res?.message?.match(/400/g);
              const serverSideError = res?.message?.match(/500/g);

              if(clientSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Funcionário não inserido, tente de novo. (Verifique os campos)',
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
                  'Funcionário inserido com sucesso.',
                  'success'
                ).then(async (result) => {
                  if(result) {
                    await request.getAllEmployees(officeID);
                    return history.push({
                      pathname:"/ChooseEmployeeTypeToSee",
                      state: {
                        cameFromCreation: true
                      }
                    });
                  }
                });
              }
            })
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

  const handleSubmitForm = (formFields) => {

    const userType = props.location.state.userType;

    localStorage.setItem('currentUserType', userType)

    _ConfirmEmployeeCreation(officeID, formFields)
  };

  const FIELDS = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome" },
    { type: "number", subType: "twoColumns", side: "right", key: "nif", question: "NIF" },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada" },
    { type: "email", subType: "twoColumns", side: "left", key: "email", question: "E-mail" },
    { type: "number", subType: "twoColumns", side: "right", key: "contact", question: "Telefone" }
  ];

  return (
      <MainDiv>
        <BackIcon onClick={_goBack} />
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading>{props.location.state.title}</SubHeading>
        <SmallSubHeading className={"officeName"}>{officeOBJ?.name}</SmallSubHeading>
        <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={FIELDS}
          top
          bg="primary"
          isFullWidth
          btnLabel="Inserir"
        />
        <CornerRight><Corner /></CornerRight>
    </MainDiv>
  )
}

export default CreateEmployee;
