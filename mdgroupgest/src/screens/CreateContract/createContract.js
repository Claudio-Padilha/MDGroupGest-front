import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";

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
import { BackIcon } from '../../components/Icon/icons';

import { _executeValidationsIfHas } from '../../hooks/validation';
import contractsRequests from '../../hooks/requests/contractsRequests';
import dataRequests from '../../hooks/requests/dataRequests'

const CreateContract = (props) => {

  const _allEmployeesFromRAM = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [])

  function _allEmployees() {
    var allEmployees = []

    if(_allEmployeesFromRAM) {
      Object.values(_allEmployeesFromRAM).forEach(function(employeeType){
        employeeType.map(type => {
          if (type?.user?.user_type !== "secretary") {
            allEmployees.push({value: type?.user?.id, label: type?.user?.name})
          }
        })
      });
    }

    return allEmployees
  }

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, [1000]);

  const powersList = useMemo(() => {
    return props?.location?.state?.power
  }, [props]) 

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

  async function _ConfirmContractCreation(data) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    function _formatDate(date) {
      if (date !== undefined && date !== "") {
        var myDate = new Date(date);
        var month = [
          " de Janeiro de ",
          " de Fevereiro de ",
          " de Março de ",
          " de Abril de ",
          " de Maio de ",
          " de Junho de ",
          " de Julho de ",
          " de Agosto de ",
          " de Setembro de ",
          " de Outubro de ",
          " de Novembro de ",
          " de Dezembro de ",
        ][myDate.getMonth()];
        var str = myDate.getDate() + "" + month + "" + myDate.getFullYear();
        return str;
      }
      return "";
    }

    var user = data?.employeeName;
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

    var name = '';
    var nif = '';
    var nipc = '';
    var address = '';
    var contact = '';
    var email = '';
    var zipCode = '';

    const deliveryDateFormated = _formatDate(deliveryDate);
    const signatureDateFormated = _formatDate(signatureDate);

    var deliveryDateBeforeJSON = deliveryDate?.toJSON();
    var deliveryWorkedDate = deliveryDateBeforeJSON?.substring(0, 10);

    var signatureDateBeforeJSON = signatureDate?.toJSON();
    var signatureWorkedDate = signatureDateBeforeJSON?.substring(0, 10);

    await _executeValidationsIfHas(
      name,
      nif,
      nipc,
      address,
      contact,
      email,
      zipCode,
      clientName,
      clientNif,
      clientContact,
      CUIDUAL,
      CUIForGas,
      CPEDUAL,
      CPEForElectricity,
      observations
    )
    const formWasValidated = JSON.parse(localStorage.getItem('formWasValidated'));

    const electricityMessage = `<b>Comercial:</b> ${user ? user : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>PEL:</b> ${PELForElectricity ? "Sim" : `Não`} <br>
    <b>PPI Luz:</b> ${lightPPIForElectricity ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CPE:</b> ${CPEForElectricity ? CPEForElectricity : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDateFormated ? deliveryDateFormated : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDateFormated ? signatureDateFormated : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Potência contratada:</b> ${powerForElectricity ? powerForElectricity : `❌`} <br>`; 

    const gasMessage = `<b>Comercial:</b> ${user ? user : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>MGI:</b> ${MGIForGas ? "Sim" : `Não`} <br>
    <b>PPI Gás:</b> ${gasPPIForGas ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CUI:</b> ${CUIForGas ? CUIForGas : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDateFormated ? deliveryDateFormated : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDateFormated ? signatureDateFormated : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Escalão Gás:</b> ${gasScaleForGas ? gasScaleForGas : `❌`} <br>`; 

    const dualMessage = `<b>Comercial:</b> ${user ? user : `❌`} <br>
    <b>Cliente:</b> ${clientName ? clientName : `❌`} <br>                                               
    <b>NIF / NIPC:</b> ${clientNif ? clientNif : `❌`} <br>                                                               
    <b>Contacto Cliente:</b> ${clientContact ? clientContact : `❌`} <br>
    <b>PEL:</b> ${PELForDUAL ? "Sim" : `Não`} <br>
    <b>MGI:</b> ${MGIForDUAL ? "Sim" : `Não`} <br>
    <b>PPI Luz:</b> ${lightPPIDUAL ? "Sim" : `Não`} <br>
    <b>PPI Gás:</b> ${gasPPIDUAL ? "Sim" : `Não`} <br>
    <b>Factura Electrónica:</b> ${electronicBill ? "Sim" : `Não`} <br>
    <b>CUI:</b> ${CUIDUAL ? CUIDUAL : `❌`} <br>
    <b>Data de Entrega:</b> ${deliveryDateFormated ? deliveryDateFormated : `❌`} <br>
    <b>Data de Assinatura:</b> ${signatureDateFormated ? signatureDateFormated : `❌`} <br>
    <b>Observações:</b> ${observations ? clientContact : `❌`} <br>
    <b>Feedback da Chamada:</b> ${feedbackCall ? feedbackCall : `❌`} <br>
    <b>Estado da venda:</b> ${sellState ? sellState : `❌`} <br>
    <b>Método de pagamento:</b> ${paymentMethods ? paymentMethods : `❌`} <br>
    <b>Potência Contratada:</b> ${powerDUAL ? powerDUAL : `❌`} <br>
    <b>Escalão Gás:</b> ${gasScaleDUAL ? gasScaleDUAL : `❌`} <br>`;

    const contractObj = {
      user: user,
      office: currentOfficeID,
      delivery_date: deliveryWorkedDate,
      signature_date: signatureWorkedDate,
      client_name: clientName,
      client_nif: clientNif,
      client_contact: clientContact,
      electronic_bill: electronicBill ? electronicBill : false,
      cpe: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? CPEDUAL : CPEForElectricity,
      electricity_ppi: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? lightPPIDUAL ? lightPPIDUAL : false : lightPPIForElectricity ? lightPPIForElectricity : false,
      mgi: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? MGIForDUAL ? MGIForDUAL : false : MGIForGas ? MGIForGas : false,
      cui: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? CUIDUAL : CUIForGas,
      gas_ppi: typeOfContractFromProps === "electricity" ? null : typeOfContractFromProps === "dual" ? gasPPIDUAL ? gasPPIDUAL : false : gasPPIForGas ? gasPPIForGas : false ,
      pel: typeOfContractFromProps === "gas" ? null : typeOfContractFromProps === "dual" ? PELForDUAL ? PELForDUAL : false : PELForElectricity ? PELForElectricity : false,
      observations: observations,
      feedback_call: feedbackCall,
      payment: paymentMethods,
      sell_state: sellState,
      power: typeOfContractFromProps === "gas" || typeOfContractFromProps === "condominium_gas" ? null : typeOfContractFromProps === "dual" || typeOfContractFromProps === "condominium_dual"? powerDUAL : powerForElectricity,
      gas_scale: typeOfContractFromProps === "electricity" || typeOfContractFromProps === "condominium_electricity"? null : typeOfContractFromProps === "dual" || typeOfContractFromProps === "condominium_dual"? gasScaleDUAL : gasScaleForGas,
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
            await contractsRequests.createContract(contractObj)
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
                return swalWithBootstrapButtons.fire({
                  title: 'Boa!',
                  html: `Contrato inserido com sucesso. <br>                                               
                  Queres continuar a inserir?<br> `,
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonText: 'Sim!',
                  cancelButtonText: 'Não',
                  reverseButtons: true
                }).then(async (result) => {
                  if(result.isConfirmed) {
                    await contractsRequests.getContracts()
                    await dataRequests.getOfficeResults(currentOfficeID)
                    await dataRequests.getMySalary()
                    return history.push({pathname:"/ChooseTypeOfContract"});
                  } else if(!result.isConfirmed) {
                    await contractsRequests.getContracts()
                    await dataRequests.getOfficeResults(currentOfficeID)
                    await dataRequests.getMySalary()
                    return history.push({
                      pathname: "/BackOffice",
                    });
                    // window.location.assign("/ContractList");
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
      options: _allEmployees() 
  },
    { type: "text", subType: "twoColumns", side: "right", key: "clientName", question: "Nome do Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientNif", question: "NIF / NIPC Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientContact", question: "Contacto Cliente" },
    { type: "toggle", subType: "twoColumns", side: "left", key: "PELForElectricity", question: "PEL", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "lightPPIForElectricity", question: "PPI Luz", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "text", subType: "twoColumns", side: "left", key: "CPEForElectricity", question: "CPE"},
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
      options: powersList,
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
      options: _allEmployees() 
  },
    { type: "text", subType: "twoColumns", side: "right", key: "clientName", question: "Nome do Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientNif", question: "NIF / NIPC Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientContact", question: "Contacto Cliente" },
    { type: "toggle", subType: "twoColumns", side: "left", key: "MGIForGas", question: "MGI", booleanValue: false}, // MGI
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPIForGas", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBill", question: "Factura Electrónica", booleanValue: false},
    { type: "text", subType: "twoColumns", side: "right", key: "CUIForGas", question: "CUI"},
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
      options: _allEmployees() 
  },
    { type: "text", subType: "twoColumns", side: "right", key: "clientName", question: "Nome do Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientNif", question: "NIF / NIPC Cliente" },
    { type: "number", subType: "twoColumns", side: "right", key: "clientContact", question: "Contacto Cliente" },
    { type: "toggle", subType: "twoColumns", side: "left", key: "PELDUAL", question: "PEL", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "MGIDUAL", question: "MGI", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "left", key: "lightPPIDUAL", question: "PPI Luz", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "gasPPIDUAL", question: "PPI Gas", booleanValue: false},
    { type: "toggle", subType: "twoColumns", side: "right", key: "electronicBillDUAL", question: "Factura Electrónica", booleanValue: false},
    { type: "text", subType: "twoColumns", side: "right", key: "CUIDUAL", question: "CUI"},
    { type: "text", subType: "twoColumns", side: "left", key: "CPEDUAL", question: "CPE"},
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
      options: powersList,
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

  return ( isLoading ?
    <MainDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SwishSpinner size={200} color="#686769" loading={isLoading} />
    </MainDiv>
    :
    <MainDiv>
      <BackIcon onClick={_goBack} />
      
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
