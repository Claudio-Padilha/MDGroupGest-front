import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import {
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight,
} from './styles';

import { SubHeading } from '../../components/Text/text';
import CForm from '../../components/Form/complexForm';
import { Corner, Corner180 } from '../../components/Corner/corner';
import { LogoMD } from '../../components/Logo/logo';
import request from '../../components/Form/request';
import { BackIcon } from '../../components/Icon/icons';

const CreateContract = (props) => {

  console.log(props, 'props from create contract');

  const typeOfContractFromProps = props?.location?.state?.typeOfContract;

  const cameFromChoice = props?.location?.state?.cameFromChoice;
  const feedbackCalls = props?.location?.state?.feedbackCall;
  const sellStates = props?.location?.state?.sellState;
  const paymentMethods = props?.location?.state?.payment;
  const gasScales = props?.location?.state?.gasScale;

  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;

  const handleSubmitForm = formFields => { _ConfirmContractCreation(formFields) };
  const history = useHistory();

  function _goBack() {
    cameFromChoice ? 
      window.location.assign("/ChooseTypeOfContract") :
      window.location.assign("/BackOffice") 
  }

  function _ConfirmContractCreation(data) {

    console.log(data, 'teste do data')

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    var employeeName = data?.employeeName;
    var clientName = data?.clientName ;
    var clientNif = data?.clientNif;
    var clientContact = data?.clientContact;
    var PELForElectricity = data?.PELForElectricity;
    var PELForDUAL = data?.PELDUAL;
    var MGIForGas = data?.MGIForGas;
    var MGIForDUAL = data?.MGIDUAL;
    var lightPPIDUAL = data?.lightPPIDUAL;
    var lightPPIForElectricity = data?.lightPPIForElectricity;
    var gasPPIDUAL = data?.gasPPIDUAL;
    var gasPPIForGas = data?.gasPPIForGas;
    var electronicBill = data?.electronicBill;
    var CUIForGas = data?.CUIForGas;
    var CUIDUAL = data?.CUIDUAL;
    var CPEForElectricity = data?.CPEForElectricity;
    var CPEDUAL = data?.CPEDUAL;
    var deliveryDate = data?.deliveryDate;
    var signatureDate = data?.signatureDate;
    var observations = data?.observations;
    var feedbackCall = data?.feedbackCall;
    var sellState = data?.sellState;
    var paymentMethods = data?.paymentMethods;
    var powerForElectricity = data?.powerForElectricity;
    var powerDUAL = data?.powerDUAL;
    var gasScaleDUAL = data?.gasScaleDUAL;
    var gasScaleForGas = data?.gasScaleForGas;

    var deliveryDateBeforeJSON = deliveryDate?.toJSON();
    var deliveryWorkedDate = deliveryDateBeforeJSON?.substring(0, 10);

    var signatureDateBeforeJSON = signatureDate?.toJSON();
    var signatureWorkedDate = signatureDateBeforeJSON?.substring(0, 10);

    const electricityMessage = `<b>Comercial:</b> ${employeeName ? employeeName : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>PEL:</b> ${PELForElectricity ? "Sim" : `Não`} <br>
    <b>PPI Luz:</b> ${lightPPIForElectricity ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CPE:</b> ${CPEForElectricity ? CPEForElectricity : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDate ? deliveryDate : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDate ? signatureDate : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Potência contratada:</b> ${powerForElectricity ? powerForElectricity : `❌`} <br>`; 

    const gasMessage = `<b>Comercial:</b> ${employeeName ? employeeName : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>MGI:</b> ${MGIForGas ? "Sim" : `Não`} <br>
    <b>PPI Gás:</b> ${gasPPIForGas ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CUI:</b> ${CUIForGas ? CUIForGas : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDate ? deliveryDate : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDate ? signatureDate : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Escalão Gás:</b> ${gasScaleForGas ? gasScaleForGas : `❌`} <br>`; 

    const dualMessage = `<b>Comercial:</b> ${employeeName ? employeeName : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>PEL:</b> ${PELForDUAL ? "Sim" : `Não`} <br>
    <b>MGI:</b> ${MGIForDUAL ? "Sim" : `Não`} <br>
    <b>PPI Luz:</b> ${lightPPIDUAL ? "Sim" : `Não`} <br>
    <b>PPI Gás:</b> ${gasPPIDUAL ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CUI:</b> ${CUIDUAL ? CUIDUAL : `❌`} <br>
    <b>CUI:</b> ${CUIForGas ? CUIForGas : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDate ? deliveryDate : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDate ? signatureDate : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Método de pagamento:</b> ${paymentMethods ? paymentMethods : `❌`} <br>
    <b>Potência Contratada:</b> ${powerDUAL ? powerDUAL : `❌`} <br>
    <b>Escalão Gás:</b> ${gasScaleDUAL ? gasScaleDUAL : `❌`} <br>`;

    const contractObj = {
      user: 5,
      office: currentOfficeID,
      delivery_date: deliveryWorkedDate,
      signature_date: signatureWorkedDate,
      employee_name: employeeName,
      client_name: clientName,
      client_nif: clientNif,
      client_contact: clientContact,
      electronic_bill: electronicBill ? electronicBill : false,
      cpe: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? CPEDUAL?.toString() : CPEForElectricity?.toString(),
      electricity_ppi: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? lightPPIDUAL ? lightPPIDUAL : false : lightPPIForElectricity ? lightPPIForElectricity : false,
      mgi: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? MGIForDUAL ? MGIForDUAL : false : MGIForGas ? MGIForGas : false,
      cui: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? CUIDUAL?.toString() : CUIForGas?.toString(),
      gas_ppi: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? gasPPIDUAL ? gasPPIDUAL : false : gasPPIForGas ? gasPPIForGas : false ,
      pel: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? PELForDUAL ? PELForDUAL : false : PELForElectricity ? PELForElectricity : false,
      observations: observations,
      feedback_call: feedbackCall,
      payment: paymentMethods,
      sell_state: sellState,
      power: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? powerDUAL : powerForElectricity,
      gas_scale: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? gasScaleDUAL : gasScaleForGas,
      contract_type: typeOfContractFromProps
    }

    function _currentConfirmationMessage() {
      switch (typeOfContractFromProps) {
        case "electricity":
        case "condominium_electricity":
          return electricityMessage;
  
        case "gas":
        case "condominium_gas":
          return gasMessage;
  
        case "dual":
        case "condominium_dual":
          return dualMessage;
      
        default:
          break;
      }
    }

      return (
        swalWithBootstrapButtons.fire({
        title: 'Confirme os dados inseridos: ',
        html: _currentConfirmationMessage(),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Refazer',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "'E isso!"
          if (result.isConfirmed) {
            await request.createContract(contractObj)
            .then(res => {
              const clientSideError = res?.message?.match(/400/g);
              const serverSideError = res?.message?.match(/500/g);

              if (clientSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Contrato não inserido, tente de novo. (Verifique os campos)',
                  'error'
                )
                
              } else if (serverSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Erro no servidor. Tente novamente mais tarde.',
                  'error'
                )
              } else {
                return swalWithBootstrapButtons.fire(
                  'Boa!',
                  'Contrato inserido com sucesso.',
                  'success'
                ).then(async (result) => {
                  if(result) {
                    await request.getContracts()
                    return history.push("/ContractList");
                  }
                });
              }
            })
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
    { type: "toggle", subType: "twoColumns", side: "left", key: "PELForElectricity", question: "PEL", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "lightPPIForElectricity", question: "PPI Luz", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "left", key: "CPEForElectricity", question: "CPE"},
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
      key: "powerForElectricity",
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
  ];

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
    { type: "toggle", subType: "twoColumns", side: "left", key: "MGIForGas", question: "MGI", booleanValue: false}, // MGI
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPIForGas", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "right", key: "CUIForGas", question: "CUI"},
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
      key: "gasScaleForGas",
      question: "Escalão Gás",
      options: gasScales
    },   
  ];

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
    { type: "toggle", subType: "twoColumns", side: "left", key: "PELDUAL", question: "PEL", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "MGIDUAL", question: "MGI", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "lightPPIDUAL", question: "PPI Luz", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPIDUAL", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBillDUAL", question: "Factura Electrónica", booleanValue: false},
    { type: "number", subType: "twoColumns", side: "right", key: "CUIDUAL", question: "CUI"},
    { type: "number", subType: "twoColumns", side: "left", key: "CPEDUAL", question: "CPE"},
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
      key: "powerDUAL",
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
      key: "gasScaleDUAL",
      question: "Escalão Gás",
      options: gasScales
    },   
  ];

  // switch para identificar tipo de contrato, fazendo match depois do _ de condominium
  // e depois usar um ternário para identificar se é condomínio ou não para mostrar 
  // a lista correta de potência 👇🏻
  const DYNAMICFORMFIELDS = useMemo(() => {
    switch (typeOfContractFromProps) {
      case "electricity":
      case "condominium_electricity":
        return ELECTRICITYFIELDS;

      case "gas":
      case "condominium_gas":
        return GASFIELDS;

      case "dual":
      case "condominium_dual":
        return DUALFIELDS;
    
      default:
        break;
    }
  }, [typeOfContractFromProps])

  return (
    <MainDiv>
      <BackIcon onClick={_goBack} color={"black"}/>
      
      <CornerLeft><Corner180 /></CornerLeft>
      <SubHeading>{props?.location?.state?.title}</SubHeading>
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
        <CForm 
          onSubmit={handleSubmitForm}
          formFields={DYNAMICFORMFIELDS}
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
