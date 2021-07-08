import React, { useMemo, useState, useEffect, useReducer, useCallback } from "react"
import { useHistory } from "react-router-dom"
import Divider from '@material-ui/core/Divider'
import _ from 'lodash'
import Swal from 'sweetalert2'
import Fuse from 'fuse.js'
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit"
import TextField from '@material-ui/core/TextField'

import { Heading, SubHeading, Body, SmallSubHeading } from '../../components/Text/text'
import { LogoMD } from '../../components/Logo/logo'
import Button from "../../components/Button/button"
import { BackIcon } from '../../components/Icon/icons'

import contractsRequests from "../../hooks/requests/contractsRequests"
import { useRefresh } from '../../hooks/window/refresh'
import { useDebounce } from '../../hooks/utils'
import { useAuth } from '../../hooks/employees/auth'

import {
  MainContainer,
  Row,
  Col,
  Column,
  LogoContainer,
  WidthMessageContainer
} from "./styles"

import { List } from "semantic-ui-react"
import SearchBar from "../../components/SearchArea/search"
import CONSTANTS from "../../constants"

const ContractList = (props) => {
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  
  contractsRequests.getContracts(currentOfficeID)

  const { wasRefreshed } = useRefresh()

  function _goBack() {
    try {
      localStorage.removeItem('contractListScreenState')
    } catch (error) {
      alert('Houve um erro.')
    }

    history.push({
      pathname: "/BackOffice",
      state: {
        fromContractsList: true,
        deletedID: deletedID
      }
    })
  }

  const { isCEO, isAdministrator, isRegularManager, isRegularSecretary } = useAuth()

  const haveAccess = (isCEO || isAdministrator || isRegularManager || isRegularSecretary)

  const history = useHistory()
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

  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500])
  }

  useEffect(() => {
    if(cameFromEdit) {
      window.location.reload()
    }
  }, [])

  const initialState = {
    contracts: contractsFromBackoffice,
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
  }, [wasRefreshed, cameFromDetail, cameFromUpdate, cameFromDelete, cameFromBackoffice, cameFromDetailUpdate])

  var fromDelete = props?.location?.state?.fromDelete
  var deletedID = props?.location?.state?.deletedID

  function _removeContractFromRAM() {
    _.remove(contractsFromDelete, function(obj) {
      return obj.id === deletedID
    })

    return contractsFromDelete
  }

  const [display, setDisplay] = useState('flex')
  const [isSearching, setIsSearching] = useState(false)

  if(deletedID) {
    _removeContractFromRAM()
  }
  
  const [activeContract, setActiveContract] = useState(false)

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

        // "result.isConfimed significa clicar em "É isto"
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
                setActiveContract(true)
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
    }

    const stateOfContract = () => {
      if(sellState === "r") {
        return (
          <Row>
            <Body style={{marginRight: "2%"}}>Por recuperar</Body><Body style={{textShadow: "3px 3px 12px rgba(200, 200, 200, 0.8)"}}>🟡</Body>
            <Body style={{marginLeft: "5%", fontWeight: "bold"}}>{_contractType()}</Body>
          </Row>
        )
      } else if (sellState === "ok") {
        return (
          <Row>
            <Body style={{marginRight: "2%"}}>Válido</Body><Body style={{textShadow: "3px 3px 12px rgba(200, 200, 200, 0.8)"}}>🟢</Body>
            <Body style={{marginLeft: "5%", fontWeight: "bold"}}>{_contractType()}</Body>
          </Row>
        )
      } else {
        return (
          <Row>
            <Body style={{marginRight: "2%"}}>Anulado</Body><Body style={{textShadow: "3px 3px 12px rgba(200, 200, 200, 0.8)"}}>🔴</Body>
            <Body style={{marginLeft: "5%", fontWeight: "bold"}}>{_contractType()}</Body>
          </Row>
        )
      }
    }
    
    return (
      <>
        <List.Item key={contract?.id} className={searched ? "eachContractSearched" : "eachContract"} style={{display: display}}>
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
                <List.Content>
                  <Body className={"clientInfoTitle"}><b>Nome do Cliente:</b></Body>
                  <Body className={"clientInfoContent"}>  
                    {contract?.client_name}
                  </Body>
                </List.Content>
                <List.Content>
                  <Body className={"clientInfoTitle"}><b>Contato do Cliente:</b></Body> 
                  <Body className={"clientInfoContent"}>               
                    {contract?.client_contact}
                  </Body>
                </List.Content>
              </Column>
              <Column className={"pairOfClientInfo"}>
                <List.Content>
                  <Body className={"clientInfoTitle"}><b>Data de entrega:</b></Body>
                  <Body className={"clientInfoContent"}> 
                    {contract?.delivery_date}
                  </Body>
                </List.Content>
                <List.Content>
                  <Body className={"clientInfoTitle"}><b>NIF / NIPC:</b></Body> 
                  <Body className={"clientInfoContent"}>
                    {contract?.client_nif}
                  </Body>
                </List.Content>

              </Column>
            </Row>
          </Column>

          { contract?.sell_state__name === "ok" &&
            <Column className={"contractComission"}>
              <List.Content>
                <SmallSubHeading><b>Comissão do comercial:</b></SmallSubHeading>
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
    );
  }

  const [query, setQuery] = useState('')
  const [fuse, setFuse] = useState()

  const debouncedQuery = useDebounce(query, 100)

  useEffect(() => {
    if (debouncedQuery === '') {
      setIsSearching(false)
    }
    if (contracts) {
      const keys = ['user__name', 'power__name', 'client_nif', 'contract_type', 'sell_state__name']

      const options = {
        keys,
        includeScore: true,
        minMatchCharLength: 1,
      }

      const newFuse = new Fuse(contracts, options)

      setFuse(newFuse)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  const _handleSearchChange = (value) => {
    setIsSearching(true)
    setQuery(value)
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
      label="Comercial, Potência, Tipo de Contrato, Estado da venda..."
      onChange={e =>  _handleSearchChange(e?.target?.value?.toLowerCase()) }
      style={{marginTop: '2vh'}}
    />
  ), [isSearching])

  const fuseMatchedContracts = useMemo(() => {
    if (debouncedQuery === '') {
      return contracts
    } else {
      return fuse?.search(debouncedQuery).filter(value => value?.score <= 0.1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  const stateOfContractsFromDetail = state?.contractsFromDetail

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
          {/* <Col>
            <TextField
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  color: 'black',
                  borderBottomColor: 'black',
                  '& .MuiInput-underline:after': {
                    color: 'black',
                    borderBottomColor: 'black'
                  }
                }
              }}
              label="Potência"
              onChange={(e) => _handleSearchChange(e.target.value.toLowerCase()) }
              style={{marginTop: '2vh'}}
            />
          </Col>
          <Col>
            <TextField
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  color: 'black',
                  borderBottomColor: 'black',
                  '& .MuiInput-underline:after': {
                    color: 'black',
                    borderBottomColor: 'black'
                  }
                }
              }}
              label="NIF / NIPC"
              onChange={(e) => _handleSearchChange(e.target.value.toLowerCase()) }
              style={{marginTop: '2vh'}}
            />
          </Col>
          <Col>
            <TextField
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  color: 'black',
                  borderBottomColor: 'black',
                  '& .MuiInput-underline:after': {
                    color: 'black',
                    borderBottomColor: 'black'
                  }
                }
              }}
              label="Tipo de contrato"
              onChange={(e) => _handleSearchChange(e.target.value.toLowerCase()) }
              style={{marginTop: '2vh'}}
            />
          </Col>  
          <Col> 
            <TextField
              id="outlined-basic"
              variant="outlined"
              InputProps={{
                style: {
                  color: 'black',
                  borderBottomColor: 'black',
                  '& .MuiInput-underline:after': {
                    color: 'black',
                    borderBottomColor: 'black'
                  }
                }
              }}
              label="Estado da venda"
              onChange={(e) => _handleSearchChange(e.target.value.toLowerCase()) }
              style={{marginTop: '2vh'}}
            />
          </Col>
          */}
        </Col>
        <List divided verticalAlign="middle" className={"listContainer"}>
        { isSearching ?
          fuseMatchedContracts && fuseMatchedContracts?.map(
            function(contract, index) {
              return renderContract(contract?.item, index, true)
            }
          )
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

};

export default ContractList;
