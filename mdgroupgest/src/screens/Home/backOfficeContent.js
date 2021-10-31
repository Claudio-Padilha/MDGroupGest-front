import React, { useState, useMemo, useReducer, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import _ from 'lodash'

import { SwishSpinner} from "react-spinners-kit"
import { Avatar } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { useDate } from '../../hooks/date'

import {
  MDCol,
  MDRow,
  MDCard,
  MDHero,
  MDContainer,
} from './md';

import Button from "../../components/Button/button"
import { Heading, SubHeading, Body } from '../../components/Text/text'

import {
  TeamContainer,
  ContentContainer,
  ContentContainerLoader,
  ResultsContainer,
  TeamAvatarsContainer 
} from './styles'

import CONSTANTS from '../../constants'

import dataRequests from '../../hooks/requests/dataRequests'
import officesRequests from '../../hooks/requests/officesRequests'
import { useRefresh } from '../../hooks/window/refresh'
import { useStartApp } from '../../hooks/backoffice/startApp'
import { useAuth } from '../../hooks/employees/auth'
import employeesRequests from '../../hooks/requests/employeesRequests'
import contractsRequests from '../../hooks/requests/contractsRequests'

import './styles.css'

const BackOfficeContent = (props) => {
  
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  const start = useStartApp()

  const fromContractsList = props?.location?.state?.fromContractsList;
  const fromMyResults = props?.location?.state?.fromMyResults;
  const fromEmployeeType = props?.location?.state?.fromEmployeeType;
  const fromMyTeam = props?.location?.state?.fromMyTeam;

  const ramCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  const ramCurrentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  const ramOfficeResults = JSON.parse(localStorage.getItem('officeResults'));
  const ramResultsToPresent = JSON.parse(localStorage.getItem('resultsToPresent'));
  const ramMySalary = JSON.parse(localStorage.getItem('myCurrentSalary'));
  const ramMyTeam = JSON.parse(localStorage.getItem('allEmployees'));
  const ramCurrentOfficeObject = JSON.parse(localStorage.getItem('currentOffice'));
  const ramContracts = JSON.parse(localStorage.getItem('contracts'));
  const ramAllContracts = JSON.parse(localStorage.getItem('allContracts'));
  const ramDataToPopulateGraphic = JSON.parse(localStorage.getItem('officeResultsByDay'));
  const ramMyTeamResults = JSON.parse(localStorage.getItem('myTeamResults'));

  setTimeout(() => {
    setIsLoading(false)
  }, [300]);

  useEffect(() => { 
    if(fromContractsList || fromMyResults) {
      window.location.reload()
    }
  }, [fromContractsList, fromMyResults])

  const { wasRefreshed } = useRefresh()

  async function _getOffice() {
    await officesRequests.getOffice(ramCurrentOfficeID)
    await contractsRequests.monthContracts(ramCurrentOfficeID)
    await dataRequests.getOfficesResultsByDay(ramCurrentOfficeID)
    await employeesRequests.getMyTeamResults()
    await contractsRequests.getAllContracts()
  }

  _getOffice()

  const initialState = {
    ramCurrentUser,
    ramCurrentOfficeID,
    ramOfficeResults,
    ramResultsToPresent,
    ramMySalary,
    ramMyTeam,
    ramCurrentOfficeObject,
    ramContracts,
    ramAllContracts,
    ramDataToPopulateGraphic,
    ramMyTeamResults
  }

  if(!wasRefreshed || fromContractsList || initialState !== undefined || fromMyResults) {
    localStorage.setItem('backofficeScreenState', JSON.stringify(initialState))
  }

  const reducer = (firstState, action) => {
    let reducerState = {}

    const stateOnRAM = JSON.parse(localStorage.getItem('backofficeScreenState'))

    switch(action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM
        return reducerState
        // no default
    }

    localStorage.removeItem('backofficeScreenState')
    localStorage.setItem('backofficeScreenState', JSON.stringify(reducerState))
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function _screenStateDispatch() {
    window.location.reload()
    return dispatch('MAINTAIN_SCREEN_STATE')
  }

  useEffect(() => {
    if(fromContractsList) {
      _screenStateDispatch()
    } else if (fromMyResults) {
      _screenStateDispatch()
    } else if(fromEmployeeType) {
      _screenStateDispatch()
    } else if(fromMyTeam) {
      _screenStateDispatch()
    } else if(wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else if(initialState) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, fromContractsList, fromMyResults, fromEmployeeType, fromMyTeam, wasRefreshed])

  const currentUser = state?.ramCurrentUser;
  const currentOfficeID = state?.ramCurrentOfficeID;
  const officeResults = state?.ramOfficeResults;
  const resultsToPresent = state?.ramResultsToPresent;
  const mySalary = state?.ramMySalary;
  const myTeam = state?.ramMyTeam;
  const currentOfficeObject = state?.ramCurrentOfficeObject;
  const contracts = state?.ramContracts;
  const allContractsToSend = state?.ramAllContracts;
  let dataToPopulateGraphic = state?.ramDataToPopulateGraphic || {};
  const userType =  currentUser?.user?.user_type

  const { 
    isCEO,
    isAdministrator,
    isRegularManager,
    isRegularSecretary
  } = useAuth()

  const haveAccess = (isCEO || isAdministrator || isRegularManager || isRegularSecretary)

  const dataToForm = []

  Object.keys(dataToPopulateGraphic).forEach(function(item){
    dataToForm.push(dataToPopulateGraphic[item])
   });

  // eslint-disable-next-line no-unused-vars
  var teamLeadersCounter = 0
  // eslint-disable-next-line no-unused-vars
  var instructorsCounter = 0
  // eslint-disable-next-line no-unused-vars
  var salesPersonsCounter = 0

  const teamLeadersArr = []
  const instructorsArr = []
  const salesPersonsArr = []

  const totalEmployeeTypes = []
  const totalEmployees = []

  for (var employee in myTeam) {
    totalEmployeeTypes.push(myTeam[employee])
  }

  // eslint-disable-next-line array-callback-return
  totalEmployeeTypes.map(employeeType => {
    for(let i = 0; i < employeeType?.length; i++) {
      totalEmployees.push(employeeType[i])
    }
  })

  const managerObject = totalEmployees?.filter(employee => employee?.user?.user_type === "manager")[0];
  const ceoObject = totalEmployees?.filter(employee => employee?.user?.user_type === 'ceo')[0]

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

  const _getMonthContracts = useMemo(() => {
    const currentDateJS = new Date()

    const monthContractsForManagerOrSecretary = contracts.filter(contract => {
      var date = new Date(contract.delivery_date)
      return (
        date.getMonth() === currentDateJS?.getMonth() 
        && 
        date.getUTCFullYear() === currentDateJS?.getUTCFullYear()
      )
    })

    const monthContractsForEmployee = contracts.filter(contract => {
      var date = new Date(contract.delivery_date)
      return (
        date.getMonth() === currentDateJS?.getMonth() 
        && 
        date.getUTCFullYear() === currentDateJS?.getUTCFullYear()
        &&
        contract?.user === currentUser?.id
      )
    })

    if (haveAccess) {
      return monthContractsForManagerOrSecretary
    } else if(userType === "secretary") {
      return monthContractsForManagerOrSecretary
    } else {
      return monthContractsForEmployee
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[contracts])

  const koContracts = []
  const okContracts = []
  const rContracts = []

  const monthKoContracts = []
  const monthOkContracts = []
  const monthRContracts = []

  function _sellStateOfContract() {

    if (haveAccess) {
      for (let i = 0; i < _getMonthContracts?.length; i++) {
        if(_getMonthContracts[i]?.sell_state__name === "r") {
          monthRContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ok"){
          monthOkContracts.push(_getMonthContracts[i]);
        } else if (_getMonthContracts[i]?.sell_state__name === "ko") {
          monthKoContracts.push(_getMonthContracts[i]);
        }
      }
    } else {
      for(let i = 0; i < contracts?.length; i++) {
        if(contracts[i]?.sell_state__name === "r" && contracts[i]?.user === currentUser?.user?.id) {
          rContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ok" && contracts[i]?.user === currentUser?.user?.id){
          okContracts.push(contracts[i]);
        } else if (contracts[i]?.sell_state__name === "ko" && contracts[i]?.user === currentUser?.user?.id) {
          koContracts.push(contracts[i]);
        }
      }
    }

    // eslint-disable-next-line no-sequences
    return monthKoContracts, monthOkContracts, monthRContracts, okContracts, rContracts
  }

  _sellStateOfContract()

  // "x" is ko contracts qtd
  const x = haveAccess ? monthKoContracts?.length : koContracts?.length;

  // "y" is ok contracts qtd
  const y = haveAccess ? monthOkContracts?.length : okContracts?.length;

  // "z" is r contracts qtd
  const z = haveAccess ? monthRContracts?.length : rContracts?.length;

  // "k" is total contracts qtd
  const a = haveAccess ? _getMonthContracts?.length : contracts?.length;

  const dataOfficeResult = [[
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

  const koPercentage = _getPercentage(x, a)
  const okPercentage = _getPercentage(y, a)
  const rPercentage = _getPercentage(z, a)

  // const handleMessageButton = () => (
  //   <div style={{
  //     position: 'absolute',
  //     top: '5vh',
  //     right: '10vw'
  //   }}>
  //     <Button
  //       fullWidth={false}
  //       disabled={false}
  //       action={() => createNotification('error')}
  //       small={true}
  //       text="Tens uma notificação"
  //     />
  //   </div>

  // )

  // const [showPenalizationMessage, setShowPenalizationMessage] = useState(koPercentage > 30)

  // useEffect(() => {

  //   if (showPenalizationMessage) {
  //     Swal.fire({
  //       position: 'top-end',
  //       icon: 'warning',
  //       iconColor: '',
  //       titleText: haveAccess ? 'Atenção!' : 'Atenção! Estás a ser penalizado.',
  //       text: haveAccess ? `A Taxa de anulados do escritório está em: ${parseInt(koPercentage)}%`  : `A Taxa de anulados é: ${parseInt(koPercentage)}%`,
  //       showConfirmButton: false,
  //       timer: 4500
  //     })

  //     setShowPenalizationMessage(false)
  //   }
  // }, [showPenalizationMessage])

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
  
  _getOfficeComissions()

  if(deletedID)
    { _removeContractFromRAM() }

  const renderHero = () => {

    return (
      <MDHero>
        <MDContainer>
          <Heading>{currentOfficeObject?.name || ramCurrentOfficeObject?.name}</Heading>
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
            {totalEmployees.map((employee, i) => (
              <Avatar key={i} alt="Avatar Comercial" src={employee?.user?.avatar} />
            ))}
          </AvatarGroup>
        </TeamAvatarsContainer>
      </MDHero>
    );
  };
  
  const renderOfficeMonth = () => {
    const negativeSalary = mySalary < 0

    const valueStyle = 
      isRegularSecretary ? 
        {
          color: CONSTANTS?.colors?.black,
          fontSize: '36px',
          marginTop: '-20%'} 
        : isAdministrator ? 
          {
            color: CONSTANTS?.colors?.black,
            fontSize: '28px',
            marginTop: '-20%'
          } 
          : negativeSalary ? { color: CONSTANTS?.colors?.red } : {}

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
                    ok: monthOkContracts,
                    ko: monthKoContracts,
                    pending: monthRContracts,
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
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>
              {userType === "secretary" ? 'Gerente' : isAdministrator ? 'CEO' : 'Meu mês'}
            </SubHeading>
            { (isRegularManager || isCEO) && 
              <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '5%'}}>
                Até agora você tem:
              </Body>
            }
            <Heading style={valueStyle} className={"mySalary"} id={negativeSalary ? "pulse" : ""}>
              {userType === "secretary" ? 
                `${managerObject?.user?.name}`
                : 
                isAdministrator ? 
                `${ceoObject?.user?.name}`
                : 
                `${mySalary}€`
              }
            </Heading>
          </MDCard.Body>
        </MDCard>

      </MDCard>
    )
  }

  const renderMyMonth = () => {
    const negativeSalary = mySalary < 0

    if(isRegularManager || isRegularSecretary) {
      return;
    }
    else {
      return (
        <MDCard>
          <MDCard.Body className={"monthCardBody"}>
            <SubHeading style={{alignSelf: 'center', marginLeft: '0'}}>Meu mês</SubHeading>
            <Body style={{alignSelf: 'center', marginLeft: '0', marginBottom: '-35%'}}>Até agora você tem:</Body>
            <Heading
              className={"mySalary"} 
              id={negativeSalary ? "pulse" : ""}
              style={negativeSalary ? { color: CONSTANTS?.colors?.red } : {}}
            >{`${mySalary}€`}</Heading>
          </MDCard.Body>
        </MDCard>
      );
    }
  };

  const handleContractListNavigation = () => {
    history.push({
      pathname: '/ContractList',
      state: {
        currentUser: currentUser,
        cameFromBackoffice: true,
        data:  _getMonthContracts,
      }
    })
  }
  const currentMonth = useDate()

  const renderMyContracts = () => {
    const currentMonthDivStyle = {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '-10%',
      marginBottom: '-10%',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    }

    const currentMonthTitleStyle = {
      marginLeft: '0',
      marginRight: '50%'
    }

    const titleStyle = {
      marginBottom: 0,
      marginTop: '10%'
    }

    const counterStyle = {
      textShadow: "1px 1px 3px rgba(200, 200, 200, 0.7)",
      marginLeft: '0',
      marginRight: '0'
    }

    const columnStyle = {
      justifyContent: 'center',
      width: '100%' ,
      marginBottom: '5%'
    }

    const normalRowStyle = {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      marginBottom: '-5%'
    }

    const lastRowStyle = {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between'
    }

    const monthContractsButtonStyle = {
      marginTop: '1%',
      display: 'flex',
      alignSelf: 'center',
      width: '100%'
    }

    const handleOKRow = () => (
      <MDRow style={normalRowStyle}>
        <MDCol>
          <Body>
            {haveAccess ? monthOkContracts?.length : okContracts?.length} {
              `${(haveAccess ? monthOkContracts?.length === 1 : okContracts?.length === 1)? "contrato" : "contratos"}
              ${(haveAccess ? monthOkContracts?.length === 1 : okContracts?.length === 1) ? "válido" : "válidos"}`
            } 
          </Body>
        </MDCol>
        <MDCol style={{marginRight: '5%'}}>
          <Body>
            🟢
          </Body>
        </MDCol>
      </MDRow>
    )

    const handlePendingRow = () => (
      <MDRow style={normalRowStyle}>      
        <MDCol>
          <Body>
            { haveAccess ? monthRContracts?.length : rContracts?.length} {
              `${( haveAccess ? monthRContracts?.length === 1 : rContracts?.length === 1) ? "contrato" : "contratos"} por recuperar`}
          </Body>
        </MDCol>
        <MDCol style={{marginRight: '5%'}}>
          <Body>
            🟡
          </Body>
        </MDCol>
      </MDRow>
    )

    const handleKORow = () => (
      <MDRow style={lastRowStyle}>
        <MDCol>
          <Body>
            { haveAccess ? monthKoContracts?.length : koContracts?.length} { 
              `${( haveAccess ? monthKoContracts?.length === 1 : koContracts?.length === 1) ? "contrato" : "contratos"}
              ${( haveAccess ? monthKoContracts?.length === 1 : koContracts?.length === 1) ? "anulado" : "anulados"}`
            }
          </Body>
        </MDCol>
        <MDCol style={{marginRight: '5%'}}>
          <Body>
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
            🔴
          </Body>
        </MDCol>
      </MDRow>
    )

    const handleCurrentMonthRow = () => (
      <div style={currentMonthDivStyle}>
        <SubHeading style={currentMonthTitleStyle}>
          {currentMonth.toUpperCase()}
        </SubHeading>
        <Heading style={counterStyle}>
          {haveAccess ? _getMonthContracts?.length : contracts?.length}
        </Heading>    
      </div>
    )

    return (
      <MDCard isthemiddlecard="true">
        <MDCard.Body className={"contractsCardBody"}>
          <Link to={{}} onClick={handleContractListNavigation}>
            <SubHeading style={titleStyle}>
              Contratos
            </SubHeading>
          </Link>

          
          { handleCurrentMonthRow() }
          
          <MDCol style={columnStyle}>
            { handleOKRow() }
            { handlePendingRow() }
            { handleKORow() }  
          </MDCol>

          <Button
            fullWidth={false}
            disabled={false}
            action={() => {
              history.push({
                pathname: "/ContractList",
                state: {
                  data: contracts,
                  currentUser: currentUser,
                  cameFromBackoffice: true,
                }
              })
            }}
            small={true}
            style={monthContractsButtonStyle}
            text="Contratos do mês"
          />
          
          { haveAccess &&
            <Button
              fullWidth={false}
              disabled={false}
              action={() => {
                history.push({
                  pathname: "/ContractList",
                  state: {
                    data: allContractsToSend,
                    currentUser: currentUser,
                    cameFromBackoffice: true,
                  }
                })
              }}
              small={true}
              style={{marginTop: '5%', width: '100%'}}
              text="Ver todos os contratos"
            />
          }

        </MDCard.Body>
      </MDCard>
    );
  };

  const resultStatus = () => {
    
    if (okPercentage < 70 && ( haveAccess ? _getMonthContracts?.length !== 0 : contracts?.length !== 0)) {
      return "🔴";
    } else if (okPercentage < 80 && ( haveAccess ? _getMonthContracts?.length !== 0 : contracts?.length !== 0)) {
      return "🟡";
    } else if (okPercentage > 70 && ( haveAccess ? _getMonthContracts?.length !== 0 : contracts?.length !== 0)){
      return "🟢";
    } else {
      return "⚪️"
    }
  }

  const renderMyResults = () => {
    const okPercentageStyle = {
      color: "#37981F",
      marginTop: 30,
      marginBottom: 0
    }
    const okPercentageTitleStyle = {
      marginTop: -15,
      marginBottom: 0,
      fontSize: 12
    }

    const rPercentageStyle = {
      color: "#FEC35A",
      marginTop: 0,
      marginBottom: 0
    }

    const rPercentageTitleStyle = {
      marginTop: -15,
      marginBottom: 0,
      fontSize: 12
    }

    const koPercentageStyle = {
      color: "#FF461E",
      marginTop: 0,
      marginBottom: 0
    }

    const koPercentageTitleStyle = {
      marginTop: -15,
      marginBottom: 0, 
      fontSize: 12
    }

    const resultStatusStyle = {
      display: 'flex',
      alignSelf: 'center',
      alignContent: "flex-start"
    }

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
                all: contracts
              },
              resultsInfo: resultsToPresent,
              currentSalary: mySalary,
              currentFacturing: officeResults,
            }  
          }}>
            <SubHeading style={{marginTop: '0%'}}>Resultados</SubHeading>
          </Link>
          <Heading style={okPercentageStyle}>
            {`${okPercentage}%`}
          </Heading>
          <Body style={okPercentageTitleStyle}>
            Contratos válidos
          </Body>
          <Heading style={rPercentageStyle}>
            {`${rPercentage}%`}
          </Heading>
          <Body style={rPercentageTitleStyle}>
            Contratos por recuperar
          </Body>
          <Heading style={koPercentageStyle}>
            {`${koPercentage}%`}
          </Heading>
          <Body style={koPercentageTitleStyle}>
            Contratos Anulados
          </Body>

          <Body style={resultStatusStyle}>{resultStatus()}</Body>
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
          { haveAccess && renderOfficeMonth()}
          { !haveAccess && renderMyMonth()}
          {renderMyContracts()}
          {renderMyResults()}
        </ResultsContainer>
      </ContentContainer>
    );
  }


};

export default BackOfficeContent;
