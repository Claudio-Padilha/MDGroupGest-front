import React from 'react';
import { useHistory } from 'react-router-dom';

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

  // function _ConfirmEmployeeCreation(data) {

  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: 'btn btn-success',
  //       cancelButton: 'btn btn-danger'
  //     },
  //     buttonsStyling: true
  //   })

  //   var name = data?.name; 
  //   var nif = data?.nif?.toString(); 
  //   var address = data?.address; 
  //   var contact = data?.contact?.toString();
  //   var email = data?.email;
  //   var office = data?.office; 

  //     return (
  //       swalWithBootstrapButtons.fire({
  //       title: 'Confirme os dados do funcionário:',
  //       html: 
  //         `<b>Nome:</b> ${name ? name : `❌`} <br>
  //          <b>NIF:</b> ${nif ? nif : `❌`} <br>                                            
  //          <b>Morada:</b> ${address ? address : `❌`} <br>                                    
  //          <b>Contato:</b> ${contact ? contact : `❌`} <br>                             
  //          <b>Email:</b> ${email ? email : `❌`} <br>
  //          <b>Escritório:</b> ${office ? office : `❌`} <br>
  //         `,
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'É isso!',
  //       cancelButtonText: 'Refazer',
  //       reverseButtons: true
  //     }).then((result) => {

  //       // "result.isConfimed significa clicar em "Refazer"
  //         if (result.isConfirmed) {
  //           try {
  //             // request.editEmployee(data);
  //             swalWithBootstrapButtons.fire(
  //               'Boa!',
  //               'Funcionário inserido com sucesso.',
  //               'success'
  //             ).then((result) => {
  //               if(result) {
  //                 return history.push("/BackOffice");
  //               }
  //             });

  //           } catch (error) {
  //             swalWithBootstrapButtons.fire(
  //               'Erro',
  //               `${error}`,
  //               'error'
  //             )
  //           }

  //       // "!result.isConfimed significa clicar em "'E isso!"
  //         } else if (!result.isConfirmed) {
  //           swalWithBootstrapButtons.fire(
  //             'Cancelado',
  //             'Corrija o que estava errado...',
  //             'info'
  //           )
  //         }
  //       })
  //     )
  // }

  const handleSubmitForm = formFields => {
    const data = {
      office: employee?.office,
      id: employee?.id,
      user_type: employee?.user?.user_type
    }
    
    request.updateEmployee(formFields, data)

    // const userType = props.location.state.userType;

    // localStorage.setItem('currentUserType', userType)

    // _ConfirmEmployeeCreation(formFields)
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