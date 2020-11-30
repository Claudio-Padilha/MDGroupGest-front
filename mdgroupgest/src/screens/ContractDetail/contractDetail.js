import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Swal from 'sweetalert2';

import { Heading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon } from '../../components/Icon/icons';

import request from '../../components/Form/request';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  Row,
  Column,
  LogoContainer
} from "./styles";

import { List } from "semantic-ui-react";

const ContractDetail = (props) => {
  const contract = props?.location?.state?.data;
  const contractNumber = props?.location?.state?.contractNumber;
  const contractID = props?.location?.state?.data?.id;

  const state = useMemo(() => {
    if(contract?.sell_state === "ok") {
      return "🟢";
    } else if (contract?.sell_state === "r") {
      return "🟡";
    } else {
      return "🔴";
    }
  }, [contract])


  const stateMessage = useMemo(() => {
    if(contract?.sell_state === "ok") {
      return "Válido";
    } else if (contract?.sell_state === "r") {
      return "Por recuperar";
    } else {
      return "Anulado";
    }
  }, [contract])

  console.log(contract, 'contrato')

  const [isDeleting, setIsDeleting] = useState(false);

  function _goBack() {
    window.location.assign("/ContractList");    
  }

  function _confirmToDeleteContract() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    setIsDeleting(true);
    
    return (
      swalWithBootstrapButtons.fire({
        title: 'Tem certeza?',
        text: "Não poderá voltar atrás.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não, cancelar',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          request.deleteContract(contractID) 
          .then(
            request.getContracts().then(
              swalWithBootstrapButtons.fire(
                'Contrato Apagado!',
                'A operação foi concluída com sucesso.',
                'success'
              ).then(history.push({
                pathname: "/ContractList",
                state: {
                  fromDelete: true,
                  deletedID: contractID
                }
              }))
            )
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          setIsDeleting(false)
          swalWithBootstrapButtons.fire(
            'Ação cancelada!',
            'Seu contrato está a salvo.',
            'error'
          )
        }
      })
    )
  }

  function _detailsOfSellState() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-info',
      },
      buttonsStyling: true
    })
    
    return (
      swalWithBootstrapButtons.fire({
        className: 'details',
        title: `Contrato ${stateMessage.toLowerCase()} ${state}`,
        html: 
        `<b>Problemas com este contrato:</b><br>
        ${contract?.observations}`,
        icon: `${contract?.sell_state === "r" ? "warning" : "error"}`,
        confirmButtonText: 'Entendi',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('test from ok')
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) return null
      })
    )
  }

  const history = useHistory();

  const renderContract = () => {
    return (
      <>
        <List.Item className={isDeleting ? "hideContract" : "contract"}>

          <Heading>{`Contrato nº: ${contractNumber}`}</Heading>
          <Row>
            <Body style={
              {
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: -35,
                marginBottom: 40,
                textShadow: "2px 2px 4px rgba(200, 200, 200, 0.8)"
              }
            }>{`Estado: ${state}`}</Body>   
            <Body style={
              {
                fontSize: 14,
                marginLeft: 10,
                marginTop: -35,
                marginBottom: 40,
              }
            }>{stateMessage}</Body>
            { contract?.sell_state !== "ok" && 
              <Body 
                style={
                  {
                    fontSize: 12,
                    textShadow: "8px 8px 12px rgba(230, 230, 230, 0.9)",
                    color: `${CONSTANTS?.colors?.black}`,
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginTop: -34,
                    cursor: "pointer",
                    marginBottom: 40,
                  }
                }
                onClick={_detailsOfSellState}
              >Ver motivo</Body>
            }
          </Row>


          <List.Content>

              <Column className={"firstColumn"}> 
                <Row className={"firstRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Cliente:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_name}`}</Body>

                    <SmallSubHeading><b>NIF / NIPC:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_nif}`}</Body>

                    <SmallSubHeading><b>Contacto:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_contact}`}</Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>Data de entrega:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.delivery_date}`}</Body>

                    <SmallSubHeading><b>Data de assinatura:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.signature_date}`}</Body>

                    <SmallSubHeading><b>Tipo de pagamento:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.payment}`}</Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Fatura Electrónica:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.electronic_bill ? "🟢" : "🔴"}`}</Body>

                    <SmallSubHeading><b>PPI Luz:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.electricity_ppi ? "🟢" : "🔴"}`}</Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>PPI Gás:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.gas_ppi ? "🟢" : "🔴"}`}</Body>

                    <SmallSubHeading><b>PEL:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.pel ? "🟢" : "🔴"}`}</Body>
                  </Column>
                </Row>
              </Column>

              <Column className={"secondColumn"}> 
                <Row className={"firstRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Comercial:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.employee_name}`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>Comissão:</b></SmallSubHeading>
                    <Body className={"fieldComission"}>{` +${contract?.employee_comission}€`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Estado da venda:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.sell_state}`}</Body>

                    <SmallSubHeading><b>Escalão Gás:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.gas_scale}`}</Body>

                    <SmallSubHeading><b>CUI:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.cui}`}</Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>Feedback Call:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.feedback_call}`}</Body>

                    <SmallSubHeading><b>Potência:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.power} kVA`}</Body>

                    <SmallSubHeading><b>CPE:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.cpe}`}</Body>
                  </Column>
                </Row>
              </Column>
          </List.Content>
          <Column className={"optionsAboutContract"}>

            <Button
              disabled={false}
              // action={() => {
              //   Promise.all([
              //     request.deleteContract(contract?.id),
              //     request.getOffices(),
              //   ])
              // }}
              action={_confirmToDeleteContract}
              small={true}
              text="Apagar"
              className={"secondaryButton"}
            />
          </Column>
          
        </List.Item>
        <Divider />
      </>
    );
  };

  return (
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} color={"black"}/>
        {renderContract()}
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
    </MainContainer>
  )

};

export default ContractDetail;
