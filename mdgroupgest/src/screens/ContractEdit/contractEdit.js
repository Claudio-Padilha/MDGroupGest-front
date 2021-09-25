import React, { useMemo, useState, useReducer, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { SwishSpinner } from "react-spinners-kit"
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { MenuItem } from "@material-ui/core"
import { useStyles } from 'react-styles-hook'

import Button from "../../components/Button/button"
import { Heading, SubHeading } from '../../components/Text/text'
import { Corner, Corner180 } from '../../components/Corner/corner'
import { LogoMD } from '../../components/Logo/logo'
import { BackIcon } from '../../components/Icon/icons'
import SwitchButton from "../../components/ToggleComponent/toggleButton"

import { _executeValidationsIfHas } from '../../hooks/validation'
import contractsRequests from '../../hooks/requests/contractsRequests'
import dataRequests from '../../hooks/requests/dataRequests'
import { useRefresh } from '../../hooks/window/refresh'

import CONSTANTS from '../../constants'

import { _formatDate } from '../../utils/date'

import {
  Row,
  MainDiv,
  CornerLeft,
  LogoContainer,
  CornerRight,
  WidthMessageContainer,
  styles
} from './styles'

const ContractEdit = (props) => {

  const { wasRefreshed } = useRefresh()
  const screenStyle = useStyles(styles())

  const [typeOfContractFromProps, setTypeOfContractFromProps] = useState(props?.location?.state?.state?.contractFromDetail?.contract_type)

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  const cameFromDetail = props?.location?.state?.cameFromDetail
  const contractFromDetail = props?.location?.state?.contractFromDetail

  const feedbackCalls = JSON.parse(localStorage.getItem('feedbackCalls'))
  const optionsFeedbackCall = JSON.parse(localStorage.getItem('feedbackCalls'))
  optionsFeedbackCall.forEach(el => el['value'] = el.id)

  const sellStates = JSON.parse(localStorage.getItem('sellStates'))

  const paymentMethods = JSON.parse(localStorage.getItem('payments'))
  
  const gasScales = JSON.parse(localStorage.getItem('gasScales'))
  const optionsGasScale = JSON.parse(localStorage.getItem('gasScales'))
  optionsGasScale.forEach(el => el['value'] = el.id)
  
  const gasScalesCond = JSON.parse(localStorage.getItem('gasScalesCond'))
  const optionsGasScaleCond = JSON.parse(localStorage.getItem('gasScalesCond'))
  optionsGasScaleCond.forEach(el => el['value'] = el.id)
  
  const powersList = JSON.parse(localStorage.getItem('powerList'))
  const optionsPower = JSON.parse(localStorage.getItem('powerList'))
  optionsPower.forEach(el => el['value'] = el.id)
  
  const powersListCond = JSON.parse(localStorage.getItem('powerListCond'))
  const optionsPowerCond = JSON.parse(localStorage.getItem('powerListCond'))
  optionsPowerCond.forEach(el => el['value'] = el.id)
  
  const title = props?.location?.state?.title
 
  function _getFeedbackCalls() {
    let feedbackCallsArr = []
    for(let i = 0; i < feedbackCalls?.length; i++) {
      feedbackCallsArr.push({
        value: {
          value: feedbackCalls[i]?.id,
          label: feedbackCalls[i]?.name.toUpperCase()
        },
        label: feedbackCalls[i]?.name.toUpperCase()
      })
    }

    return feedbackCallsArr
  }

  function _getSellStates() {
    let sellStatesArr = []
    for(let i = 0; i < sellStates?.length; i++) {
      sellStatesArr.push({
        value: sellStates[i]?.id,
        label: sellStates[i]?.name.toUpperCase()
      })
    }

    return sellStatesArr
  }

  function _getPaymentMethods() {
    let paymentMethodsArr = []
    for(let i = 0; i < paymentMethods?.length; i++) {
      paymentMethodsArr.push({
        value: {
          value: paymentMethods[i]?.id,
          label: paymentMethods[i]?.name.toUpperCase()
        }, 
        label: paymentMethods[i]?.name.toUpperCase()
      })
    }

    return paymentMethodsArr
  }

  function _getGasScales() {
    let gasScalesArr = []
    for(let i = 0; i < gasScales?.length; i++) {
      gasScalesArr.push({
        value: {
          value: gasScales[i]?.id,
          label: gasScales[i]?.name.toUpperCase()
        },
        label: gasScales[i]?.name.toUpperCase()
      })
    }

    return gasScalesArr
  }

  function _getGasScalesCond() {
    let gasScalesCondArr = []
    for(let i = 0; i < gasScalesCond?.length; i++) {
      gasScalesCondArr.push({
        value: {
          value: gasScalesCond[i]?.id,
          label: gasScalesCond[i]?.name.toUpperCase()
        },
        label: gasScalesCond[i]?.name.toUpperCase()
      })
    }

    return gasScalesCondArr
  }

  function _getPowersList() {
    let powersListArr = []
    for(let i = 0; i < powersList?.length; i++) {
      powersListArr.push({
        value: 
        { 
          value: powersList[i]?.id, 
          label: powersList[i]?.name.toUpperCase() 
        }, 
        label: powersList[i]?.name.toUpperCase() 
      })
    }

    return powersListArr
  }

  function _getPowersListCond() {
    let powersListCondArr = []
    for(let i = 0; i < powersListCond?.length; i++) {
      powersListCondArr.push({
        value: 
        { 
          value: powersListCond[i]?.id, 
          label: powersListCond[i]?.name.toUpperCase() 
        }, 
        label: powersListCond[i]?.name.toUpperCase() 
      })
    }

    return powersListCondArr
  }

  const [isLoading, setIsLoading] = useState(true);

  const infoForFields = useMemo(() => {
    const feedbackCalls = _getFeedbackCalls()
    const sellStates = _getSellStates()
    const paymentMethods = _getPaymentMethods()
    const gasScales = _getGasScales()
    const gasScalesCond = _getGasScalesCond()
    const powersList = _getPowersList()
    const powersListCond = _getPowersListCond()
    
    return {
      feedbackCalls,
      sellStates,
      paymentMethods,
      gasScales,
      gasScalesCond,
      powersList,
      powersListCond
    }
  }, [isLoading])

  const bteId = infoForFields?.powersList.find(power => power?.label === 'BTE')?.value?.label
  const mtId = infoForFields?.powersList.find(power => power?.label === 'MT')?.value?.label

  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;

  const history = useHistory()

  function _goBack() {
    history.push({pathname: '/contractList'})
  }

  const initialState = {
    contractFromDetail,
    infoForFields,
    bteId,
    mtId,
    title,
    typeOfContractFromProps
  }

  useEffect(() => {
    if (!wasRefreshed) {
      if (cameFromDetail) {
        localStorage.setItem(
          'editContractScreenState', JSON.stringify(initialState)
        )
      }
    }
  }, [wasRefreshed, cameFromDetail])

  const reducer = useCallback((firstState, action) => {
    let reducerState = {}
    const stateOnRAM = JSON.parse(localStorage.getItem('editContractScreenState'))

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
    }

    localStorage.removeItem('editContractScreenState')
    localStorage.setItem('editContractScreenState', JSON.stringify(reducerState))

    setTypeOfContractFromProps(reducerState?.typeOfContractFromProps)

    setTimeout(() => {
      setIsLoading(false)
    }, [800]);

    return reducerState
  }, [isLoading])

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (cameFromDetail) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  }, [cameFromDetail, wasRefreshed])

  const contractType = useMemo(() => {
    switch (state?.contractFromDetail?.contract_type) {
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
  }, [state])

  async function updateContract (contractData) {

    swalWithBootstrapButtons.fire({
      title: 'Deseja realmente atualizar o contrato? ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'É isso!',
      cancelButtonText: 'Refazer',
      reverseButtons: true
    }).then((result) => {
      if (result?.isConfirmed) {
        contractsRequests.updateContract(contractData).then(async (res) => {
          await dataRequests.getResultsToPresent(currentOfficeID)
          await dataRequests.getOfficeResults(currentOfficeID)
          contractsRequests.getContracts(currentOfficeID)
          .then(
            () => {
              swalWithBootstrapButtons.fire({
                title: 'Boa!',
                html: 'Contrato atualizado com sucesso. <br>',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok!',
                reverseButtons: true
              }).then(() => {
                history.push({
                  pathname: '/ContractList',
                  state: {
                    cameFromEdit: true
                  }
                })
              })
            })
            .catch(
              () => alert('Houve um erro, tente novamente.')
            )
          })
      } else if (!result?.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Ação Cancelada',
          '',
          'info'
        )
      }
    })
  }

  function setData(event) {

    event.preventDefault()

    let contractData = {
      id: state?.contractFromDetail?.id,
    }

    let powerValue = ""
    if (document.getElementById('select-power') !== null && document.getElementById('select-power').value !== ""){
      console.log(document.getElementById('select-power'), 'DOCUMENT SELECT BY ID')
      const value = document.getElementById('select-power').value
      powerValue = JSON.parse(value)
    }

    if (document.getElementById("name").value !== "" ) {
      contractData = {...contractData, ...{client_name: document.getElementById("name").value}}
    }
    if (document.getElementById("nif").value !== "") {
      contractData = {...contractData, ...{client_nif: document.getElementById("nif").value}}
    }
    if (document.getElementById("contact").value !== "") {
      contractData = {...contractData, ...{client_contact: document.getElementById("contact").value}}
    }
    if (document.getElementById("delivery_date").value !== "") {
      contractData = {...contractData, ...{delivery_date: document.getElementById("delivery_date").value}}
    }
    if (document.getElementById("signature_date").value !== "") {
      contractData = {...contractData, ...{signature_date: document.getElementById("signature_date").value}}
    }
    
    if (document.getElementById('pel')?.checked !== state?.contractFromDetail?.pel) {
      contractData = {
        ...contractData,
        ...{ 
          pel: document.getElementById('pel')?.checked || state?.contractFromDetail?.pel,
        }
      }
    }

    if (document.getElementById('gas_ppi')?.checked !== state?.contractFromDetail?.gas_ppi) {
      contractData = {
        ...contractData,
        gas_ppi: document.getElementById('gas_ppi')?.checked,
      }
    }

    if (document.getElementById('electricity_ppi')?.checked !== state?.contractFromDetail?.electricity_ppi) {
      contractData = {
        ...contractData,
        electricity_ppi: document.getElementById('electricity_ppi').checked,
      }
    }

    if (document.getElementById('electronic_bill')?.checked !== state?.contractFromDetail?.electronic_bill) {
      contractData = {
        ...contractData,
        electronic_bill: document.getElementById('electronic_bill').checked,
      }
    }

    if (document.getElementById('mgi')?.checked !== state?.contractFromDetail?.mgi) {
      contractData = {
        ...contractData,
        mgi: document.getElementById('mgi')?.checked,
      }
    }

    // if (document.getElementById("select-sell-state").value !== "") {
    //   contractData = {...contractData, ...{sell_state: document.getElementById("select-sell-state").value}}
    // }
    if (document.getElementById("select-gas-scale") !== null && document.getElementById("select-gas-scale").value !== "") {
      contractData = {...contractData, ...{gas_scale: document.getElementById("select-gas-scale").value}}
    }

    if (document.getElementById("select-feedback-call").value !== "") {
      contractData = {...contractData, ...{feedback_call: document.getElementById("select-feedback-call").value}}
    }

    if (document.getElementById("select-sell-state").value !== "") {
      contractData = { ...contractData, ...{ sell_state: Number(document.getElementById("select-sell-state").value) } }
    }

    if (powerValue !== "") {
      if ((powerValue?.name === 'BTE' || powerValue?.name === 'MT')) {
        return swalWithBootstrapButtons.fire({
          title: 'Escolheu uma potência dinâmica, escreva os valores: ',
          html: '<input id="dynamicPower" placeholder="Potência" class="swal2-input">' +
                '<input id="officeComission" placeholder="Comissão Escritório" class="swal2-input">' +
                '<input id="employeeComission" placeholder="Comissão Comercial" class="swal2-input">',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'É isso!',
          cancelButtonText: 'Refazer',
          reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              var dynamicPower = document.getElementById('dynamicPower')?.value
              var officeComission = state?.contractFromDetail?.office_comission
              var employeeComission = state?.contractFromDetail?.employee_comission

              let comissionObj = {
                dynamic_power: dynamicPower,
                office_comission: officeComission,
                employee_comission: employeeComission
              }

              contractData = { contract: contractData, comissions: {
                dynamic_power: dynamicPower,
                office_comission: officeComission,
                employee_comission: employeeComission
              }}
              updateContract(contractData)
            }
  

          })
      } else {
        contractData = {
          contract: { ...contractData, power: powerValue?.value },
          comissions: null
        }

        updateContract(contractData)
      }
    } else {
      contractData = {
        contract: { ...contractData},
        comissions: null
      }
      updateContract(contractData)
    }    
  }

  const [electricityPPI, setAuxElectricityPPI] = useState()
  const [gasPPI, setAuxGasPPI] = useState()
  const [pel, setAuxPel] = useState()
  const [mgi, setAuxMGI] = useState()
  const [electronicBill, setAuxElectronicBill] = useState()

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

  const sellStatesToUpdate = infoForFields?.sellStates

  console.log(sellStatesToUpdate, 'TESTE FINAL')

  useEffect(() => {
    if (state?.contractFromDetail) {
      Promise.resolve(
        state?.contractFromDetail?.electricity_ppi,
        state?.contractFromDetail?.gasPPI,
        state?.contractFromDetail?.pel,
        state?.contractFromDetail?.mgi,
        state?.contractFromDetail?.electronicBill
      ).then(() => 
          setAuxElectricityPPI(state?.contractFromDetail?.electricity_ppi),
          setAuxGasPPI(state?.contractFromDetail?.gasPPI),
          setAuxPel(state?.contractFromDetail?.pel),
          setAuxMGI(state?.contractFromDetail?.mgi),
          setAuxElectronicBill(state?.contractFromDetail?.electronicBill)
        )
    }
  }, [state])

  const renderForm = () => {
    return (
      <div style={screenStyle?.mainFormContainer}>
        <form noValidate autoComplete="off" style={{width: '90%'}}>
          <Row style={screenStyle?.row1}>
            <Col style={{width: '50%'}}>
              <Row style={screenStyle?.row2}>
                <Col style={screenStyle?.col2}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome do cliente"
                    placeholder={state?.contractFromDetail?.client_name || ''}
                    type="text"
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="nif"
                    label="NIF / NIPC"
                    placeholder={state?.contractFromDetail?.client_nif || ''}
                    type="text"
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="contact"
                    label="Contacto"
                    placeholder={state?.contractFromDetail?.client_contact || ''}
                    type="text"
                  />
                </Col>
                <Col style={screenStyle?.col3}>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="delivery_date"
                    label="Data de entrega"
                    placeholder={state?.contractFromDetail?.delivery_date || ''}
                    type="text"
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="signature_date"
                    label="Data de assinatura"
                    placeholder={state?.contractFromDetail?.signature_date || ''}
                    type="text"
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Tipo de pagamento"
                    placeholder={state?.contractFromDetail?.payment__name || ''}
                    type="text"
                  />
                </Col>
              </Row>

              <Row style={screenStyle?.row3}>
                <Col style={screenStyle?.col4}>
                  <SwitchButton
                    key="electronicBill"
                    name="electronicBill"
                    subType="twoColumns"
                    side="left"
                    initialValue={electronicBill}
                    label="Factura Electrónica"
                    onChange={() => setAuxElectronicBill(!electronicBill)}
                    checked={electronicBill}
                    value={electronicBill}
                    id="electronic_bill"
                  />
        
                  { (state?.contractFromDetail?.contract_type === 'electricity' || state?.contractFromDetail?.contract_type === 'dual' || state?.contractFromDetail?.contract_type === 'condominium_electricity')  &&
                    <SwitchButton
                      key="lightPPI"
                      name="lightPPI"
                      subType="twoColumns"
                      side="left"
                      initialValue={electricityPPI}
                      checked={electricityPPI}
                      onChange={() => setAuxElectricityPPI(!electricityPPI)}
                      label="PPI Luz"
                      value={electricityPPI}
                      id="electricity_ppi"
                    />
                  }

                </Col>

                <Col style={screenStyle?.col5}>
                  { (state?.contractFromDetail?.contract_type === 'gas' || state?.contractFromDetail?.contract_type === 'dual' || state?.contractFromDetail?.contract_type === 'condominium_gas') &&
                    <SwitchButton
                      key="mgi"
                      name="mgi"
                      subType="twoColumns"
                      side="left"
                      initialValue={mgi}
                      label="MGI"
                      onChange={() => setAuxMGI(!mgi)}
                      checked={mgi}
                      value={mgi}
                      id="mgi"
                    />
                  }
                  { (state?.contractFromDetail?.contract_type === 'gas' || state?.contractFromDetail?.contract_type === 'dual' || state?.contractFromDetail?.contract_type === 'condominium_gas') && 
                    <SwitchButton
                      key="gasPPI"
                      name="gasPPI"
                      subType="twoColumns"
                      side="left"
                      initialValue={gasPPI}
                      label="PPI Gás"
                      onChange={() => setAuxGasPPI(!gasPPI)}
                      checked={gasPPI}
                      value={gasPPI}
                      id="gas_ppi"
                    />
                  }
                  { (state?.contractFromDetail?.contract_type === 'electricity' || state?.contractFromDetail?.contract_type === 'dual' || state?.contractFromDetail?.contract_type === 'condominium_electricity') &&
                    <SwitchButton
                      key="PEL"
                      name="PEL"
                      subType="twoColumns"
                      side="left"
                      initialValue={pel}
                      label="PEL"
                      onChange={() => setAuxPel(!pel)}
                      checked={pel}
                      value={pel}
                      id="pel"
                    />
                  }
                </Col>
              </Row>
            </Col>
            <Col style={{width: '50%'}}>
              <Row style={screenStyle?.row4}>
                <Col style={screenStyle?.col6}>
                  <InputLabel style={{ fontSize: '32px', marginBottom: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '-15vh' : '-10vh'}} htmlFor="select-sell-state">Estado do contrato</InputLabel>
                  <Select
                    inputProps={{
                      name: 'sell-state',
                      id: 'select-sell-state',
                    }}
                  >
                    {sellStatesToUpdate !== null ? sellStatesToUpdate.map(sellState => (
                      <MenuItem value={sellState.value}>
                        {sellState.label}
                      </MenuItem>
                    )) : []}
                  </Select>
                </Col>

                <Col style={screenStyle?.col7}>
                </Col>
              </Row>

              <Row style={{
                display: 'flex',
                flexDirection: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? 'column' : 'row',
                justifyContent: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? 'space-around' : 'space-between',
                width: '100%',
                height: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '35vh' : '25vh',
                marginBottom: '7%'
              }}>
                <Col style={{
                  width: '45%',
                  height: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '25vh' : '',
                  marginTop: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '-10vh' : '',
                  justifyContent: 'space-around',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  
                  {
                  typeContainsElectricity &&
                  <>
                    <InputLabel htmlFor="select-power">Potência</InputLabel>
                    <Select
                      inputProps={{
                        name: 'power',
                        id: 'select-power',
                      }}
                    >
                      {optionsPower !== null ? optionsPower.map(power => (
                        <MenuItem value={JSON.stringify(power)}>
                          {power.name}
                        </MenuItem>
                      )) : []}
                    </Select>
                  </>
                  }
                  {
                    typeContainsElectricity &&
                      <TextField
                        autoFocus
                        margin="dense"
                        id="CPE"
                        label="CPE"
                        placeholder={state?.contractFromDetail?.cpe || ''}
                        type="text"
                      />
                  }
                  <InputLabel htmlFor="select-gas-scale">Feedback Call</InputLabel>
                  <Select
                    inputProps={{
                      name: 'feedback-call',
                      id: 'select-feedback-call',
                    }}
                  >
                    {optionsFeedbackCall !== [] ? optionsFeedbackCall.map(feedbackCall => (
                      <MenuItem value={feedbackCall.value}>
                        {feedbackCall.name}
                      </MenuItem>
                    )) : []}
                  </Select>

                </Col>
                <Col style={{
                  width: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '45%' : '30%',
                  heigth: (contractType === 'Dual' || contractType === 'Dual Condomínio') ? '15vh' : '',
                  scrollMarginBottom:(contractType === 'Dual' || contractType === 'Dual Condomínio') ? '10vh' : '',
                  justifyContent: 'space-around',
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '15%'
                }}>
                  {
                    typeContainsGas &&
                    <>
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
                    </>
                  }
                  {
                    typeContainsGas &&
                      <TextField
                        autoFocus
                        margin="dense"
                        id="CUI"
                        label="CUI"
                        placeholder={state?.contractFromDetail?.cui || ''}
                        type="text"
                      />
                  }
                </Col>
              </Row>
            </Col>
          </Row>  
        </form>
        <Button
          action={setData}
          text="Atualizar contrato"
          style={{
            position: 'absolute',
            bottom: '7em',
            left: '50em',
            backgroundColor: 'black',
            color: 'white',
            width: '20%'
          }} />
      </div>
    )
  }

  const renderComission = () => (
    <SubHeading
      style={{
        marginTop: '3.25em',
        color: CONSTANTS?.colors?.mediumGrey
      }}
    >Comissão: 
      { state?.contractFromDetail?.sell_state__name !== 'ok' &&
        <SubHeading
          style={{
            margin: 0,
            marginTop: '-.175em',
            marginLeft: '4.5em',
            color: CONSTANTS?.colors?.green
          }}
        >0€</SubHeading>
      }
      { state?.contractFromDetail?.sell_state__name === 'ok' &&
        <SubHeading
          style={{
            margin: 0,
            marginTop: '-.175em',
            marginLeft: '4.5em',
            color: CONSTANTS?.colors?.green
          }}
        >{state?.contractFromDetail?.employee_comission || ''}€</SubHeading>
      }
    </SubHeading>
  )

  return ( isLoading ?
    <MainDiv style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <SwishSpinner size={200} color="#686769" loading={isLoading} />
    </MainDiv>
    :
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainDiv>
        <BackIcon onClick={_goBack} />
        
        <CornerLeft><Corner180 /></CornerLeft>
        <SubHeading style={{marginTop: '-2em'}}>{state?.contractFromDetail?.user__name}</SubHeading>
        <SubHeading
          style={{
            color: CONSTANTS?.colors?.white,
            backgroundColor: CONSTANTS?.colors?.mediumGrey,
            padding: '5px 10px'
          }}>{contractType}</SubHeading>
        {renderComission()}
        <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
          {renderForm()}
        <CornerRight><Corner /></CornerRight>
      </MainDiv>
    </>
  )
}

export default ContractEdit
