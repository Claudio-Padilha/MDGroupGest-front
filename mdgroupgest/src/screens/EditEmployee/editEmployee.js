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
import employeesRequests from '../../hooks/requests/employeesRequests';
import { FormControl } from '@material-ui/core';

const EditEmployee = (props) => {

  const history = useHistory();

  const employee = props?.location?.state?.employeeData;
  const officeID = props?.location?.state?.officeID;
  const officeOBJ = props?.location?.state?.officeOBJ;
  const shouldRenderEmployeeAssociation = props?.location?.state?.shouldRenderEmployeeAssociation;
  const employeeToAssociate = props?.location?.state?.employeeToAssociate;
  const employeesReturningFromEdit = props?.location?.state?.employeesComingFromList;
  const currentAssociateID = employee?.manager;
  const currentOfficeID = employee?.office;

  function _goBack() {
    history.push({
      pathname: "/EmployeeList",
      state: {
        employeesReturningFromEdit: employeesReturningFromEdit,
        isFromEdit: true
      }
    });    
  }

  function _ConfirmEmployeeUpdate(formFields, data) {

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
    var employeeAbove = formFields?.employeeAbove;

    const nothingWasChanged = name === undefined && nif === undefined && address === undefined && contact === undefined && email === undefined && employeeAbove === undefined

      return (
        swalWithBootstrapButtons.fire({
        title: `${nothingWasChanged ? "Você não alterou nenhuma informação." : "Confirme os dados do funcionário:"}`,
        html: 
            `${name ? `O novo nome será: <b>${name}</b> <br>` : ``}
             ${nif ? `O novo NIF será: <b>${nif}</b> <br>` : ``}
             ${address ? `A nova morada será: <b>${address}</b> <br>` : ``}
             ${email ? `O novo email será: <b>${email}</b> <br>` : ``}
             ${contact ? `O novo contacto será: <b>${contact}</b> <br>` : ``}
             ${employeeAbove ? `Você mudará o funcionário associado. <br>` : ``}
            `,
        icon: 'warning',
        showCancelButton: !nothingWasChanged,
        confirmButtonText: `${nothingWasChanged ? "Ok" : "É isso!"}`,
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "Refazer"
          if (result.isConfirmed) {
            await employeesRequests.updateEmployee(formFields, data)
            await employeesRequests.getAllEmployees(currentOfficeID)
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
                      cameFromEdit: true,
                      employeesAfterUpdate: JSON.parse(localStorage.getItem('allEmployees')),
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
      user_type: employee?.user?.user_type,
    }

    _ConfirmEmployeeUpdate(formFields, data)
  };

  function _employeeToAssociation() {
    var employees = []

    if(employeeToAssociate) {
      Object.values(employeeToAssociate).forEach(function(employee){
        employees.push({value: { id: employee?.id, employee_type: employee?.user?.user_type}, label: employee?.user?.name })
      })
    };
    return employees
  }

  const associatePlaceholder = () => {
    for (let i = 0; i < employeeToAssociate?.length; i++) {
      if (employeeToAssociate[i]?.id === currentAssociateID) {
        return employeeToAssociate[i].user?.name
      } 
    }
  }

  const FIELDS = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome", place: employee?.user?.name },
    { type: "number", subType: "twoColumns", side: "right", key: "nif", question: "NIF", place: employee?.user?.nif },
    { type: "number", subType: "twoColumns", side: "right", key: "contact", question: "Telefone", place: employee?.user?.contact },
    { type: "email", subType: "twoColumns", side: "left", key: "email", question: "E-mail", place: employee?.user?.email },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada", place: employee?.user?.address },
    shouldRenderEmployeeAssociation && { 
      type: "dropdown",
      subType: "twoColumns",
      side: "right",
      key: "employeeAbove",
      question: "Funcionário responsável",
      placeholder: associatePlaceholder(),
      options: _employeeToAssociation() 
    }
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