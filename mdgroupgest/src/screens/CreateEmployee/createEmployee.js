import React, { useMemo } from 'react';
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
import Form from '../../components/Form/normalForm';
import request from '../../components/Form/request';

const CreateEmployee = (props) => {

  console.log('props', props.location.state);

  const previousUrl = document.referrer;
  const loginUrl = "http://localhost:3000/";

  function _goBack() {
    window.history.back();    
  }

  function _ConfirmEmployeeCreation(data) {
    console.log(data, 'DATA')

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
        text: 
          `Nome: ${name ? name : `❌`},
           NIF: ${nif ? nif : `❌`}.                                               
           Morada: ${address ? address : `❌`},                                     
           Contato: ${contact ? contact : `❌`},                             
           Email: ${email ? email : `❌`},
           Escritório: ${office ? office : `❌`}
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
              )
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
              'error'
            )
          }
        })
      )
  }

  


  const handleSubmitForm = formFields => {

    const userType = props.location.state.userType;

    var currentUserType = localStorage.setItem('currentUserType', userType)

    let employee = `{ 
      "office": { "id": 1 },
      "user": { 
        "name": ${formFields?.name},
        "nif": ${String(formFields?.nif)},
        "email": ${formFields?.email},
        "contact": ${String(formFields?.contact)},
        "address": ${formFields?.address}, 
        "user_type": ${userType}
      } 
    }`;
    _ConfirmEmployeeCreation(employee)
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
      options: [
        {
          value: "Lisboa",
          label: "Lisboa"
        },
        {
          value: "Porto",
          label: "Porto"
        }
      ] 
    },
  ];

  return (
      <MainDiv>
        <BackIcon onClick={_goBack} />
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading>{props.location.state.title}</SubHeading>
        <LogoContainer><LogoMD /></LogoContainer>
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