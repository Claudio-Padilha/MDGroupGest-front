import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import Swal from 'sweetalert2';

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon } from '../../components/Icon/icons';

import request from '../../components/Form/request'

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


  const history = useHistory();

  const renderContract = () => {
    return (
      <>
        <List.Item className={isDeleting ? "hideContract" : "contract"}>
          <Heading>{`Contrato nº: ${contractNumber}`}</Heading>       
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
