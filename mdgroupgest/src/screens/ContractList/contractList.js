import React, { useMemo, useState, useEffect, useReducer, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'
import Swal from 'sweetalert2'
import Fuse from 'fuse.js'
import { SwishSpinner } from 'react-spinners-kit'
import TextField from '@material-ui/core/TextField'

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text'
import { LogoMD } from '../../components/Logo/logo'
import Button from '../../components/Button/button'
import { BackIcon } from '../../components/Icon/icons'

import contractsRequests from '../../hooks/requests/contractsRequests'
import dataRequests from '../../hooks/requests/dataRequests'
import { useRefresh } from '../../hooks/window/refresh'
import { useAuth } from '../../hooks/employees/auth'

import {
  MainContainer,
  Row,
  Col,
  Column,
  LogoContainer,
  WidthMessageContainer
} from './styles'

import { List } from 'semantic-ui-react'
import CONSTANTS from '../../constants'

const ContractList = (props) => {
  const history = useHistory()

  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office

  useEffect(() => {
    contractsRequests.monthContracts(currentOfficeID)
  }, [currentOfficeID])

  const { wasRefreshed } = useRefresh()

  function _goBack() {
    try {
      localStorage.removeItem('contractListScreenState')
    } catch (error) {
      alert('Houve um erro.')
    }

    history.push({
      pathname: '/BackOffice',
      state: {
        fromContractsList: true,
        deletedID: deletedID
      }
    })
  }

  const { isCEO, isAdministrator, isRegularManager, isRegularSecretary } = useAuth()

  const haveAccess = (isCEO || isAdministrator || isRegularManager || isRegularSecretary)

  const cameFromDetail = props?.location?.state?.cameFromDetail
  const cameFromEdit = props?.location?.state?.cameFromEdit
  const cameFromDetailUpdate = props?.location?.state?.cameFromDetailUpdate
  const cameFromUpdate = props?.location?.state?.cameFromUpdate
  const cameFromDelete = props?.location?.state?.fromDelete
  const cameFromBackoffice = props?.location?.state?.cameFromBackoffice
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const contractsFromBackoffice = props?.location?.state?.data
  const contractsFromDetail = props?.location?.state?.contractsToReturn
  const contractsFromDelete = props?.location?.state?.contractsToReturnFromDelete
  const contractsFromUpdate = props?.location?.state?.contractsToReturnFromUpdate

  const allContractsTogether = JSON.parse(localStorage.getItem('allContracts'))

  const shouldRenderAll = props?.location?.state?.shouldRenderAll

  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500])
  }

  useEffect(() => {
    if(cameFromEdit || (cameFromBackoffice && !shouldRenderAll)) {
      window.location.reload()
    }
  }, [cameFromEdit, cameFromBackoffice, shouldRenderAll])

  const initialState = {
    contracts: shouldRenderAll ? allContractsTogether : contractsFromBackoffice,
    contractsFromDetail,
    contractsFromDelete,
    contractsFromUpdate
  }

  if(!wasRefreshed) {
    localStorage.setItem(
      'contractListScreenState',
      JSON.stringify(initialState)
    )
  }
  
  const reducer = (firstState, action) => {
    let reducerState = {}

    const stateOnRAM = JSON.parse(localStorage.getItem('contractListScreenState'))

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
      // no default
    }

    localStorage.removeItem('contractListScreenState')
    localStorage.setItem(
      'contractListScreenState',
      JSON.stringify(reducerState)
    )

    return reducerState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (cameFromDetail) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (cameFromUpdate) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (cameFromDelete) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (cameFromDetailUpdate) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if (cameFromBackoffice) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state?.contracts
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasRefreshed, cameFromDetail, cameFromUpdate, cameFromDelete, cameFromBackoffice, cameFromDetailUpdate])

  var deletedID = props?.location?.state?.deletedID

  function _removeContractFromRAM() {
    _.remove(contractsFromDelete, function(obj) {
      return obj.id === deletedID
    })

    return contractsFromDelete
  }

  if(deletedID) {
    _removeContractFromRAM()
  }

  const contracts = useMemo(() => {
    if (contractsFromBackoffice) {
      return contractsFromBackoffice?.sort((a, b) => b.id - a.id)  
    } else if (cameFromDelete) {
      _removeContractFromRAM()
      return contractsFromDelete?.sort((a, b) => b.id - a.id)
    } else if (cameFromDetail){
      return contractsFromDetail?.sort((a, b) => b.id - a.id)
    } else if (cameFromUpdate) {
      return contractsFromUpdate?.sort((a, b) => b.id - a.id)
    } else {
      const contracts = JSON.parse(localStorage.getItem('contracts'));
      let contractsToReturn = []
      for(let i = 0; i < contracts?.length; i++) {
        if (contracts[i]?.user__id === currentUser?.user?.id || isCEO || isAdministrator || isRegularManager || isRegularSecretary) {
          contractsToReturn.push(contracts[i])
        }
      }
      return contractsToReturn?.sort((a, b) => b.id - a.id)    
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[wasRefreshed, cameFromDelete, cameFromDetail, cameFromBackoffice, isLoading])
  
  function _ConfirmContractActivation(contract, i) {
    const sellStateID = () => {
      const sellStatesOnRAM = JSON.parse(localStorage.getItem('sellStates'));
      const sellStateMatched = sellStatesOnRAM.find(sellState => { return sellState?.name === 'ok' })
      return sellStateMatched
    }

    const sellStateIDTOActivate = sellStateID()?.id;

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

        // 'result.isConfimed significa clicar em 'É isto'
          if (result.isConfirmed) {
            await contractsRequests.updateContract(
              {
                contract: {
                  id: contract?.id, sell_state: sellStateIDTOActivate
                },
                comissions: null
              }
            )
            .then(async (res) => {
              Promise.all([
                dataRequests.getResultsToPresent(currentOfficeID),
                dataRequests.getOfficeResults(currentOfficeID),
                contractsRequests.monthContracts(currentOfficeID)
              ])
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
                ).then(result => {
                  if (result.isConfirmed) {
                    setIsLoading(false)
                    window.location.reload()
                  }
                })
              }
            })
        // '!result.isConfimed significa clicar em 'Refazer!'
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

  const renderContract = (contract, i, searched) => {
    var sellState = contract?.sell_state__name

    const titleStyle =  {
      width: '100%',
      marginTop: -10,
      marginBottom: '10px',
      marginLeft: 0
    }

    const spanStyle = {
      borderBottom: '2px solid',
      borderBottomColor: `${CONSTANTS?.colors?.black}`
    }

    const buttonStyle = {
      width: '60%',
      height: '30%',
      backgroundColor: 'green',
      marginLeft: '3%',
      marginTop:' -2.5%',
      borderRadius: '5%',
      cursor: 'pointer'
    }

    function _contractType () {
      switch (contract?.contract_type) {
        case 'dual':                    return 'Dual'
        case 'gas':                     return 'Gás'
        case 'electricity':             return 'Electricidade'
        case 'condominium_dual':        return 'Dual Condomínio'
        case 'condominium_gas':         return 'Gás Condomínio'
        case 'condominium_electricity': return 'Electricidade Condomínio'
  
        default:
          break;
      }
    }

    const stateOfContract = () => {
      const renderRow = (state, signal) => (
        <Row>
          <Body style={{marginRight: "2%"}}>{state}</Body>
          <Body style={{textShadow: "3px 3px 12px rgba(200, 200, 200, 0.8)"}}>{signal}</Body>
          <Body style={{marginLeft: "5%", fontWeight: "bold"}}>{_contractType()}</Body>
        </Row>
      )

      if (sellState === "r") return renderRow('Por recuperar', '🟡')
      else if (sellState === "ok") return renderRow('Válido', '🟢')
      else return renderRow('Anulado', '🔴')
    }

    const renderListContent = (title, content) => (
      <List.Content>
        <Body className={"clientInfoTitle"}><b>{title}</b></Body>
        <Body className={"clientInfoContent"}>  
          {content}
        </Body>
      </List.Content>
    )
    
    return (
      <>
        <List.Item
          key={contract?.id}
          className={searched ? "eachContractSearched" : "eachContract"}
          style={{display: 'flex'}}
        >
          <Column className={"clientInfo"}>
            <Column>
              <Row>
                <SubHeading style={titleStyle}>
                  {`${contract?.user__name} - `}
                  <span style={spanStyle}>{contract?.signature_date}</span>
                </SubHeading>
              { contract?.sell_state__name !== 'ok' && haveAccess &&
                <Button
                  style={buttonStyle}
                  disabled={false}
                  action={() => _ConfirmContractActivation(contract, i)}
                  small={true}
                  text="Ativar contrato"
                />
              }
              </Row>
              <Body style={{marginTop: -15, marginBottom: 10}}>{stateOfContract()}</Body>
            </Column> 
            <Row className={"rowOfClientInfo"}>
              <Column className={"pairOfClientInfo"}>
                { renderListContent('Nome do Cliente:', contract?.client_name) }
                { renderListContent('Contato do Cliente:', contract?.client_contact) }
              </Column>
              <Column className={"pairOfClientInfo"}>
                { renderListContent('Data de entrega:', contract?.delivery_date) }
                { renderListContent('NIF / NIPC:', contract?.client_nif) }
              </Column>
            </Row>
          </Column>

          { contract?.sell_state__name === "ok" &&
            <Column className={"contractComission"}>
              <List.Content>
                <SmallSubHeading><b>Comissão do colaborador:</b></SmallSubHeading>
                <Body className={"employeeComission"}>
                  {`${contract?.employee_comission === null ? '0' : `${contract?.employee_comission}`}€`}
                </Body>
              </List.Content>
            </Column>
          }

          { contract?.sell_state__name !== "ok" &&
            <Column className={"contractComission"} style={{width: '10%'}}>
              <List.Content>
                <SmallSubHeading></SmallSubHeading>
                <Body className={"employeeComission"}></Body>
              </List.Content>
            </Column>
          }
          <Column className={"optionsAboutContract"}>
            <Button
              disabled={false}
              action={() => {
                history.push({
                  pathname:"/ContractDetail",
                  state: { 
                    data: contract,
                    contractNumber: contract?.id,
                    contractsToReturn: contracts,
                    cameFromList: true
                  }
                })
              }}
              small={true}
              text="Ver detalhes"
            />
          </Column>          
        </List.Item>
        <Divider />
      </>
    )
  }

  const [query, setQuery] = useState('')
  const [fuse, setFuse] = useState()

  useEffect(() => {
    if (query === '') {
      setIsSearching(false)
    }
    if (contracts) {

      const newFuse = new Fuse(contracts, {
        keys: [
          'client_nif',
          'client_name',
          'user__name',
          'contract_type',
          'sell_state__name'
        ],
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        findAllMatches: true,
        threshold: 0,
        useExtendedSearch: true,
        ignoreFieldNorm: true,
        ignoreLocation: true,
      })

      setFuse(newFuse)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  const _handleSearchChange = (value) => {
    setIsSearching(true)
    let auxValue = value
    if (value[value?.length - 1] === ' ') {
      auxValue = value.replace(' ', '')
    }

    setQuery(auxValue)
  }
  
  const renderSearchBar = useCallback(() => (
    <TextField
      id="outlined-basic"
      variant="outlined"
      InputProps={{
        style: {
          width: '40vw',
          color: 'black',
          borderBottomColor: 'black',
          '& .MuiInput-underline:after': {
            color: 'black',
            borderBottomColor: 'black'
          }
        }
      }}
      label="NIF, Colaborador, Nome do cliente, Tipo de Contrato, Estado da venda..."
      onChange={e =>  _handleSearchChange(e?.target?.value) }
      style={{marginTop: '2vh'}}
    />
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [isSearching])

  const fuseMatchedContracts = useMemo(() => (
    fuse?.search(query).filter(value => ( value?.score <= 0.001 ))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [query])

  const stateOfContractsFromDetail = state?.contractsFromDetail

  const handleEmptySearch = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh'
    }}>
      <h1>Não encontramos nada...</h1>
    </div>
  )

  const handleContent = useCallback(() => {
    return (
      isLoading ?
      <MainContainer>
        <SwishSpinner size={200} color="#686769" loading={isLoading} />
      </MainContainer>
      :
      <>
        <WidthMessageContainer>
          <Heading>Você precisa de mais espaço!</Heading>
          <SubHeading>Volte ao tamanho necessário.</SubHeading>
        </WidthMessageContainer>
        <MainContainer id={"mainContainer"}>
          <BackIcon onClick={_goBack} />
          <Col style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Col>
              <Row style={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                marginTop: '.75vh',
                justifyContent: 'space-between',
              }}>
                {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
                <SubHeading style={{
                  marginBottom: '0%',
                  color: CONSTANTS?.colors?.mediumGrey,
                  textShadow: '1px 1px 1px rgba(200, 200, 200, 0.8)'
                }}>Podes pesquisar aqui 🔍</SubHeading>
              </Row>
            </Col>
  
            <Col>
              {renderSearchBar()}
            </Col>
          </Col>
          <List divided verticalAlign="middle" className={"listContainer"}>
          { isSearching ?
            fuseMatchedContracts?.length !== 0 ? fuseMatchedContracts?.map(
              function(contract, index) {
                return renderContract(contract?.item, index, true)
              }
            ) : handleEmptySearch()
          : contracts?.length === 0 ?
            <SubHeading style={{display: 'flex', justifyContent: 'center', marginTop: '25%'}}>Ainda não há contratos...</SubHeading> :
          cameFromDetail ?
            stateOfContractsFromDetail &&
            stateOfContractsFromDetail.map(function(contract, index) {
                return renderContract(contract, index, false);
              })
          : contracts &&
            contracts.map(function(contract, index) {
              return renderContract(contract, index, false);
            })
          }        
          </List>
          <LogoContainer>
            <LogoMD action={
              () => history.push({
                pathname: "/BackOffice",
                state: {
                  fromContractsList: true
                }}
              )}
            />
          </LogoContainer>
        </MainContainer>
      </>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contracts, cameFromBackoffice, isLoading, fuseMatchedContracts, isSearching])

  return handleContent()
}

export default ContractList
