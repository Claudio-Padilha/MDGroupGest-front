import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { Col } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import InputAdornment from '@material-ui/core/InputAdornment';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';


import Swal from 'sweetalert2';

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon, EditIcon } from '../../components/Icon/icons';
import SwitchButton from "../../components/ToggleComponent/toggleButton";

import contractsRequests from "../../hooks/requests/contractsRequests";
import dataRequests from '../../hooks/requests/dataRequests'

import ContractEdit from '../ContractEdit/contractEdit';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  Row,
  Column,
  LogoContainer
} from "./styles";

import { List } from "semantic-ui-react";
import { Field } from "formik";
import employeesRequests from "../../hooks/requests/employeesRequests";
import { MenuItem } from "@material-ui/core";


const ContractDetail = (props) => {

 // Select Variables

 const optionsSellState = JSON.parse(localStorage.getItem('sellStates'))
  optionsSellState.forEach(el => el['value'] = el.id)
  const optionsGasScale = JSON.parse(localStorage.getItem('gasScales'))
  optionsGasScale.forEach(el => el['value'] = el.id)
  const optionsFeedbackCall = JSON.parse(localStorage.getItem('feedbackCalls'))
  optionsFeedbackCall.forEach(el => el['value'] = el.id)
  const optionsPower = JSON.parse(localStorage.getItem('powerList'))
  optionsPower.forEach(el => el['value'] = el.id)


 const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: CONSTANTS?.colors?.lightGrey,
    height: '100%'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const [isLoading, setIsLoading] = useState(true);

if (isLoading) {
  setTimeout(() => {
    setIsLoading(false)
  }, [500]);
}

const Transition = React.forwardRef(function Transition(props, ref) {

  return <Slide direction="up" ref={ref} {...props} />

});

const classes = useStyles();
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  window.location.reload();
};


// end modal

  const contract = props?.location?.state?.data;
  const contractNumber = props?.location?.state?.contractNumber;
  const contractID = props?.location?.state?.data?.id;

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

  console.log(contractType === "Dual Condomínio")

  const state = useMemo(() => {
    if(contract?.sell_state__name === "ok") {
      return "🟢";
    } else if (contract?.sell_state__name === "r") {
      return "🟡";
    } else {
      return "🔴";
    }
  }, [contract])

  function updateContract (event) {
    event.preventDefault()
    let contractData = {
      id: contract.id,
    }

    if (document.getElementById("name").value !== "") {
      contractData = {...contractData, ...{client_name: document.getElementById("name").value}}
    }else if (document.getElementById("nif").value !== "") {
      contractData = {...contractData, ...{client_nif: document.getElementById("nif").value}}
    }else if (document.getElementById("contact").value !== "") {
      contractData = {...contractData, ...{client_contact: document.getElementById("contact").value}}
    }else if (document.getElementById("delivery_date").value !== "") {
      contractData = {...contractData, ...{delivery_date: document.getElementById("delivery_date").value}}
    }else if (document.getElementById("signature_date").value !== "") {
      contractData = {...contractData, ...{signature_date: document.getElementById("signature_date").value}}
    }

    contractsRequests.updateContract(contractData)
  }


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

  const typeContainsElectricity = (contractType === "Dual" || 
                                 contractType === "Electricidade" || 
                                 contractType === "Dual Condomínio" || 
                                 contractType === "Electricidade Condomínio");

