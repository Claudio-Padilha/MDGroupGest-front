import React, { useMemo, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import _ from 'lodash';

import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

import {
  MDCol,
  MDRow,
  MDCard,
  MDHero,
  MDContainer,
} from './md';

import Button from "../../components/Button/button";
import { Heading, SmallSubHeading, SubHeading, Body } from '../../components/Text/text';

import {
  TeamContainer,
  ContentContainer,
  ResultsContainer,
  TeamAvatarsContainer 
} from './styles';

import employeesRequests from '../../hooks/requests/employeesRequests';
import dataRequests from '../../hooks/requests/dataRequests';
import officesRequests from '../../hooks/requests/officesRequests'

const BackOfficeContent = (props) => {

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  officesRequests.getOffice(currentUser.user.office)

  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;

  const officeResults = JSON.parse(localStorage.getItem('officeResults'));
  const mySalary = JSON.parse(localStorage.getItem('myCurrentSalary'));
  const myTeam = JSON.parse(localStorage.getItem('allEmployees'));
  const currentUserIsAdmin = currentUser?.user?.is_admin;  



  console.log(mySalary, 'meu salário')

  const userType = useMemo(() => {
    return currentUser?.user?.user_type;
  }, [currentUser]);

  let dataToPopulateGraphic = JSON.parse(localStorage.getItem('officeResultsByDay'))

  const dataToForm = []

  Object.keys(dataToPopulateGraphic).forEach(function(item){
    dataToForm.push(dataToPopulateGraphic[item])
   });

  var teamLeadersCounter = 0;
  var instructorsCounter = 0;
  var salesPersonsCounter = 0;

  const teamLeadersArr = [];
  const instructorsArr = [];
  const salesPersonsArr = [];

  var employeeCounter = 0
  const totalEmployeeTypes = []
  const totalEmployees = []

  for (var employee in myTeam) {
    totalEmployeeTypes.push(myTeam[employee])
  }

  totalEmployeeTypes.map(employeeType => {
    for(let i = 0; i < employeeType?.length; i++) {
      totalEmployees.push(employeeType[i])
    }
  })

  // Aqui começa a iteração sobre o Obj principal, por isso o "1" (Só há um escritório) -> Retiramos os TEAM LEADERS
    for (var i = 0; i < 1; i++) {

      var teamLeaders = myTeam?.children;
      var teamLeadersQuantity = myTeam?.children?.length;
  
      // Loop para colocarmos todos os Team Leaders em uma array só
      for (var qtd = 0; qtd < teamLeadersQuantity; qtd++) {
        teamLeadersArr.push(teamLeaders[qtd]);
      }
  
      teamLeadersCounter += teamLeadersQuantity;
  
      // Loop sobre os Team Leaders -> Retiramos os INSTRUTORES
      for (var j = 0; j < teamLeaders?.length; j++) {
  
        var instructors = teamLeaders[j]?.children;
        var instructorsQuantity = teamLeaders[j]?.children?.length;
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

  const history = useHistory();

  var contracts = JSON.parse(localStorage.getItem('contracts'));

  const koContracts = [];
  const okContracts = [];
  const rContracts = [];
  const allContracts = [];

  function _sellStateOfContract() {

    for(let i = 0; i < contracts?.length; i++) {
      if (currentUser?.user?.user_type === "manager" || currentUser?.user?.user_type === "secretary") {
        if(contracts[i]?.sell_state__name === "r") {
          rContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ok"){
          okContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ko") {
          koContracts.push(contracts[i]);
        }
      } else {
        if(contracts[i]?.sell_state__name === "r" && contracts[i]?.user === currentUser?.user?.id) {
          rContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ok" && contracts[i]?.user === currentUser?.user?.id){
          okContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ko" && contracts[i]?.user === currentUser?.user?.id) {
          koContracts.push(contracts[i]);
        }
      }

    }

    allContracts.push(...rContracts, ...okContracts, ...koContracts)

    return koContracts, okContracts, rContracts, allContracts;
  }

  console.log(currentUser?.user?.id, 'USUÁRIO ATUAL')

  _sellStateOfContract()

    // "x" is ko contracts qtd
    const x = koContracts?.length;

    // "y" is ok contracts qtd
    const y = okContracts?.length;

    // "z" is r contracts qtd
    const z = rContracts?.length;

    // "k" is total contracts qtd
    const a = allContracts?.length;

    console.log(dataToPopulateGraphic, "DATA QUE QUERO VER")

    const dataOfficeResult = [ [
      'Dias',
      `${y === 1 || y === 0 ? `(${y}) Válido` : `(${y}) Válidos`}`,
      `${z === 1 || z === 0 ? `(${z}) Pendente` : `(${z}) Pendentes`}`,
      `${x === 1 || x === 0 ? `(${x}) Anulado` : `(${x}) Anulados`}`,
    ], ...dataToForm]

  function _getPercentage(percent, total) {
    if (percent !== 0 || total !== 0) {
      const p = (percent / total) * 100;
      return p.toFixed(2);
    } else {
      return 0;
    }
  }

  console.log(allContracts, 'TODOS OS CONTRATOS')

  const koPercentage = _getPercentage(x, a);
  const okPercentage = _getPercentage(y, a);
  const rPercentage = _getPercentage(z, a);

  var deletedID = props?.location?.state?.deletedID;

  function _removeContractFromRAM() {
    _.remove(contracts, function(obj) {
      return obj.id === deletedID
    })
  }

  dataRequests.getMyTeam(currentUser?.user?.office)

  function _getOfficeComissions() {
    dataRequests.getMySalary()
    dataRequests.getOfficeResults(currentOfficeID)
  }
  
  useEffect(() => {
    _getOfficeComissions()
  }, [allContracts])

  console.log(dataOfficeResult, "ANTES DE MANDAR PELA PROP")

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
              employeesRequests.getEmployees()
              history.push("/MyTeam")
            }}
            small={true}
            text="Wolverines"
          />
        </MDContainer>
        <TeamAvatarsContainer>
          <AvatarGroup max={12}>
            {totalEmployees.map(employee => (
              console.log(employee, 'FUNCIONÀRIO'),
              <Avatar alt="Avatar Funcionário" src={employee?.user?.avatar} />
            ))}
          </AvatarGroup>
        </TeamAvatarsContainer>
      </MDHero>
    );
  };
  
  const renderOfficeMonth = () => {
    return (
      <MDCard className={"officeMonth"}>
        <MDCard className={"officeMonthResult"}>
          <MDCard.Body className={"officeMonthCardBody"}>
            <Link
              to={{
                pathname: "/OfficeMonthResultDetail",
                state: {
                  contracts: {
                    all: allContracts,
                    ok: okContracts,
                    ko: koContracts,
                    pending: rContracts,
                    dataToDiagram: dataOfficeResult,
                  }
                }
              }}
            >
              <SubHeading>Faturamento</SubHeading>
            </Link> 
            <Heading className={"mySalary"}>{`${officeResults}€`}</Heading>
          </MDCard.Body>
        </MDCard>

        { userType === "manager" &&
        <MDCard className={"managerMonth"}>
          <MDCard.Body className={"managerMonthCardBody"}>
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>Meu mês</SubHeading>
            <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-3%'}}>Até agora você já tem:</Body>
            <Heading className={"mySalary"}>{`${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard>
        }

        { userType === "secretary" &&
        <MDCard className={"managerMonth"}>
          <MDCard.Body className={"managerMonthCardBody"}>
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}></SubHeading>
            <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-3%'}}>Até agora você já tem:</Body>
            <Heading className={"mySalary"}>{`${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard>
        }



        {/* <MDCard className={"managerMonth"}>
          <MDCard.Body className={"managerMonthCardBody"}>
            <Link
              to={{
                pathname: "/MyMonth",
                state: {
                  data: "MÊS"
                }
              }}
            >
              <SubHeading>Meus lucros</SubHeading>
            </Link> 
            <Heading className={"mySalary"}>{`${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard> */}

      </MDCard>
    )
  }

  const renderMyMonth = () => {

    return (
      <MDCard>
        <MDCard.Body className={"monthCardBody"}>
          <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>Meu mês</SubHeading>
          <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-35%'}}>Até agora você já tem:</Body>
          <Heading className={"mySalary"}>{`${mySalary}€`}</Heading>
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
                data: allContracts,
                currentUser: currentUser
              }
            }}
          >
            <SubHeading style={{marginBottom: 0, marginTop: 30}}>Contratos</SubHeading>
          </Link>
          <Heading style={{marginTop: 0, marginBottom: 0, textShadow: "1px 1px 3px rgba(200, 200, 200, 0.7)"}}>{allContracts?.length}</Heading>
        

          <MDCol style={{width: '100%', marginLeft: `${contracts?.length === 0 ? '25%' : '40%'}`, marginBottom: '5%'}}>
            { okContracts?.length !== 0 &&
              <MDRow style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                <MDCol style={{marginRight: '5%'}}><Body>🟢</Body></MDCol>
                <MDCol>
                  <Body>
                    {okContracts?.length} {`${okContracts?.length === 1 ? "contrato" : "contratos"} ${okContracts?.length === 1 ? "válido" : "válidos"}`} 
                  </Body>
                </MDCol>
              </MDRow>
            }

            { rContracts?.length !== 0 &&
              <MDRow style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                <MDCol style={{marginRight: '5%'}}><Body>🟡</Body></MDCol>
                <MDCol>
                  <Body>{rContracts?.length} {`${rContracts?.length === 1 ? "contrato" : "contratos"} por recuperar`}</Body>
                </MDCol>
              </MDRow>
            }

            { koContracts?.length !== 0  &&
              <MDRow style={{display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
                <MDCol style={{marginRight: '5%'}}><Body>🔴</Body></MDCol>
                <MDCol>
                  <Body>
                    {koContracts?.length} {`${koContracts?.length === 1 ? "contrato" : "contratos"} ${koContracts?.length === 1 ? "anulado" : "anulados"}`}
                  </Body>
                </MDCol>
              </MDRow>
            }
            { contracts?.length === 0 && <Body>Você não tem contratos ainda.</Body>}
            
          </MDCol>

          <Button
            fullWidth={false}
            disabled={false}
            action={() => {
              history.push({
                pathname: "/ContractList",
                state: {
                  data: allContracts
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

  const resultStatus = useMemo(() => {
    if (okPercentage < 70 && allContracts?.length !== 0) {
      return "🔴";
    } else if (okPercentage < 80 && allContracts?.length !== 0) {
      return "🟡";
    } else if (okPercentage > 70 && allContracts?.length !== 0){
      return "🟢";
    } else {
      return "⚪️"
    }
  }, [okPercentage])

  const renderMyResults = () => {
    return (
      <MDCard>
        <MDCard.Body className={"resultsCardBody"}>
          <Link to={{
            pathname:"/MyResults",
            state: {
              percentages: {
                ok: okPercentage,
                r: rPercentage,
                ko: koPercentage,
              },
              contracts: {
                ok: okContracts,
                r: rContracts,
                ko: koContracts,
                all: allContracts
              },
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

          <Body style={{display: 'flex', alignSelf: 'center', alignContent: "flex-start"}}>{resultStatus}</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  return (
      <ContentContainer>
        <TeamContainer>{renderHero()}</TeamContainer>
        <ResultsContainer>
          {userType === "manager" || userType === "secretary" && renderOfficeMonth()} 
          {userType !== "manager" || userType === "secretary" && renderMyMonth()}
          {renderMyContracts()}
          {renderMyResults()}
        </ResultsContainer>
      </ContentContainer>
  );
};

export default BackOfficeContent;
