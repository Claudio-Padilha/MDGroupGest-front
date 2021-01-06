import React, { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";

import { SubHeading, Body, SmallSubHeading, Heading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon } from '../../components/Icon/icons';

import contractsRequests from "../../hooks/requests/contractsRequests";

import {
  MainContainer,
  Row,
  Col,
  Column,
  LogoContainer,
  EmptyContainer
} from "./styles";

import { List } from "semantic-ui-react";
import SearchBar from "../../components/SearchArea/search";
import CONSTANTS from "../../constants";

const ContractList = (props) => {

  contractsRequests.getContracts()

  function _goBack() {
    history.push({
      pathname: "/BackOffice",
      state: {
        fromContractsList: true,
        deletedID: deletedID
      }
    })
  }
  const history = useHistory();
  const cameFromDetail = props?.location?.state?.cameFromDetail;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const contractsFromDetail = props?.location?.state?.contractsToReturn;

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500]);
  }


  const contracts = useMemo(() => {
    // if(cameFromDetail) {
    //   const contracts = JSON.parse(localStorage.getItem('contracts'))
    //   const contractsToReturn = []
    //   for(let i = 0; i < contracts?.length; i++) {
    //     if (contracts[i]?.user === currentUser?.user?.id) {
    //       contractsToReturn.push(contracts[i])
    //     }
    //   }
    //   return contractsToReturn
      
    // } else {
    //   return props?.location?.state?.data
    // } 

    if(props?.location?.state?.data !== undefined) {
      return props?.location?.state?.data.sort((a, b) => b.id - a.id)  
    } else {
      const contracts = JSON.parse(localStorage.getItem('contracts'))
      const contractsToReturn = []
      for(let i = 0; i < contracts?.length; i++) {
        if (contracts[i]?.user === currentUser?.user?.id) {
          contractsToReturn.push(contracts[i])
        }
      }
      return contractsToReturn.sort((a, b) => b.id - a.id)    
    } 
  },[cameFromDetail, isLoading])

  var fromDelete = props?.location?.state?.fromDelete;
  var deletedID = props?.location?.state?.deletedID;


  const okContractID = contracts;

  function _removeContractFromRAM() {
    _.remove(contracts, function(obj) {
      return obj.id === deletedID
    })
  }

  function _handleEditEmployee() {      // CHANGE THIS TO HANDLE CONTRACT UPDATE
    history.push({
      pathname: "/EmployeeEdit",
      // state: {
      //   employeeData: employee
      // }
    })
  }

  const [display, setDisplay] = useState('flex')
  const [isSearching, setIsSearching] = useState(false)

  if(deletedID) {
    _removeContractFromRAM()
  }

  function _ConfirmContractActivation(contract, i) {

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
            await contractsRequests.updateContract(contract?.id)
            .then(res => {
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
                    await contractsRequests.getContracts()
                    setIsLoading(true)
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
        <List.Item key={contract.id} className={searched ? "eachContractSearched" : "eachContract"} style={{display: display}}>
          <Column className={"clientInfo"}>
            <Column>
              <Row>
                <SubHeading style={{marginTop: -10, marginBottom: 0, marginLeft: 0}}>{`Contrato nº: ${contract?.id}`}</SubHeading>
              { contract?.sell_state__name !== 'ok' &&
                <Button
                  style={{
                    width: '40%',
                    backgroundColor: 'green',
                    marginLeft: '10%',
                    marginTop:' -2%',
                    borderRadius: '5%',
                    cursor: 'pointer',
                  }}
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
                  <Body className={"clientInfoTitle"}><b>Cliente:</b></Body>
                  <Body className={"clientInfoContent"}>  
                    {contract.client_name}
                  </Body>
                </List.Content>
                <List.Content>
                <Body className={"clientInfoTitle"}><b>NIF / NIPC:</b></Body> 
                  <Body className={"clientInfoContent"}>
                    {contract.client_nif}
                  </Body>
                </List.Content>
              </Column>
              <Column className={"pairOfClientInfo"}>
                <List.Content>
                <Body className={"clientInfoTitle"}><b>Data de entrega:</b></Body>
                  <Body className={"clientInfoContent"}> 
                    {contract.delivery_date}
                  </Body>
                </List.Content>
                <List.Content>
                <Body className={"clientInfoTitle"}><b>Data de assinatura:</b></Body> 
                  <Body className={"clientInfoContent"}>               
                    {contract.signature_date}
                  </Body>
                </List.Content>
              </Column>
            </Row>
          </Column>

          { contract.sell_state__name === "ok" &&
            <Column className={"contractComission"}>
              <List.Content>
                <SmallSubHeading><b>Este contrato vale:</b></SmallSubHeading>
                <Body className={"employeeComission"}>{`${contract.employee_comission}€`}</Body>
              </List.Content>
            </Column>
          }

          { contract.sell_state__name !== "ok" &&
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
  };

  const [contractsMatched, setContractsMatched] = useState([])

  function _handleSearchName(value) {
    setContractsMatched(contracts?.filter(contract => contract.user__name.toLowerCase().includes(value)))
    return contractsMatched, isSearching
  }

  function _handleSearchPower(value) {
    setContractsMatched(contracts?.filter(contract => contract?.power__name?.toLowerCase().includes(value)))
    return contractsMatched
  }

  function _handleSearchNif(value) {
    setContractsMatched(contracts?.filter(contract => contract.client_nif.toString().toLowerCase().includes(value)))
    return contractsMatched
  }

  function _handleSearchContractType(value) {
    setContractsMatched(contracts?.filter(contract => contract.contract_type.toString().toLowerCase().includes(value)))
    return contractsMatched
  }

  function _handleSearchSellState(value) {
    setContractsMatched(contracts?.filter(contract => contract.sell_state__name.toString().toLowerCase().includes(value)))
    return contractsMatched
  }

  return (
    isLoading ?
    <MainContainer>
      <SwishSpinner size={200} color="#686769" loading={isLoading} />
    </MainContainer>
    :
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} />
      <Row style={{
        width: '65%',
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '10%',
        marginLeft: '5%'
      }}>
        <SubHeading style={{
          marginBottom: '0%',
          color: CONSTANTS?.colors?.mediumGrey,
          textShadow: '1px 1px 1px rgba(200, 200, 200, 0.8)'
        }}>Podes pesquisar aqui 🔍</SubHeading>
      </Row>
      <Row style={{
        width: '67%',
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '10%',
        marginLeft: '7%'
      }}>
        <Col>
          <Body style={{marginBottom: '2%'}}>Comercial</Body>
          <SearchBar onChange={(e) => {
            setIsSearching(true)
            _handleSearchName(e.target.value.toLowerCase())
          }} onBlur={() => setIsSearching(false)}/>
        </Col>
        <Col>
          <Body style={{marginBottom: '2%'}}>Potência</Body>
          <SearchBar onChange={(e) => {
              setIsSearching(true)
              _handleSearchPower(e.target.value.toLowerCase())
            }} onBlur={() => setIsSearching(false)}/>
        </Col>
        <Col>
          <Body style={{marginBottom: '2%'}}>NIF / NIPC</Body>
          <SearchBar onChange={(e) => {
              setIsSearching(true)
              _handleSearchNif(e.target.value.toLowerCase())
            }} onBlur={() => setIsSearching(false)}/>
        </Col>
        <Col>
          <Body style={{marginBottom: '2%'}}>Tipo de contrato</Body>
          <SearchBar onChange={(e) => {
              setIsSearching(true)
              _handleSearchContractType(e.target.value.toLowerCase())
            }} onBlur={() => setIsSearching(false)}/>
        </Col>  
        <Col>
          <Body style={{marginBottom: '2%'}}>Estado da venda</Body>
          <SearchBar onChange={(e) => {
              setIsSearching(true)
              _handleSearchSellState(e.target.value.toLowerCase())
            }} onBlur={() => setIsSearching(false)}/>
        </Col>  
      </Row>
      <List divided verticalAlign="middle" className={"listContainer"}>
      { isSearching ?
        contractsMatched && contractsMatched.map(function(contract, index) {
          return renderContract(contract, index, true)
        })
      : cameFromDetail ?
        contractsFromDetail &&
          contractsFromDetail.map(function(contract, index) {
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
  )

};

export default ContractList;
