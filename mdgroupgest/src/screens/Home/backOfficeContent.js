import React, { useState, useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";

import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import {
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

const BackOfficeContent = (props) => {
  request.getContracts()

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
        for (var qtd = 0; qtd < instructorsQuantity; qtd++) {
          instructorsArr.push(instructors[qtd]);
        }         

      // Loop sobre os Instrutores -> Retiramos os COMERCIAIS
      for (var k = 0; k < instructors.length; k++) {

        var salesPersons = instructors[k]?.children;
        var salesPersonsQuantity = instructors[k]?.children.length;
        salesPersonsCounter += salesPersonsQuantity;

          // Loop para colocarmos todos os comerciais em uma array só
          for (var qtd = 0; qtd < salesPersonsQuantity; qtd++) {
            salesPersonsArr.push(salesPersons[qtd]);
          }             
      }
    }
  }

  const totalEmployees = teamLeadersArr.concat(instructorsArr, salesPersonsArr);
  const quantityOfTotalEmployees = totalEmployees?.length;

  console.log(totalEmployees, 'TODOS')
  console.log(instructorsArr, 'INSTRUTORES')
  console.log(quantityOfTotalEmployees, 'QUANTIDADE')

  const history = useHistory();


  function _getComissions() {
    var contracts = JSON.parse(localStorage.getItem('contracts'));
    var comissions = []
    contracts.map(contract => {
      comissions.push(parseFloat(contract?.employee_comission))
    })
    return comissions;
  }

  function _calculateComissions() {
    const comissions = _getComissions();
    var mySalary = 0
    for (var i = 0; i < comissions?.length; i++) {
      mySalary += i
    }

    return mySalary
  }

  console.log(_calculateComissions(), 'MEU SALÁRIO')

  const renderHero = () => {

    var employees = localStorage.getItem('myTeam');

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

    
    return (
      <MDCard>
        <MDCard.Body className={"cardBody"}>
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
          <Body className={"mySalary"}>{`${_calculateComissions()}€`}</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyContracts = () => {
    var contractCounter = JSON.parse(localStorage.getItem('contracts'));
    var contractCounterParsed = contractCounter?.length;
    return (
      <MDCard isTheMiddleCard>
        <MDCard.Body className={"cardBody"}>
          <Link
            to={{
              pathname: "/ContractList",
              state: {
                data: "CONTRATOS",
              }
            }}
          >
            <SubHeading>Contratos</SubHeading>
          </Link>
          <Heading>{contractCounterParsed}</Heading>
          <Button
            fullWidth={false}
            disabled={false}
            // action={async () => {
            //   await request.getContracts()
            //   history.push("/ContractList")
            // }} Depois da demonstração o request vai ficar no login
            action={() => {
              history.push("/ContractList")
            }}

            small={true}
            text="Ver contratos"
          />
        </MDCard.Body>
      </MDCard>
    );
  };

  const renderMyResults = () => {
    return (
      <MDCard>
        <MDCard.Body className={"cardBody"}>
          <Link to={{
            pathname:"/MyResults",
            state: {
              data: "RESULTADOS",
            }  
          }}>
            <SubHeading>Meus resultados</SubHeading>   
          </Link>
          <Body>+ 12.4%</Body>
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
