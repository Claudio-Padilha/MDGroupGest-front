import React, { useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  CardsContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  MainContainerEType
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import dataRequests from "../../hooks/requests/dataRequests";

const ChooseTypeOfContract = (props) => {
  const history = useHistory()

  function _goBack() {
    history.push({
      pathname: "/BackOffice",
      state: {
        cameFromContractCreation: true
      }
    })  
  }
  dataRequests.getGasScale()
  dataRequests.getPower()

  const _getFeedbackCall = useCallback(() => {
    dataRequests.getFeedbackCall()
    const feedbackCallList = JSON.parse(localStorage.getItem('feedbackCalls'))

    return feedbackCallList?.map(feedbackCall => {
      return {
        value: feedbackCall?.id,
        label: feedbackCall?.name
      }
    })
  }, [])

  const _getSellState = useCallback(() => {
    dataRequests.getSellState()
    const sellStatesList = JSON.parse(localStorage.getItem('sellStates'));
    
    return sellStatesList?.map(sellState => {
      return {
        value: sellState?.id,
        label: sellState?.name
      }
    })
  },[])

  const _getPayment = useCallback(() => {
    dataRequests.getPayment()
    const paymentsList = JSON.parse(localStorage.getItem('payments'));
    
    return paymentsList?.map(payment => {
      return {
        value: payment?.id,
        label: payment?.name
      }
    })
  },[])

  const _getGasScale = useCallback((isCondominium) => {
    
    const gasScalesList = JSON.parse(localStorage.getItem('gasScales'));
    
    var filteredGasScale = []

    for(let i=0; i < gasScalesList?.length; i++) {
      if(gasScalesList[i]?.is_condominium === isCondominium) {
        filteredGasScale.push( {
          value: gasScalesList[i]?.id,
          label: gasScalesList[i]?.name
        })
      }
    }
    
    // gasScalesList.forEach(gasScale => {

    // })

    console.log(filteredGasScale, "FILTERED GAS SCALE")

    return filteredGasScale
  },[])

  const _getPower = useCallback((isCondominium) => {
    const powersList = JSON.parse(localStorage.getItem('powerList'));

    var filteredPowerList = []

    for(let i=0; i < powersList?.length; i++) {
      if(powersList[i]?.is_condominium === isCondominium) {
        filteredPowerList.push( {
          value: powersList[i]?.id,
          label: powersList[i]?.name
        })
      }
    }
    
    // powersList.forEach(power => {
    //   if(power?.is_condominium === isCondominium) {
    //     filteredPowerList.push( {
    //       value: power?.id,
    //       label: power?.name,
    //     })
    //   }
    // })

    return filteredPowerList
  },[])
  
  const allEmployees = []

  const managers = JSON.parse(localStorage?.getItem('manager'));
  const teamLeaders = JSON.parse(localStorage?.getItem('teamLeader'));
  const instructors = JSON.parse(localStorage?.getItem('instructor'));
  const salesPersons = JSON.parse(localStorage?.getItem('salesPerson'));

  function _getAllEmployees() {
    if(managers?.length !== 0 && managers) {
      allEmployees.push(...managers);
    }

    if(teamLeaders?.length !== 0 && teamLeaders) {
      allEmployees.push(...teamLeaders);
    }

    if(instructors?.length !== 0 && instructors) {
      allEmployees.push(...instructors);
    }

    if(salesPersons?.length !== 0 && salesPersons) {
      allEmployees.push(...salesPersons);
    }

    return allEmployees
  }

  _getAllEmployees()

  const renderElectricityCard = () => {

    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Electricidade",
          typeOfContract: "electricity",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          payment: _getPayment(),
          power: _getPower(false)
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Electricidade</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderCondominiumElectricityCard = () => {

    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Electricidade Condomínio",
          typeOfContract: "condominium_electricity",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          payment: _getPayment(),
          power: _getPower(true)
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{marginLeft: '-3%'}}>Electricidade</SubHeading>
            <SubHeading>Condomínio</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderGasCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Gás",
          typeOfContract: "gas",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          gasScale: _getGasScale(false),
          payment: _getPayment()
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Gás</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderCondominiumGasCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Gás Condomínio",
          typeOfContract: "condominium_gas",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          gasScale: _getGasScale(true),
          payment: _getPayment()
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{marginLeft: '35%'}}>Gás</SubHeading>
            <SubHeading>Condomínio</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderDualCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Dual",
          typeOfContract: "dual",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          payment: _getPayment(),
          gasScale: _getGasScale(false),
          power: _getPower(false),
          employees: allEmployees,
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading>Dual</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  const renderCondominiumDualCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          title: "Contrato Dual Condomínio",
          typeOfContract: "condominium_dual",
          cameFromChoice: true,
          feedbackCall: _getFeedbackCall(),
          sellState: _getSellState(),
          payment: _getPayment(),
          gasScale: _getGasScale(true),
          power: _getPower(true),
          employees: allEmployees
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
            <SubHeading style={{marginLeft: '35%'}}>Dual</SubHeading>
            <SubHeading>Condomínio</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainerEType>
      <BackIcon onClick={_goBack} />
      <CardsContainer>

        <FirstRow>
          {renderElectricityCard()}
          {renderGasCard()}
          {renderDualCard()}
        </FirstRow>
        
        <SecondRow>
          {renderCondominiumElectricityCard()}
          {renderCondominiumGasCard()}
          {renderCondominiumDualCard()}
        </SecondRow>
      
      </CardsContainer>

    </MainContainerEType>
  );
};

export default ChooseTypeOfContract;