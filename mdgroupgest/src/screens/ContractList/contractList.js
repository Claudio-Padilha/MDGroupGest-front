import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';

import { SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon, EditIcon } from '../../components/Icon/icons';
import request from '../../components/Form/request';

import contractsRequests from "../../hooks/requests/contractsRequests";

import {
  MainContainer,
  Row,
  Column,
  LogoContainer,
  EmptyContainer
} from "./styles";

import { List } from "semantic-ui-react";


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

  var localStorage = window.localStorage;

  const contracts = useMemo(() => {
    if (props?.location?.state?.data) {
      return props?.location?.state?.data
    } else {
      return JSON.parse(localStorage.getItem('contracts'))
    }
  },[props])

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

  if(deletedID) {
    _removeContractFromRAM()
  }

  const renderContract = (contract, i) => {
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
        <List.Item key={contract.id} className={"eachContract"}>
          <Column className={"clientInfo"}>
            <Column>
              <Row>
                <SubHeading style={{marginTop: -10, marginBottom: 0}}>{`Contrato nº: ${i + 1}`}</SubHeading>
                <Button
                  style={{
                    width: '30%',
                    backgroundColor: 'green',
                    marginLeft: '10%',
                    marginTop:' -2%',
                    borderRadius: '10%',
                    cursor: 'pointer',
                  }}
                  disabled={false}
                  action={() => { contractsRequests.updateContract(contract?.id) }}
                  small={true}
                  text="Ativar contrato"
                />
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


          <Column className={"contractComission"}>
            <List.Content>
              <SmallSubHeading><b>Este contrato vale:</b></SmallSubHeading>
              <Body className={"employeeComission"}>{` ${contract.employee_comission}€`}</Body>
            </List.Content>
          </Column>
          <Column className={"optionsAboutContract"}>
            <Button
              disabled={false}
              action={() => {
                history.push({
                  pathname:"/ContractDetail",
                  state: { 
                    data: contract,
                    contractNumber: i + 1
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

  return (
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} color={"black"}/>
      <List divided verticalAlign="middle" className={"listContainer"}>
      {contracts?.length === 0 && 
        <EmptyContainer>
          <SubHeading>Ainda não há contratos...</SubHeading>
        </EmptyContainer>
      }
      {contracts && 
        contracts.map(function(contract, index) {
          return renderContract(contract, index);
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
