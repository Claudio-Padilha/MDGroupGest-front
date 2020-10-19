import React from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';

import { SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  Row,
  Column,
  LogoContainer
} from "./styles";

import {  List } from "semantic-ui-react";
import request from "../../components/Form/request";

const ContractList = () => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  const history = useHistory();

  const localStorage = window.localStorage;

  var contracts = JSON.parse(localStorage.getItem('contracts'));

  console.log(contracts, 'CONTRATOS')

  const renderContract = (contract, i) => {
    return (
      <>
        <List.Item key={contract.id} className={"eachContract"}>
          <Column className={"clientInfo"}>
            <SubHeading>{`Contrato nº: ${i + 1}`}</SubHeading>
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
            <Button
              disabled={false}
              action={() => {
                request.deleteContract(contract?.id)
                history.push("/BackOffice")
              }}
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
      <List divided verticalAlign="middle" className={"listContainer"}>
      {contracts.map(function(contract, index) {
        return renderContract(contract, index);
      })}        
      </List>
      <LogoContainer><LogoMD action={() => history.push("/BackOffice")}/></LogoContainer>
    </MainContainer>
  )

};

export default ContractList;
