import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { SubHeading, Body } from '../../components/Text/text';
import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import { BackIcon } from '../../components/Icon/icons';

import request from '../../components/Form/request';

const EditEmployee = (props) => {

  const history = useHistory();

  const employee = props?.location?.state?.employeeData;
  console.log(employee, 'funcionário a ser editado')

  function _goBack() {
    history.push({
      pathname: "/EmployeeList",
    });    
  }

  function _ConfirmEmployeeUpdate(formFields, data) {
    console.log(formFields?.name, 'TEST')

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    var name = formFields?.name; 
    var nif = formFields?.nif?.toString(); 
    var address = formFields?.address; 
    var contact = formFields?.contact?.toString();
    var email = formFields?.email; 

    const nothingWasChanged = name === undefined && nif === undefined && address === undefined && contact === undefined && email === undefined

      return (
        swalWithBootstrapButtons.fire({
        title: `${nothingWasChanged ? "Você não alterou nenhuma informação." : "Confirme os dados do funcionário:"}`,
        html: 
            `${name ? `O novo nome será: <b>${name}</b> <br>` : ``}
             ${nif ? `O novo NIF será: <b>${nif}</b> <br>` : ``}
             ${address ? `A nova morada será: <b>${address}</b> <br>` : ``}
             ${email ? `O novo email será: <b>${email}</b> <br>` : ``}
             ${contact ? `O novo contacto será: <b>${contact}</b> <br>` : ``}
            `,
        icon: 'warning',
        showCancelButton: !nothingWasChanged,
        confirmButtonText: `${nothingWasChanged ? "Ok" : "É isso!"}`,
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "Refazer"
          if (result.isConfirmed) {
            await request.updateEmployee(formFields, data)
            try {
              swalWithBootstrapButtons.fire(
                `${nothingWasChanged ? "" : "Boa!"}`,
                `${nothingWasChanged ? "Os dados permanecem os mesmos." : "Dados alterados com sucesso."}`,
                'success'
              ).then((result) => {
                if(result) {
                  return history.push({
                    pathname: "/ChooseEmployeeTypeToSee",
                    state: {
                      cameFromEdit: true
                    }
                  });
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

  const handleSubmitForm = formFields => {
    const data = {
      office: employee?.office,
      id: employee?.id,
      user_type: employee?.user?.user_type
    }
    
    // request.updateEmployee(formFields, data)

    // const userType = props.location.state.userType;

    // localStorage.setItem('currentUserType', userType)

    _ConfirmEmployeeUpdate(formFields, data)
  };

  const FIELDS = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome", place: employee?.user?.name },
    { type: "number", subType: "twoColumns", side: "right", key: "nif", question: "NIF", place: employee?.user?.nif },
    { type: "number", subType: "twoColumns", side: "right", key: "contact", question: "Telefone", place: employee?.user?.contact },
    { type: "email", subType: "twoColumns", side: "left", key: "email", question: "E-mail", place: employee?.user?.email },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada", place: employee?.user?.address }
  ];

  return (
      <MainDiv>
        <BackIcon onClick={_goBack} />
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading>Editar dados</SubHeading>
        <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={FIELDS}
          top
          bg="primary"
          isFullWidth
          btnLabel="Atualizar"
        />
        <CornerRight><Corner /></CornerRight>
    </MainDiv>
  )
}

export default EditEmployee;