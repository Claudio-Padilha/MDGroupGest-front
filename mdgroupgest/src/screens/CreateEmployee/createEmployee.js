import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { Heading, SubHeading, SmallSubHeading } from '../../components/Text/text';
import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import { BackIcon } from '../../components/Icon/icons';

import { _executeValidationsIfHas } from '../../hooks/validation';
import employeesRequests from '../../hooks/requests/employeesRequests';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight,
  WidthMessageContainer
} from './styles';

const CreateEmployee = (props) => {

  const history = useHistory();

  const officeID = props?.location?.state?.officeID;
  const officeOBJ = props?.location?.state?.officeOBJ;
  const shouldRenderEmployeeAssociation = props?.location?.state?.shouldRenderEmployeeAssociation;
  const employeeToAssociate = props?.location?.state?.employeeToAssociate;
  const userTypeToInsert = props?.location?.state?.userType;
  const title = props?.location?.state?.title
  const shouldGoToBackOffice = props?.location?.state?.shouldGoToBackOffice;

  function _goBack() {
    shouldGoToBackOffice ?
    history.push("/BackOffice") :
    history.push({
      pathname: "/EmployeeType",
      state: {
        fromEmployeeCreation: true
      }
    });    
  }

  function _employeeToAssociation() {
    var employees = []

    if(employeeToAssociate) {
      Object.values(employeeToAssociate).forEach(function(employee){
        employees.push({value: { id: employee?.id, employee_type: employee?.user?.user_type}, label: employee?.user?.name })
      })
    };
    return employees
  }

  async function _ConfirmEmployeeCreation(data) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    var employeeTypeOfList = data?.employeeAbove?.employee_type;
    var name = data?.name; 
    var nif = data?.nif?.toString(); 
    var address = data?.address; 
    var contact = data?.contact?.toString();
    var email = data?.email;
    var zipCode = data?.zipCode;
    var nr = data?.nr;

    // Vai genericamente
    var nipc = '';
    var clientName='';
    var clientNif='';
    var clientContact='';
    var CUIDUAL='';
    var CUIForGas='';
    var CPEDUAL='';
    var CPEForElectricity='';
    var observations='';
    
    // await _executeValidationsIfHas(
    //   name,
    //   nif,
    //   nipc,
    //   address,
    //   contact,
    //   email,
    //   zipCode,
    //   clientName,
    //   clientNif,
    //   clientContact,
    //   CUIDUAL,
    //   CUIForGas,
    //   CPEDUAL,
    //   CPEForElectricity,
    //   observations
    // )
    const formWasValidated = JSON.parse(localStorage.getItem('formWasValidated'));

    const salesPersonObj = {
      manager: employeeTypeOfList === "manager" ? data?.employeeAbove?.id : null,
      team_leader: data?.employeeAbove?.is_team_leader ? data?.employeeAbove?.id : null,
      instructor: data?.employeeAbove?.is_instructor ? data?.employeeAbove?.id : null,
      office: officeID,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "sales_person",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    const instructorObj = {
      office: officeID,
      manager: employeeTypeOfList === "manager" ? data?.employeeAbove?.id : null,
      team_leader: employeeTypeOfList === "team_leader" ? data?.employeeAbove?.id : null,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "instructor",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    const teamLeaderObj = {
      office: officeID,
      manager: employeeTypeOfList === "manager" ? data?.employeeAbove?.id : null,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "team_leader",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    const secretaryObj = {
      office: officeID,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "secretary",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    const managerObj = {
      office: officeID,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "manager",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    const administratorObj = {
      office: officeID,
      user: {
        name: name,
        email: email,
        avatar: null,
        password: "Mdgroup2021@",
        user_type: "admin",
        nif: nif,
        contact: contact,
        address: address,
        zipcode: zipCode,
        is_admin: false,
        nr
      }
    }

    function _userObjBasedOnType() {
      switch (userTypeToInsert) {
        case 'sales_person':
          return salesPersonObj
        case 'instructor':
          return instructorObj
        case 'team_leader':
          return teamLeaderObj
        case 'secretary':
          return secretaryObj
        case 'manager':
          return managerObj  
        case 'admin':
          return administratorObj 
        default:
          return;
      }
    }
      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do comercial:',
        html: 
          `<b>Nome:</b> ${name ? name : `❌`} <br>
            <b>NIF:</b> ${nif ? nif : `❌`} <br>                                            
            <b>Morada:</b> ${address ? address : `❌`} <br>                                    
            <b>Contato:</b> ${contact ? contact : `❌`} <br>                             
            <b>Email:</b> ${email ? email : `❌`} <br>
            <b>Código Postal:</b> ${zipCode ? zipCode : `❌`} <br>
          `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "É isto"
          if (result.isConfirmed) {
            await employeesRequests.createEmployee(userTypeToInsert, _userObjBasedOnType())
            .then(res => {
              const clientSideError = res?.message?.match(/400/g);
              const serverSideError = res?.message?.match(/500/g);
              if(clientSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Comercial não inserido, tente de novo. (Verifique os campos)',
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
                  'Comercial inserido com sucesso.',
                  'success'
                ).then(async (result) => {
                  if(result) {
                    await employeesRequests.getAllEmployees(officeID);
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

    localStorage.setItem('currentUserType', userTypeToInsert)

    _ConfirmEmployeeCreation(formFields)
  };

  const FIELDS = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome" },
    { type: "text", subType: "twoColumns", side: "right", key: "nr", question: "CC/BI" },
    { type: "email", subType: "twoColumns", side: "right", key: "email", question: "E-mail" },
    { type: "number", subType: "twoColumns", side: "left", key: "nif", question: "NIF" },
    { type: "text", subType: "twoColumns", side: "right", key: "zipCode", question: "Código-Postal" },
    { type: "number", subType: "twoColumns", side: "right", key: "contact", question: "Telefone" },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada" },
    shouldRenderEmployeeAssociation && { 
      type: "dropdown",
      subType: "twoColumns",
      side: "right",
      key: "employeeAbove",
      question: "Comercial responsável",
      placeholder: "Escolha o nome",
      options: _employeeToAssociation() 
    }
  ];

  const Yup = require('yup')

  const zipCodeRegex = new RegExp(/^\d{4}\d{3}?$/)
  const numberMessage = 'Este campo é numérico.'

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('* O campo é obrigatório'),
    nr: Yup.string().max(5, 'Máximo 5 digits'),
    email: Yup.string().email('Tipo de email inválido').required('* O campo é obrigatório'),
    nif: Yup.number().test('len', 'Deve ter exatos 9 caracteres', val => val?.toString()?.length === 9),
    zipCode: Yup.string().test('format', 'O formato deve ser: 1234123', val => val?.match(zipCodeRegex)),
    contact: Yup.number(numberMessage)    
  });


  return (
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainDiv>
        <BackIcon onClick={_goBack} />
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading>{title}</SubHeading>
        <SmallSubHeading className={"officeName"}>{officeOBJ?.name}</SmallSubHeading>
        <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={FIELDS}
          top
          bg="primary"
          isFullWidth
          btnLabel="Inserir"
          validationSchema={validationSchema}
        />
        <CornerRight><Corner /></CornerRight>
      </MainDiv>
    </>
  )
}

export default CreateEmployee;
