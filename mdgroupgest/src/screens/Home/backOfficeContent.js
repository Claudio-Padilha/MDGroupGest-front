import React, { useState, useMemo } from 'react';
import { Link, useHistory } from "react-router-dom";
import _ from 'lodash';

import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";
import { Avatar } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { useDate } from '../../hooks/date';

import {
  MDCol,
  MDRow,
  MDCard,
  MDHero,
  MDContainer,
} from './md';

import Button from "../../components/Button/button";
import { Heading, SmallSubHeading, SubHeading, Body } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';

import {
  TeamContainer,
  ContentContainer,
  ContentContainerLoader,
  ResultsContainer,
  TeamAvatarsContainer 
} from './styles';

import CONSTANTS from '../../constants';

import employeesRequests from '../../hooks/requests/employeesRequests';
import dataRequests from '../../hooks/requests/dataRequests';
import officesRequests from '../../hooks/requests/officesRequests'
import contractsRequests from '../../hooks/requests/contractsRequests';

const BackOfficeContent = (props) => {

  dataRequests.getFeedbackCall()
  dataRequests.getSellState()
  dataRequests.getPayment()
  dataRequests.getGasScale()
  dataRequests.getPower()
  
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, [1200]);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  async function _getOffice() {
    await officesRequests.getOffice(currentOfficeID)
    await contractsRequests.getContracts(currentOfficeID)
    await dataRequests.getOfficesResultsByDay(currentOfficeID)
    await dataRequests.getResultsToPresent();
  }

  _getOffice()

  const officeResults = JSON.parse(localStorage.getItem('officeResults'));
  const resultsToPresent = JSON.parse(localStorage.getItem('resultsToPresent'));
  const mySalary = JSON.parse(localStorage.getItem('myCurrentSalary'));
  const myTeam = JSON.parse(localStorage.getItem('allEmployees'));

  const currentOfficeObject = JSON.parse(localStorage.getItem('currentOffice'))

  const userType =  currentUser?.user?.user_type;

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

  const manager = totalEmployees?.filter(employee => employee?.user?.user_type === "manager");
  const managerObject = manager[0];

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

  var contracts = JSON.parse(localStorage.getItem('contracts'));

  console.log(contracts, 'CONTRATOOOOOOS')

  const koContracts = [];
  const okContracts = [];
  const rContracts = [];
  const allContracts = [];

  const _getMonthContracts = useMemo(() => {
    const currentDateJS = new Date();

    const monthContractsForManagerOrSecretary = contracts.filter(contract => {
      var date = new Date(contract.delivery_date);
      return (
        date.getMonth() === currentDateJS?.getMonth() 
        && 
        date.getUTCFullYear() === currentDateJS?.getUTCFullYear()
      )
    })

    const monthContractsForEmployee = contracts.filter(contract => {
      var date = new Date(contract.delivery_date);
      return (
        date.getMonth() === currentDateJS?.getMonth() 
        && 
        date.getUTCFullYear() === currentDateJS?.getUTCFullYear()
        &&
        contract?.user === currentUser?.id
      )
    })

    if(userType === "manager") {
      return monthContractsForManagerOrSecretary;
    } else if(userType === "secretary") {
      return monthContractsForManagerOrSecretary;
    } else {
      return monthContractsForEmployee;
    }
  },[contracts])

  console.log(_getMonthContracts, 'TESTEZAAAAACO')

  function _sellStateOfContract() {

    for(let i = 0; i < _getMonthContracts?.length; i++) {
      if (currentUser?.user?.user_type === "manager" || currentUser?.user?.user_type === "secretary") {
        if(_getMonthContracts[i]?.sell_state__name === "r") {
          rContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ok"){
          okContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ko") {
          koContracts.push(_getMonthContracts[i]);
        }
      } else {
        if(_getMonthContracts[i]?.sell_state__name === "r" && _getMonthContracts[i]?.user === currentUser?.user?.id) {
          rContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ok" && _getMonthContracts[i]?.user === currentUser?.user?.id){
          okContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ko" && _getMonthContracts[i]?.user === currentUser?.user?.id) {
          koContracts.push(_getMonthContracts[i]);
        }
      }
    }

    return koContracts, okContracts, rContracts;
  }



  _sellStateOfContract()

    // "x" is ko contracts qtd
    const x = koContracts?.length;

    // "y" is ok contracts qtd
    const y = okContracts?.length;

    // "z" is r contracts qtd
    const z = rContracts?.length;

    // "k" is total contracts qtd
    const a = _getMonthContracts?.length;

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

  const koPercentage = _getPercentage(x, a);
  const okPercentage = _getPercentage(y, a);
  const rPercentage = _getPercentage(z, a);

  var deletedID = props?.location?.state?.deletedID;

  function _removeContractFromRAM() {
    _.remove(contracts, function(obj) {
      return obj.id === deletedID
    })
  }

  console.log(_getMonthContracts, 'TESTE DO MONTH CONTRACTS')

  dataRequests.getMyTeam(currentUser?.user?.office)

  function _getOfficeComissions() {
    dataRequests.getMySalary()
    dataRequests.getOfficeResults(currentOfficeID)
  }
  
  _getOfficeComissions()

  if(deletedID)
    { _removeContractFromRAM() }

  const renderHero = () => {

    return (
      <MDHero>
        <MDContainer>
          <Heading>{currentOfficeObject?.name}</Heading>
          <Button
            fullWidth={false}
            disabled={false}
            action={() => {
              // dataRequests.getMyTeam(currentOfficeID)
              history.push("/MyTeam")
            }}
            small={true}
            text="Ver equipa"
          />
        </MDContainer>
        <TeamAvatarsContainer>
          <AvatarGroup max={12}>
            {totalEmployees.map(employee => (
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
                    all: _getMonthContracts,
                    ok: okContracts,
                    ko: koContracts,
                    pending: rContracts,
                    dataToDiagram: dataOfficeResult,
                  }
                }
              }}
            >
              <SubHeading>Faturação</SubHeading>
            </Link> 
            <Heading className={"mySalary"}>{`${officeResults}€`}</Heading>
          </MDCard.Body>
        </MDCard>

        <MDCard className={"managerMonth"}>
          <MDCard.Body className={"managerMonthCardBody"}>
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>{userType === "secretary" ? 'Gerente' : 'Meu mês'}</SubHeading>
            { userType === "manager" && <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-3%'}}>Até agora você já tem:</Body>}
            <Heading style={userType === "secretary" ? {color: CONSTANTS?.colors?.black, fontSize: '36px', marginTop: '-20%'} : {}} className={"mySalary"}>{userType === "secretary" ? `${managerObject?.user?.name}` : `${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard>

      </MDCard>
    )
  }

  const renderMyMonth = () => {
    if(userType === "manager" || userType === "secretary") {
      return;
    }
    else {
      return (
        <MDCard>
          <MDCard.Body className={"monthCardBody"}>
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>Meu mês</SubHeading>
            <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-35%'}}>Até agora você já tem:</Body>
            <Heading className={"mySalary"}>{`${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard>
      );
    }
  };

  const currentMonth = useDate();
  const renderMyContracts = () => {
    return (
      <MDCard isTheMiddleCard>
        <MDCard.Body className={"contractsCardBody"}>
          <Link
            to={{
              pathname: "/ContractList",
              state: {
                data: _getMonthContracts,
                currentUser: currentUser
              }
            }}
          >
            <SubHeading style={{marginBottom: 0, marginTop: 30}}>Contratos {currentMonth.toUpperCase()}</SubHeading>
          </Link>
          <Heading style={{marginTop: 0, marginBottom: 0, textShadow: "1px 1px 3px rgba(200, 200, 200, 0.7)"}}>{_getMonthContracts?.length}</Heading>
      
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
                  data: _getMonthContracts,
                }
              })
            }}

            small={true}
            style={{marginTop: '5%'}}
            text="Contratos do mês"
          />

          { userType === "manager" &&
            <Button
              fullWidth={false}
              disabled={false}
              action={() => {
                history.push({
                  pathname: "/ContractList",
                  state: {
                    data: contracts,
                  }
                })
              }}
              small={true}
              style={{marginTop: '2%'}}
              text="Ver todos os contratos"
            />
          }

          { userType === "secretary" &&
            <Button
              fullWidth={false}
              disabled={false}
              action={() => {
                history.push({
                  pathname: "/ContractList",
                  state: {
                    data: contracts,
                  }
                })
              }}
              small={true}
              style={{marginTop: '2%'}}
              text="Ver todos os contratos"
            />
          }

        </MDCard.Body>
      </MDCard>
    );
  };

  const resultStatus = () => {
    if (okPercentage < 70 && _getMonthContracts?.length !== 0) {
      return "🔴";
    } else if (okPercentage < 80 && _getMonthContracts?.length !== 0) {
      return "🟡";
    } else if (okPercentage > 70 && _getMonthContracts?.length !== 0){
      return "🟢";
    } else {
      return "⚪️"
    }
  }

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
                all: _getMonthContracts
              },
              resultsInfo: resultsToPresent,
              currentSalary: mySalary,
              currentFacturing: officeResults,
            }  
          }}>
            <SubHeading>Resultados</SubHeading>
          </Link>
          <Heading style={{color: "#37981F",marginTop: 30, marginBottom: 0}}>{`${okPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos válidos</Body>
          <Heading style={{color: "#FEC35A",marginTop: 0, marginBottom: 0}}>{`${rPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos por recuperar</Body>
          <Heading style={{color: "#FF461E",marginTop: 0, marginBottom: 0}}>{`${koPercentage}%`}</Heading>
          <Body style={{marginTop: -15, marginBottom: 0, fontSize: 12}}>Contratos anulados</Body>

          <Body style={{display: 'flex', alignSelf: 'center', alignContent: "flex-start"}}>{resultStatus()}</Body>
        </MDCard.Body>
      </MDCard>
    );
  };

  if (isLoading) {
    return (
      <ContentContainerLoader style={{
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {/* <GuardSpinner size={80} frontColor={CONSTANTS?.colors?.darkGrey} backColor={CONSTANTS?.colors?.black} loading={isLoading} /> */}
        {/* <SwishSpinner size={80} frontColor="#686769" backColor="#fff" loading={isLoading} /> */}
        <SwishSpinner size={100} color="#686769" loading={isLoading} />
      </ContentContainerLoader>
    )
  } else {
    return (
      <ContentContainer>
        <TeamContainer>{renderHero()}</TeamContainer>
        <ResultsContainer>
          {userType === "manager" && renderOfficeMonth()} 
          {userType !== "manager" && userType === "secretary" && renderOfficeMonth()} 
          {renderMyMonth()}
          {renderMyContracts()}
          {renderMyResults()}
        </ResultsContainer>
      </ContentContainer>
    );
  }


};

export default BackOfficeContent;