const typeContainsGas = (contractType === "Dual" || 
                          contractType === "Gás" || 
                          contractType === "Dual Condomínio" || 
                          contractType === "Gás Condomínio");

  function _goBack() {
    contractsRequests.getContracts(currentOfficeID);
    const contractsToReturn = JSON.parse(localStorage.getItem('contracts'));
    history.push({
      pathname: "/ContractList",
      state: {
        cameFromDetail: true,
        contractsToReturn: contractsToReturn,
      }
    })    
  }

  function _confirmToDeleteContract() {
    contractsRequests.getContracts(currentOfficeID);
    const contractsToReturn = JSON.parse(localStorage.getItem('contracts'));
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
            contractsRequests.getContracts().then(
              swalWithBootstrapButtons.fire(
                'Contrato Apagado!',
                'A operação foi concluída com sucesso.',
                'success'
              ).then(history.push({
                pathname: "/ContractList",
                state: {
                  fromDelete: true,
                  deletedID: contractID,
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
          console.log('test from ok')
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) return null
      })
    )
  }

  function _handleNavigationToEdit() {
    history.push({
      pathname: "/ContractEdit",
      state: {
        contractToEdit: contract
      }
    })
  }

  const history = useHistory();
  const [nif, setNif] = useState('');

  // tentar sem use state, função na mão
  function _ConfirmContractActivation(contract) {
    const sellStateID = () => {
      const sellStatesOnRAM = JSON.parse(localStorage.getItem('sellStates'));
      const sellStateMatched = sellStatesOnRAM.find(sellState => { return sellState?.name === 'ok' })
      return sellStateMatched
    }

    console.log(sellStateID(), 'TESTEZAÇO')

    const sellStateIDTOActivate = sellStateID()?.id;

    console.log(sellStateIDTOActivate, 'ID')

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

      return (
        swalWithBootstrapButtons.fire({
        title: 'Tem certeza?',
        html: 
          `Não é possível desativar um contrato.<br>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'É isso!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then(async (result) => {

        // "result.isConfimed significa clicar em "É isto"
          if (result.isConfirmed) {
            await contractsRequests.updateContract({id: contract?.id, sell_state: sellStateIDTOActivate})
            .then(async (res) => {
              await contractsRequests.getContracts(currentOfficeID)
              const clientSideError = res?.message?.match(/400/g);
              const serverSideError = res?.message?.match(/500/g);

              if(clientSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Algo correu mal... tente de novo.',
                  'error'
                )
              } else if (serverSideError) {
                return swalWithBootstrapButtons.fire(
                  'Erro',
                  'Erro no servidor. Tente novamente mais tarde.',
                  'error'
                )
              } else {
                swalWithBootstrapButtons.fire(
                  'Boa!',
                  'Contrato ativado com sucesso.',
                  'success'
                ).then(async result => {
                  if (result.isConfirmed) {
                    setIsLoading(true)
                    history.push({pathname: "/BackOffice"})
                  }
                })
              }
            })
        // "!result.isConfimed significa clicar em "Refazer!"
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

  
  const renderContract = () => {
    function _setNif (value) {
      const nif = value;
      return nif;
    }

    console.log(_setNif(), 'NIF')
    console.log(contract, 'CONTRATOOO')
    console.log(contractType, 'TYPE')
    console.log(contractType === "Electricidade", '<---- TESTE')
    return (
      <>
        <Dialog style={{padding: '2%'}} fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          {/* <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Toolbar>

            <ContractEdit />
          </AppBar> */}
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <DialogTitle id="form-dialog-title" style={{padding: '0', marginLeft: '3%', marginTop: '3%'}}>Editar contrato</DialogTitle>
          <DialogContent style={{marginLeft: '3%', padding: '0'}}>
            <DialogContentText style={{marginBottom: '3%', marginTop: '0%'}}>
              {`Olá ${currentUser?.user?.name}, você tem permissões para alterar um contrato. ✅`}
            </DialogContentText>
            <form noValidate autoComplete="off">
            <Row style={{height: '60vh', width: '100%'}}>
              <Col style={{width: '50%'}}>
                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '25vh', marginBottom: '7%' }}>
                  <Col style={{
                    width: '45%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nome do cliente"
                      placeholder={contract?.client_name}
                      type="text"
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="nif"
                      label="NIF / NIPC"
                      placeholder={contract?.client_nif}
                      type="text"
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="contact"
                      label="Contacto"
                      placeholder={contract?.client_contact}
                      type="text"
                    />
                  </Col>
                  <Col style={{
                    width: '30%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '15%'
                  }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="delivery_date"
                      label="Data de entrega"
                      placeholder={contract?.delivery_date}
                      type="text"
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="signature_date"
                      label="Data de assinatura"
                      placeholder={contract?.signature_date}
                      type="text"
                    />

                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Tipo de pagamento"
                      placeholder={contract?.payment__name}
                      type="text"
                    />
                  </Col>
                </Row>

                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '55%',height: '20vh', marginTop: '3%'}}>
                  <Col style={{
                    width: '40%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '1%',
                    marginRight: '5%'
                  }}>
                    <SwitchButton
                      key="electronicBill"
                      name="electronicBill"
                      subType="twoColumns"
                      side="left"
                      initialValue={contract?.electronic_bill}
                      label="Factura Electrónica"
                      onChange={() => console.log('test')}
                    />
                    <SwitchButton
                      key="lightPPI"
                      name="lightPPI"
                      subType="twoColumns"
                      side="left"
                      initialValue={contract?.electricity_ppi}
                      label="PPI Luz"
                      onChange={() => console.log('test')}
                    />

                  </Col>

                  <Col style={{
                    width: '30%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
       { contract?.gas_ppi && <SwitchButton
                      key="gasPPI"
                      name="gasPPI"
                      subType="twoColumns"
                      side="left"
                      initialValue={contract?.gas_ppi}
                      label="PPI Gás"
                      onChange={() => console.log('test')}
                    />}
                    <SwitchButton
                      key="PEL"
                      name="PEL"
                      subType="twoColumns"
                      side="left"
                      initialValue={contract?.pel}
                      label="PEL"
                      onChange={() => console.log('test')}
                    />
                  </Col>
                </Row>
              </Col>
              <Col style={{width: '50%'}}>
                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '25vh', marginBottom: '7%' }}>
                  <Col style={{
                    width: '45%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  </Col>

                  <Col style={{
                    width: '30%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column', 
                    marginRight: '15%'
                  }}>
                    <SubHeading style={{display: 'flex'}}>Comissão: 
                    { contract?.sell_state__name !== 'ok' &&
                      <SubHeading style={{margin: '0', marginLeft: '5%', color: CONSTANTS?.colors?.green}}>0€</SubHeading>
                    }
                    { contract?.sell_state__name === 'ok' &&
                      <SubHeading style={{margin: '0', marginLeft: '5%', color: CONSTANTS?.colors?.green}}>{contract?.employee_comission}€</SubHeading>
                    }
                    </SubHeading>
                  </Col>
                </Row>

                <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: '25vh', marginBottom: '7%' }}>
                  <Col style={{
                    width: '45%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <InputLabel htmlFor="select-sell-state">Estado da Venda</InputLabel>
                    <Select
                      inputProps={{
                        name: 'sell-state',
                        id: 'select-sell-state',
                      }}
                    >
                      {optionsSellState !== null ? optionsSellState.map(sellState => (
                        <MenuItem value={sellState.value}>
                          {sellState.name}
                        </MenuItem>
                      )) : []}
                    </Select>

                    <InputLabel htmlFor="select-gas-scale">Escalão de Gás</InputLabel>
                    <Select
                      inputProps={{
                        name: 'gas-scale',
                        id: 'select-gas-scale',
                      }}
                    >
                      {optionsGasScale !== [] ? optionsGasScale.map(gasScale => (
                        <MenuItem value={gasScale.value}>
                          {gasScale.name}
                        </MenuItem>
                      )) : []}
                    </Select>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="CUI"
                      label="CUI"
                      placeholder={contract?.cui}
                      type="text"
                    />
                  </Col>
                  <Col style={{
                    width: '30%',
                    justifyContent: 'space-around',
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: '15%'
                  }}>
                    <InputLabel htmlFor="select-gas-scale">Feedback Call</InputLabel>
                    <Select
                      inputProps={{
                        name: 'feedback-call',
                        id: 'select-feedback-call',
                      }}
                    >
                      {optionsFeedbackCall !== [] ? optionsFeedbackCall.map(FeedbackCall => (
                        <MenuItem value={FeedbackCall.value}>
                          {FeedbackCall.name}
                        </MenuItem>
                      )) : []}
                    </Select>

                    <InputLabel htmlFor="select-power">Potência</InputLabel>
                    <Select
                      inputProps={{
                        name: 'power',
                        id: 'select-power',
                      }}
                    >
                      {optionsPower !== null ? optionsPower.map(Power => (
                        <MenuItem value={Power.value}>
                          {Power.name}
                        </MenuItem>
                      )) : []}
                    </Select>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="CPE"
                      label="CPE"
                      placeholder={contract?.cpe}
                      type="text"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>  

            <DialogActions style={{justifyContent: 'center', marginBottom: '1.5%'}}>
            <Button action={updateContract} text="Atualizar contrato" style={{backgroundColor: 'black', color: 'white', width: '30%'}} />
          </DialogActions>
            </form>

          </DialogContent>
        </Dialog>

        <List.Item className={isDeleting ? "hideContract" : "contract"}>
          <Row style={{ width: '35%', display: 'flex', justifyContent: 'space-between'}}>
            <Heading>{`Contrato nº: ${contractNumber}`}</Heading>
            <EditIcon color={"black"} onClick={handleClickOpen} style={{ width: '3%', height: '5%', position: 'absolute', top: '14%', left: '36%'}}/>
          </Row> 
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
            { contract?.sell_state__name !== "ok" && 
              <Body 
                style={
                  {
                    fontSize: 12,
                    textShadow: "8px 8px 12px rgba(230, 230, 230, 0.9)",
                    color: `${CONSTANTS?.colors?.brand?.blue}`,
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
            <Body
              style={
                {
                  fontSize: 14,
                  textShadow: "8px 8px 12px rgba(230, 230, 230, 0.9)",
                  color: `${CONSTANTS?.colors?.black}`,
                  fontWeight: "bold",
                  marginLeft: 20,
                  marginTop: -34,
                  marginBottom: 40,
                }
              }>({contractType})</Body>
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
                    <Body className={"field"}>{` ${contract?.payment__name}`}</Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>  
                  <Column>
                    <SmallSubHeading><b>Fatura Electrónica:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.electronic_bill ? "🟢" : "🔴"}`}</Body>

                  {(typeContainsElectricity) &&
                    <>
                      <SmallSubHeading><b>PPI Luz:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.electricity_ppi ? "🟢" : "🔴"}`}</Body>
                    </>
                  }
                  </Column>

                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start', marginTop: '3%'} : {}}>
                  {(typeContainsGas) &&
                    <>
                      <SmallSubHeading><b>PPI Gás:</b></SmallSubHeading>
                      <Body className={"field"}>{` ${contract?.gas_ppi ? "🟢" : "🔴"}`}</Body>
                    </>
                  }


                  {(typeContainsElectricity) &&
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
                  <Column>
                    <SmallSubHeading><b>Comercial:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.user__name}`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column>

                  <Column>
                    <SmallSubHeading><b>Comissão: </b></SmallSubHeading>
                    <Body className={"fieldComission"}>{ contract?.sell_state__name !== 'ok' ? '0€' : ` +${contract?.employee_comission}€`}</Body>

                    <SmallSubHeading></SmallSubHeading>
                    <Body className={"field"}></Body>
                  </Column>
                </Row>

                <Row className={"secondRowInsideFirstColumn"}>  
                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start'} : {}}>
                    <SmallSubHeading><b>Estado da venda:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.sell_state__name}`}</Body>

                    {(typeContainsGas) && 
                      <>
                        <SmallSubHeading><b>Escalão Gás:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.gas_scale__name}`}</Body>
                      </>
                    }


                    {(typeContainsGas) && 
                      <>
                        <SmallSubHeading><b>CUI:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.cui}`}</Body>  
                      </>
                    }

                  </Column>

                  <Column style={typeContainsElectricity || typeContainsGas ? { justifyContent: 'flex-start'} : {}}>
                    <SmallSubHeading><b>Feedback Call:</b></SmallSubHeading>
                    <Body className={"field"}>{` ${contract?.feedback_call}`}</Body>

                    {(typeContainsElectricity) && 
                      <>
                        <SmallSubHeading><b>Potência:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.power__name}`}</Body>                     
                      </>
                    }


                    {(typeContainsElectricity) && 
                      <>
                        <SmallSubHeading><b>CPE:</b></SmallSubHeading>
                        <Body className={"field"}>{` ${contract?.cpe}`}</Body>                      
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
  };

  return (
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} />
        {renderContract()}
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
    </MainContainer>
  )

};

export default ContractDetail;
