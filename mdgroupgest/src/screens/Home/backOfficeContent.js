import React, { useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";
import _ from 'lodash';

import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import {
  MDRow,
  MDCard,
  MDHero,
  MDContainer,
} from './md';

import Button from "../../components/Button/button";
import { Heading, SubHeading, Body } from '../../components/Text/text';
import data from '../MyTeam/data';

import {
  TeamContainer,
  ContentContainer,
  ResultsContainer,
  TeamAvatarsContainer 
} from './styles';

import request from '../../components/Form/request';
import { ko } from 'date-fns/locale';

const BackOfficeContent = (props) => {

  var teamLeadersCounter = 0;
  var instructorsCounter = 0;
  var salesPersonsCounter = 0;

  const teamLeadersArr = [];
  const instructorsArr = [];
  const salesPersonsArr = [];

  // Aqui começa a iteração sobre o Obj principal, por isso o "1" (Só há um escritório) -> Retiramos os TEAM LEADERS
  for (var i = 0; i < 1; i++) {

    var teamLeaders = data?.children;
    var teamLeadersQuantity = data?.children.length;

      // Loop para colocarmos todos os Team Leaders em uma array só
      for (var qtd = 0; qtd < teamLeadersQuantity; qtd++) {
        teamLeadersArr.push(teamLeaders[qtd]);
      }   

    teamLeadersCounter += teamLeadersQuantity;

    // Loop sobre os Team Leaders -> Retiramos os INSTRUTORES
    for (var j = 0; j < teamLeaders.length; j++) {

      var instructors = teamLeaders[j]?.children;
      var instructorsQuantity = teamLeaders[j]?.children.length;
      instructorsCounter += instructorsQuantity;

        // Loop para colocarmos todos os instrutores em uma array só
        for (let qtd = 0; qtd < instructorsQuantity; qtd++) {
          instructorsArr.push(instructors[qtd]);
        }         

      // Loop sobre os Instrutores -> Retiramos os COMERCIAIS
      for (var k = 0; k < instructors.length; k++) {

        var salesPersons = instructors[k]?.children;
        var salesPersonsQuantity = instructors[k]?.children.length;
        salesPersonsCounter += salesPersonsQuantity;

          // Loop para colocarmos todos os comerciais em uma array só
          for (let qtd = 0; qtd < salesPersonsQuantity; qtd++) {
            salesPersonsArr.push(salesPersons[qtd]);
          }             
      }
    }
  }

  const totalEmployees = teamLeadersArr.concat(instructorsArr, salesPersonsArr);
  const quantityOfTotalEmployees = totalEmployees?.length;

  const history = useHistory();

  var contracts = JSON.parse(localStorage.getItem('contracts'));

  const koContracts = [];
  const okContracts = [];
  const rContracts = [];
  const allContracts = [];

  console.log(contracts, 'contracts')

  function _sellStateOfContract() {

    for(let i = 0; i < contracts?.length; i++) {

      if(contracts[i]?.sell_state === "r") {
        rContracts.push(contracts[i]);
      } else if (contracts[i]?.sell_state === "ok"){
        okContracts.push(contracts[i]);
      } else {
        koContracts.push(contracts[i]);
      }
    }

    allContracts.push(...rContracts, ...okContracts, ...koContracts)

    return koContracts, okContracts, rContracts, allContracts;
  }

  _sellStateOfContract()

    // "x" is ko contracts qtd
    const x = koContracts?.length;

    // "y" is ok contracts qtd
    const y = okContracts?.length;

    // "z" is r contracts qtd
    const z = rContracts?.length;

    // "k" is total contracts qtd
    const a = allContracts?.length;

  function _getPercentage(percent, total) {
    const p = (percent / total) * 100;
    return p.toFixed(2);
  }

  const koPercentage = _getPercentage(x, a);
  const okPercentage = _getPercentage(y, a);
  const rPercentage = _getPercentage(z, a);

  console.log(koPercentage, 'kopercentage')
  console.log(okPercentage, 'okpercentage')
  console.log(rPercentage, 'rpercentage')

  var deletedID = props?.location?.state?.deletedID;

  function _removeContractFromRAM() {
    _.remove(contracts, function(obj) {
      return obj.id === deletedID
    })
  }

  function _getComissions() {
    var comissions = []
    contracts.map(contract => {
      comissions.push(parseFloat(contract?.employee_comission))
    })
    return comissions;
  }

  function _calculateComissions() {
    var comissions = _getComissions();
    var mySalary = 0
    for (let i = 0; i < comissions?.length; i++) {
      mySalary += comissions[i]
    }
    return mySalary
  }

  if(deletedID)
    { _removeContractFromRAM() }


  const renderHero = () => {

    return (
      <MDHero>
        <MDContainer>
          <SubHeading>Minha equipe</SubHeading>
          <Button
            fullWidth={false}
            disabled={false}
            action={() => {
              request.getEmployees()
              history.push("/MyTeam")
            }}
            small={true}
            text="Wolverines"
          />
        </MDContainer>
        <TeamAvatarsContainer>
          <AvatarGroup max={7}>
            {totalEmployees.map(employee => (
              <Avatar alt="Avatar Funcionário" src={employee.photo} />
            ))}
          </AvatarGroup>
        </TeamAvatarsContainer>
      </MDHero>
    );
  };

  const renderMyMonth = () => {
    const comissions = _calculateComissions()
    
    return (
      <MDCard>
        <MDCard.Body className={"monthCardBody"}>
          <Link
            to={{
              pathname: "/MyMonth",
              state: {
                data: "MÊS"
              }
            }}
          >
            <SubHeading>Meu mês</SubHeading>
          </Link> 
          <Heading className={"mySalary"}>{`${_calculateComissions()}€`}</Heading>
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyContracts = () => {
    return (
      <MDCard isTheMiddleCard>
        <MDCard.Body className={"contractsCardBody"}>
          <Link
            to={{
              pathname: "/ContractList",
              state: {
                data: contracts,
              }
            }}
          >
            <SubHeading style={{marginBottom: 0, marginTop: 30}}>Contratos</SubHeading>
          </Link>
          <Heading style={{marginTop: 0, marginBottom: 0, textShadow: "1px 1px 3px rgba(200, 200, 200, 0.7)"}}>{contracts?.length}</Heading>
          <MDRow>
            { okContracts?.length !== 0 &&
              <Body>
                {okContracts?.length} {`${okContracts?.length === 1 ? "contrato" : "contratos"} ${okContracts?.length === 1 ? "válido" : "válidos"} 🟢`} 
              </Body>
            }

            { rContracts?.length !== 0 && 
              <Body>
                {rContracts?.length}  {`${rContracts?.length === 1 ? "contrato" : "contratos"} por recuperar 🟡`} 
              </Body>
            }
            
            { koContracts?.length !== 0 && 
              <Body style={{marginBottom: 30}}>
                {koContracts?.length} {`${koContracts?.length === 1 ? "contrato" : "contratos"} ${koContracts?.length === 1 ? "anulado" : "anulados"} 🔴`}
              </Body>
            }

            { contracts?.length === 0 && <Body>Você não tem contratos ainda.</Body>}
            
          </MDRow>

          <Button
            fullWidth={false}
            disabled={false}
            // action={async () => {
            //   await request.getContracts()
            //   history.push("/ContractList")
            // }} Depois da demonstração o request vai ficar no login
            action={() => {
              history.push({
                pathname: "/ContractList",
                state: {
                  data: contracts
                }
              })
            }}

            small={true}
            text="Ver todos"
          />
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyResults = () => {
    return (
      <MDCard>
        <MDCard.Body className={"resultsCardBody"}>
          <Link to={{
            pathname:"/MyResults",
            state: {
              data: "RESULTADOS",
            }  
          }}>
            <SubHeading>Meus resultados</SubHeading>   
          </Link>
          <Heading style={{color: "#37981F",marginTop: 30, marginBottom: 0}}>{`${okPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos válidos</Body>
          <Heading style={{color: "#FEC35A",marginTop: 0, marginBottom: 0}}>{`${rPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos por recuperar</Body>
          <Heading style={{color: "#FF461E",marginTop: 0, marginBottom: 0}}>{`${koPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos anulados</Body>

          <Body style={{display: 'flex', alignSelf: 'flex-end', alignContent: "flex-start"}}>🟢</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  return (
    <ContentContainer>
      <TeamContainer>{renderHero()}</TeamContainer>
      <ResultsContainer>
        {renderMyMonth()}
        {renderMyContracts()}
        {renderMyResults()}
      </ResultsContainer>
    </ContentContainer>
  );
};

export default BackOfficeContent;
