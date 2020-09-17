import React from 'react';
import CForm from '../../components/Form/complexForm';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight
} from './styles';

import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import Form from '../../components/Form/normalForm';
import request from '../../components/Form/request';

const CreateContract = () => {

  const handleSubmitForm = formFields => { console.log(formFields, '--> VOCÊ FOI AUTENTICADO COM SUCESSO!') };

  const firstPageFIELDS = [
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
    { type: "date", subType: "twoColumns", side: "left", key: "deliveryDate", question: "Data de Entrega" },
    { type: "date", subType: "twoColumns", side: "left", key: "signatureDate", question: "Data de assinatura" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientContact", question: "Contacto Cliente" },
  ];

  const secondPageFIELDS = [
    {type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica"},
    {type: "toggle", subType: "twoColumns", side: "left", key: "lightPPI", question: "PPI Luz"},
    {type: "toggle", subType: "twoColumns", side: "right", key: "gasPPI", question: "PPI Gas"},
    {type: "toggle", subType: "twoColumns", side: "left", key: "PEL", question: "PEL"},
    {type: "number", subType: "twoColumns", side: "right", key: "CUI", question: "CUI"},
    {type: "number", subType: "twoColumns", side: "left", key: "CPE", question: "CPE"},
    {type: "text-area", subType: "twoColumns", side: "right", key: "observations", question: "Observações"},
  ];

  return (
      <MainDiv>
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD /></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={secondPageFIELDS}
          top
          bg="primary"
          isFullWidth
          btnLabel="Inserir Comercial"
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