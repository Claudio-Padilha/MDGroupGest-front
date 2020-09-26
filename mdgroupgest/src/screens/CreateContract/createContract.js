import React, { useState } from 'react';


import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import request from '../../components/Form/request';

const CreateContract = () => {

  const handleSubmitForm = formFields => { request.createContract(formFields) };

  // const [page, setPage] = useState(1)

  // setPage(2) CONTINUAR COM ESSA LÓGICA PARA PAGINAÇÃO (CHAVE DE PAGINA PARA MUDAR COM USESTATE)
  const FIELDS = [
    { type: "dropdown",
    subType: "twoColumns",
    side: "right",
    key: "employeeName",
    question: "Nome do Comercial",  
    options: [
      {
        value: "Miguel",
        label: "Miguel"
      },
      {
        value: "Daniel",
        label: "Daniel"
      },
      {
        value: "Lucas",
        label: "Lucas"
      },
      {
        value: "Cláudio",
        label: "Cláudio"
      }
    ] 
  },
    { type: "text", subType: "twoColumns", side: "right", key: "clientName", question: "Nome do Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientNif", question: "NIF / NIPC Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientContact", question: "Contacto Cliente" },
    { type: "toggle", subType: "twoColumns", side: "left", key: "PEL", question: "PEL", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "lightPPI", question: "PPI Luz", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPI", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: true},
    { type: "number", subType: "twoColumns", side: "right", key: "CUI", question: "CUI"},
    { type: "number", subType: "twoColumns", side: "left", key: "CPE", question: "CPE"},
    { type: "dateField", subType: "twoColumns", side: "left", key: "deliveryDate", question: "Data de Entrega" },
    { type: "dateField", subType: "twoColumns", side: "left", key: "signatureDate", question: "Data de assinatura" },
    { type: "text-area", subType: "twoColumns", side: "right", key: "observations", question: "Observações", initialValue: ''},
    
  ];

  return (
    <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD /></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={FIELDS}
          top
          bg="primary"
          isFullWidth
          btnLabel="Inserir Contrato"
        />
      <CornerRight><Corner /></CornerRight>
    </MainDiv>
  )
}

export default CreateContract;













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
//       key: "employeeOffice",
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