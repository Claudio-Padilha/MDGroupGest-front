import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { SubHeading } from '../../components/Text/text';
import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import { BackIcon } from '../../components/Icon/icons';
import request from '../../components/Form/request';

const CreateEmployee = (props) => {

  const history = useHistory();

  const officesList = props?.location?.state?.officesList;

  function _goBack() {
    history.push({
      pathname: "/EmployeeType",
      state: {
        fromEmployeeCreation: true
      }
    });    
  }

  function _ConfirmEmployeeCreation(data) {

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
    var office = data?.office; 

      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do funcionário:',
        html: 
          `<b>Nome:</b> ${name ? name : `❌`} <br>
           <b>NIF:</b> ${nif ? nif : `❌`} <br>                                            
           <b>Morada:</b> ${address ? address : `❌`} <br>                                    
           <b>Contato:</b> ${contact ? contact : `❌`} <br>                             
           <b>Email:</b> ${email ? email : `❌`} <br>
           <b>Escritório:</b> ${office ? office : `❌`} <br>
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
              request.createEmployee(data);
              swalWithBootstrapButtons.fire(
                'Boa!',
                'Funcionário inserido com sucesso.',
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

  const handleSubmitForm = formFields => {

    const userType = props.location.state.userType;

    localStorage.setItem('currentUserType', userType)

    _ConfirmEmployeeCreation(formFields)
  };

  const FIELDS = [
    { type: "text", subType: "twoColumns", side: "left", key: "name", question: "Nome" },
    { type: "number", subType: "twoColumns", side: "right", key: "nif", question: "NIF" },
    { type: "number", subType: "twoColumns", side: "right", key: "contact", question: "Telefone" },
    { type: "email", subType: "twoColumns", side: "left", key: "email", question: "E-mail" },
    { type: "text", subType: "twoColumns", side: "left", key: "address", question: "Morada" },
    { type: "dropdown",
      subType: "twoColumns",
      side: "right",
      key: "office",
      question: "Escritório",  
      options: officesList
    },
  ];

  return (
      <MainDiv>
        <BackIcon onClick={_goBack} />
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading>{props.location.state.title}</SubHeading>
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













// import React from 'react';

// import {
//   MainContainer,
//   RightContractContainer,
//   LeftContractContainer,
//   MainDiv,
//   CornerLeft,
//   LogoContainer,
//   CornerRight
// } from './styles';

// import { Corner, Corner180 } from '../../components/Corner/corner';
// import { LogoMD } from '../../components/Logo/logo';
// import Form from '../../components/Form/normalForm';
// import request from '../../components/Form/request';

// const CreateEmployee = () => { 

//   const handleSubmitForm = formFields => {
//     // console.log(formFields, 'Your form was submitted...')
//     request.createEmployee(formFields);
//   };

//   const FIELDS = [
//     { type: "text", key:"employeeFirstName", question: "Primeiro Nome" },
//     { type: "text", key:"employeeLastName", question: "Último Nome" },
//     { type: "number", key:"employeeNIF", question: "NIF"},
//     { type: "email", key:"email", question: "Email"},
//     { type: "text", key:"address", question: "Morada"},
//     { type: "number", key:"employeeContact", question: "Contacto"},
//     {
//       type: "dropdown",
//       multi: false,
//       key: "office",
//       question: "Selecione Escritório",
//       options: [
//         {
//           value: "miguelOffice",
//           label: "Miguel Pedro"
//         },
//         {
//           value: "danielOffice",
//           label: "Daniel Paiva"
//         }
//       ]
//     }
//   ];
  
//   return (
//     <MainDiv>
//       <CornerLeft><Corner180 /></CornerLeft>
//       <LogoContainer><LogoMD /></LogoContainer>
//       <Form 
//         top
//         bg="primary"
//         isFullWidth={false}
//         formFields={FIELDS}
//         btnLabel="Próximo"
//         onSubmit={handleSubmitForm}
//       />
//       <CornerRight><Corner /></CornerRight>
//     </MainDiv>
//   ); 
// };

// export default CreateEmployee;