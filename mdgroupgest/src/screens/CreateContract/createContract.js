import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight,
} from './styles';

import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import request from '../../components/Form/request';
import { BackIcon } from '../../components/Icon/icons';

const CreateContract = (props) => {

  console.log(props, 'props from create contract')

  const typeOfContractFromProps = props?.location?.state?.type;

  const cameFromChoice = props?.location?.state?.cameFromChoice;
  const feedbackCalls = props?.location?.state?.feedbackCall;
  const sellStates = props?.location?.state?.sellState;
  const paymentMethods = props?.location?.state?.payment;
  const gasScales = props?.location?.state?.gasScale;

  const handleSubmitForm = formFields => { _ConfirmContractCreation(formFields) };
  const history = useHistory();

  function _goBack() {
    cameFromChoice ? 
      window.location.assign("/ChooseTypeOfContract") :
      window.location.assign("/BackOffice") 
  }

  function _ConfirmContractCreation(data) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    var employeeName = data?.employeeName;
    var clientName = data?.clientName ;
    var clientNIF = data?.clientNif;
    var clientContact = data?.clientContact;
    var pel = data?.PEL;
    var lightPPI = data?.lightPPI;
    var gasPPI = data?.gasPPI;
    var electronicBill = data?.electronicBill;
    var cui = data?.CUI;
    var cpe = data?.CPE;
    var deliveryDate = data?.deliveryDate;
    var signatureDate = data?.signatureDate;
    var observations = data?.observations;
    var feedbackCall = data?.feedbackCall;
    var sellState = data?.sellState;
    var employeeComission = data?.comission;
    var power = data?.power;
    var gasScale = data?.gasScale;
    // var deliveryDate = data?.deliveryDate.toJSON();
    // var deliveryWorkedDate = deliveryDate.substring(0, 9);

    // var signatureDate = data?.signatureDate.toJSON();
    // var signatureWorkedDate = signatureDate.substring(0, 9);

      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados do contrato:',
        html: 
         `<b>Comercial:</b> ${employeeName ? employeeName : `❌`} <br>
          <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
          <b>NIF / NIPC:</b> ${clientNIF ? clientNIF : `❌`} <br>                                                               
          <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
          <b>PEL:</b> ${pel ? "Sim" : `Não`} <br>
          <b>PPI Luz:</b> ${lightPPI ? "Sim" : `Não`} <br>
          <b>PPI Gás:</b> ${gasPPI ? "Sim" : `Não`} <br>
          <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
          <b>CUI:</b> ${cui ? cui : `❌`} <br>
          <b>CPE:</b> ${cpe ? cpe : `❌`} <br>
          <b>Data de Entrega:</b> ${deliveryDate ? deliveryDate : `❌`} <br>
          <b>Data de Assinatura:</b> ${signatureDate ? signatureDate : `❌`} <br>
          <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
          <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
          <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
          <b>Comissão:</b> ${employeeComission ? employeeComission : `❌`} <br>
          <b>Potência contratada:</b> ${power ? power : `❌`} <br>
          <b>Escalão Gás:</b> ${gasScale ? gasScale : `❌`} <br>` 
        ,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then((result) => {

        // "result.isConfimed significa clicar em "'E isso!"
          if (result.isConfirmed) {
            try {
              request.createContract(data);
              swalWithBootstrapButtons.fire(
                'Boa!',
                'Contrato inserido com sucesso.',
                'success'
              ).then(async (result) => {
                if(result) {
                  await request.getContracts()
                  return history.push("/ContractList");
                }
              });
              
            } catch (error) {
              swalWithBootstrapButtons.fire(
                'Erro',
                `${error}`,
                'error'
              )
            }
 
        // "!result.isConfimed significa clicar em "Refazer" 
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

  const ELECTRICITYFIELDS = [
    { 
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o nome",
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
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "left", key: "CPE", question: "CPE"},
    { type: "dateField", subType: "twoColumns", side: "left", key: "deliveryDate", question: "Data de Entrega", date: null },
    { type: "dateField", subType: "twoColumns", side: "left", key: "signatureDate", question: "Data de assinatura", date: null },
    { type: "text-area", subType: "twoColumns", side: "left", key: "observations", question: "Observações" },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o tipo",
      side: "right",
      key: "feedbackCall",
      question: "Feedback de Chamada",
      options: feedbackCalls
    },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o estado",
      side: "left",
      key: "sellState",
      question: "Estado da venda",
      options: sellStates
    },

    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "right",
      key: "paymentMethods",
      question: "Método de Pagamento",
      options: paymentMethods
    },   
    
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "left",
      key: "power",
      question: "Potência contratada",
      options: [
        {
          value: 1.15,
          label: "1.15 kVA"
        },
        {
          value: 3.45,
          label: "3.45 kVA"
        },
        {
          value: 4.6,
          label: "4.6 kVA"
        },
        {
          value: 5.75,
          label: "5.75 kVA"
        },
        {
          value: 6.9,
          label: "6.9 kVA"
        },
        {
          value: 10.35,
          label: "10.35 kVA"
        },
        {
          value: 13.8,
          label: "13.8 kVA"
        },
        {
          value: 17.25,
          label: "17.25 kVA"
        },
        {
          value: 20.7,
          label: "20.7 kVA"
        },
        {
          value: 27.6,
          label: "27.6 kVA"
        },
        {
          value: 34.5,
          label: "34.5 kVA"
        },
        {
          value: 41.41,
          label: "41.41 kVA"
        }
      ] 
    },
  ]

  const GASFIELDS = [
    { 
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o nome",
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
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPI", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "right", key: "CUI", question: "CUI"},
    { type: "dateField", subType: "twoColumns", side: "left", key: "deliveryDate", question: "Data de Entrega", date: null },
    { type: "dateField", subType: "twoColumns", side: "left", key: "signatureDate", question: "Data de assinatura", date: null },
    { type: "text-area", subType: "twoColumns", side: "left", key: "observations", question: "Observações" },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o tipo",
      side: "right",
      key: "feedbackCall",
      question: "Feedback de Chamada",
      options: feedbackCalls
    },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o estado",
      side: "left",
      key: "sellState",
      question: "Estado da venda",
      options: sellStates
    },

    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "right",
      key: "paymentMethods",
      question: "Método de Pagamento",
      options: paymentMethods
    },   
    
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "right",
      key: "gasScale",
      question: "Escalão Gás",
      options: gasScales
    },   
  ]

  const DUALFIELDS = [
    { 
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o nome",
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
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "right", key: "CUI", question: "CUI"},
    { type: "number", subType: "twoColumns", side: "left", key: "CPE", question: "CPE"},
    { type: "dateField", subType: "twoColumns", side: "left", key: "deliveryDate", question: "Data de Entrega", date: null },
    { type: "dateField", subType: "twoColumns", side: "left", key: "signatureDate", question: "Data de assinatura", date: null },
    { type: "text-area", subType: "twoColumns", side: "left", key: "observations", question: "Observações" },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o tipo",
      side: "right",
      key: "feedbackCall",
      question: "Feedback de Chamada",
      options: feedbackCalls
    },
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Escolha o estado",
      side: "left",
      key: "sellState",
      question: "Estado da venda",
      options: sellStates
    },

    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "right",
      key: "paymentMethods",
      question: "Método de Pagamento",
      options: paymentMethods
    },   
    
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "left",
      key: "power",
      question: "Potência contratada",
      options: [
        {
          value: 1.15,
          label: "1.15 kVA"
        },
        {
          value: 3.45,
          label: "3.45 kVA"
        },
        {
          value: 4.6,
          label: "4.6 kVA"
        },
        {
          value: 5.75,
          label: "5.75 kVA"
        },
        {
          value: 6.9,
          label: "6.9 kVA"
        },
        {
          value: 10.35,
          label: "10.35 kVA"
        },
        {
          value: 13.8,
          label: "13.8 kVA"
        },
        {
          value: 17.25,
          label: "17.25 kVA"
        },
        {
          value: 20.7,
          label: "20.7 kVA"
        },
        {
          value: 27.6,
          label: "27.6 kVA"
        },
        {
          value: 34.5,
          label: "34.5 kVA"
        },
        {
          value: 41.41,
          label: "41.41 kVA"
        }
      ] 
    },   
    
    {
      type: "dropdown",
      subType: "twoColumns",
      placeholder: "Selecione",
      side: "right",
      key: "gasScale",
      question: "Escalão Gás",
      options: gasScales
    },   
  ];

  const typeOfContractForm = useMemo(() => {
    switch (typeOfContractFromProps) {
      case "electricity":
        return ELECTRICITYFIELDS;

      case "gas":
        return GASFIELDS;

      case "dual":
        return DUALFIELDS;
    
      default:
        break;
    }
  }, [typeOfContractFromProps])

  console.log(typeOfContractForm, 'type of contract')

  // switch para identificar qual contrato tipo de contrato será inserido, mudando a lógica do form

  return (
    <MainDiv>
      <BackIcon onClick={_goBack} color={"black"}/>
      
      <CornerLeft><Corner180 /></CornerLeft>
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={DUALFIELDS}
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
