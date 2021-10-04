import React, { useState, useMemo, useReducer, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Col } from 'react-bootstrap'
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit"
import Swal from 'sweetalert2'
import { List } from "semantic-ui-react"

import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import { MenuItem } from "@material-ui/core"

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text'
import { LogoMD } from '../../components/Logo/logo'
import Button from "../../components/Button/button"
import { BackIcon, EditIcon } from '../../components/Icon/icons'
import SwitchButton from "../../components/ToggleComponent/toggleButton"

import { useRefresh } from '../../hooks/window/refresh'
import contractsRequests from "../../hooks/requests/contractsRequests"
import dataRequests from '../../hooks/requests/dataRequests'

import CONSTANTS from '../../constants'
import {
  MainContainer,
  Row,
  Column,
  LogoContainer,
  WidthMessageContainer
} from "./styles"

import './styles.css'

const ContractDetail = (props) => {

  const [isLoading, setIsLoading] = useState(true)
  const [maintainState, setMaintainState] = useState(false)
  const history = useHistory()

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500])
  }

  const { wasRefreshed } = useRefresh()

  useEffect(() => {
    if(!wasRefreshed && maintainState) {
      window.location.reload()
    }    
  }, [wasRefreshed, maintainState])

  const optionsSellState = JSON.parse(localStorage.getItem('sellStates'))
  optionsSellState.forEach(el => el['value'] = el.id)
  const optionsGasScale = JSON.parse(localStorage.getItem('gasScales'))
  optionsGasScale.forEach(el => el['value'] = el.id)
  const optionsFeedbackCall = JSON.parse(localStorage.getItem('feedbackCalls'))
  optionsFeedbackCall.forEach(el => el['value'] = el.id)
  const optionsPower = JSON.parse(localStorage.getItem('powerList'))
  optionsPower.forEach(el => el['value'] = el.id)

  const propsState = props?.location?.state;
  const cameFromList = propsState?.cameFromList

  const initialState = {
    contractNumber: propsState?.contractNumber,
    contractsToReturn: propsState?.contractsToReturn,
    currentContract: propsState?.data,
    contractFromEdit: propsState?.contractFromEdit,
    cameFromEdit: propsState?.cameFromEdit
  }

  useEffect(() => {
    if(cameFromList) {
      localStorage.setItem('contractDetailScreenState', JSON.stringify(initialState))
      window.location.reload()
    }
  }, [cameFromList])

  
  const reducer = (firstState, action) => {
    let reducerState = {}

    const stateOnRAM = JSON.parse(localStorage.getItem('contractDetailScreenState'))

    switch(action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
    }

    localStorage.removeItem('contractDetailScreenState')
    localStorage.setItem('contractDetailScreenState', JSON.stringify(reducerState))

    return reducerState
  }

  const [stateOfCurrentContract, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(cameFromList) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return stateOfCurrentContract
    }
  }, [wasRefreshed, cameFromList])

  const contract = useMemo(() => { 
    return stateOfCurrentContract?.cameFromEdit ? stateOfCurrentContract?.contractFromEdit : stateOfCurrentContract?.currentContract
  }, [stateOfCurrentContract]);

  
  const contractID = useMemo(() => {
    return stateOfCurrentContract?.currentContract?.id;
  }, [stateOfCurrentContract]);

  const contractsToReturn = useMemo(() => {
    return stateOfCurrentContract?.contractsToReturn
  }, [stateOfCurrentContract])

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentOfficeID = currentUser?.user?.office;

  const contractType = useMemo(() => {
    switch (contract?.contract_type) {
      case "dual":
        return "Dual"
      case "gas":
        return "Gás"
      case "electricity":
        return "Electricidade"
      case "condominium_dual":
        return "Dual Condomínio"
      case "condominium_gas":
        return "Gás Condomínio"
      case "condominium_electricity":
        return "Electricidade Condomínio"
    
      default:
        break;
    }
  }, [contract])

  const state = useMemo(() => {
    if(contract?.sell_state__name === "ok") {
      return "🟢";
    } else if (contract?.sell_state__name === "r") {
      return "🟡";
    } else {
      return "🔴";
    }
  }, [contract])

  const stateMessage = useMemo(() => {
    if(contract?.sell_state__name === "ok") {
      return "Válido";
    } else if (contract?.sell_state__name === "r") {
      return "Por recuperar";
    } else {
      return "Anulado";
    }
  }, [contract])

  const [isDeleting, setIsDeleting] = useState(false);

  const typeContainsElectricity = 
    (
      contractType === "Dual" || 
      contractType === "Electricidade" || 
      contractType === "Dual Condomínio" || 
      contractType === "Electricidade Condomínio"
    )

  const typeContainsGas = 
    (
      contractType === "Dual" || 
      contractType === "Gás" || 
      contractType === "Dual Condomínio" || 
      contractType === "Gás Condomínio"
    )

  async function _goBack() {
    history.push({
      pathname: "/ContractList",
      state: {
        cameFromDetail: true,
        contractsToReturn,
      }
    })    
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
          contractsRequests.deleteContract(contractID) 
          .then(async () => {
            await dataRequests.getOfficeResults(currentOfficeID)
            await dataRequests.getMySalary()
            contractsRequests.monthContracts(currentOfficeID).then(
              swalWithBootstrapButtons.fire(
                'Contrato Apagado!',
                'A operação foi concluída com sucesso.',
                'success'
              ).then(history.push({
                pathname: "/ContractList",
                state: {
                  fromDelete: true,
                  deletedID: contractID,
                  cameFromDetailUpdate: true,
                  contractsToReturnFromDelete: contractsToReturn,
                }
              }))
            )
            })

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
        icon: `${contract?.sell_state__name === "r" ? "warning" : "error"}`,
        confirmButtonText: 'Entendi',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) return null
      })
    )
  }

  const renderContract = () => {

    return (
      <>
        <List.Item className={isDeleting ? "hideContract" : "contract"}>
          <Column style={{ width: '80%', display: 'flex', justifyContent: 'space-between'}}>
            <Heading style={{marginBottom: '0'}}>{contract?.user__name}</Heading>
            <Heading style={{marginTop: '-1vh'}}>
              <span style={{ 
                  borderBottom: '2px solid',
                  borderBottomColor: `${CONSTANTS?.colors?.black}`
                }}
              >
                {contract?.signature_date}
              </span>
            </Heading>
            <EditIcon
              color={"black"}
              onClick={() => 
                history.push(
                  {
                    pathname: '/contractEdit',
                    state: {
                      cameFromDetail: true,
                      contractFromDetail: contract
                    }
                  }
                )
              }
              style={{ width: '3%', height: '5%', position: 'absolute', top: '15%', left: '75%'}}/>
          </Column> 
          <Row>
            <Body style={
              {
                fontWeight: "bold",
                marginLeft: 5,
                marginTop: -30,
                marginBottom: 40,
                textShadow: "2px 2px 4px rgba(200, 200, 200, 0.8)"
              }
            }>{`Estado: ${state}`}</Body>   
            <Body style={
              {
                fontSize: 14,
                marginLeft: 10,
                marginTop: -30,
                marginBottom: 40,
              }
            }>{stateMessage}</Body>
            { contract?.sell_state__name !== "ok" && 
              <Body 
                style={
                  {
                    fontSize: 12,
                    textShadow: "8px 8px 12px rgba(230, 230, 230, 0.9)",
                    color: `${CONSTANTS?.colors?.brand?.blue}`,
                    fontWeight: "bold",
                    marginLeft: 20,
                    marginTop: -30,
                    cursor: "pointer",
                    marginBottom: 40,
                  }
                }
                onClick={_detailsOfSellState}
              >Ver motivo</Body>
            }
            <Body
              style={
                {
                  fontSize: 14,
                  textShadow: "8px 8px 12px rgba(230, 230, 230, 0.9)",
                  color: `${CONSTANTS?.colors?.black}`,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginTop: -30,
                  marginBottom: 40,
                }
              }>({contractType})</Body>
          </Row>


          <List.Content>

              <Column className={"firstColumn"}> 
                <Row className={"firstRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Cliente:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_name || ''} `}</Body>

                    <SmallSubHeading><b>NIF / NIPC:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_nif || ''}`}</Body>

                    <SmallSubHeading><b>Contacto:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.client_contact || ''}`}</Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>Data de entrega:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.delivery_date || ''}`}</Body>

                    <SmallSubHeading><b>Data de assinatura:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.signature_date || ''}`}</Body>

                    <SmallSubHeading><b>Tipo de pagamento:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.payment__name || ''}`}</Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>
                  <Column>
                    <SmallSubHeading><b>Fatura Electrónica:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.electronic_bill ? "🟢" : "🔴"}`}</Body>

                  {(contract?.contract_type === 'electricity' || contract?.contract_type === 'dual' || contract?.contract_type === 'condominium_electricity') &&
                    <>
                      <SmallSubHeading><b>PPI Luz:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.electricity_ppi ? "🟢" : "🔴"}`}</Body>
                    </>
                  }
                  </Column>

                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start', marginTop: '3%'} : {}}>
                  {(contract?.contract_type === 'gas' || contract?.contract_type === 'dual' || contract?.contract_type === 'condominium_gas') &&
                    <>
                      <SmallSubHeading><b>PPI Gás:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.gas_ppi ? "🟢" : "🔴"}`}</Body>
                    </>
                  }

                  {(contract?.contract_type === 'gas' || contract?.contract_type === 'dual' || contract?.contract_type === 'condominium_gas') &&
                    <>
                      <SmallSubHeading><b>MGI:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.mgi ? "🟢" : "🔴"}`}</Body>
                    </>
                  }

                  {(contract?.contract_type === 'electricity' || contract?.contract_type === 'dual' || contract?.contract_type === 'condominium_electricity') &&
                    <>
                      <SmallSubHeading><b>PEL:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.pel ? "🟢" : "🔴"}`}</Body>
                    </>
                  }
                  </Column>
                </Row>
              </Column>

              <Column className={"secondColumn"}> 
                <Row className={"firstRowInsideFirstColumn"}>  
                  {/* <Column>
                    <SmallSubHeading><b>Comercial:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.user__name || ''}`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column> */}

                  <Column>
                    <SmallSubHeading><b>Comissão: </b></SmallSubHeading>
                    <Body className={"fieldComission"}>{ contract?.sell_state__name !== 'ok' ? '0€' : ` +${contract?.employee_comission}€`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>  
                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start'} : {}}>
                    <SmallSubHeading style={{marginRight: '1vw'}}><b>Estado da venda:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.sell_state__name || ''}`}</Body>

                    {(typeContainsGas) && 
                      <>
                        <SmallSubHeading><b>Escalão Gás:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.gas_scale__name || ''}`}</Body>
                      </>
                    }


                    {(typeContainsGas) && 
                      <>
                        <SmallSubHeading><b>CUI:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.cui || ''}`}</Body>  
                      </>
                    }

                  </Column>

                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start'} : {}}>
                    <SmallSubHeading><b>Feedback Call:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.feedback_call || ''}`}</Body>

                    {(typeContainsElectricity) && 
                      <>
                        <SmallSubHeading><b>Potência:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${ contract?.dynamic_power !== null ? `${contract?.dynamic_power} kVA` : `${contract?.power__name} kVA`}`}</Body>                     
                      </>
                    }


                    {(typeContainsElectricity) && 
                      <>
                        <SmallSubHeading><b>CPE:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.cpe || ''}`}</Body>                      
                      </>
                    }

                  </Column>
                </Row>
              </Column>
          </List.Content>
          <Column className={"optionsAboutContract"}>

            <Button
              disabled={false}
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
  }

  return (
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer id={"mainContainer"}>
        <BackIcon onClick={_goBack} />
          {
            isLoading ?
            <MainContainer>
              <SwishSpinner size={200} color="#686769" loading={isLoading} />
            </MainContainer> : 
            renderContract()
          }
        <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
      </MainContainer>
    </>
  )

};

export default ContractDetail;
