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

  const _getGasScale = useCallback(() => {
    dataRequests.getGasScale()
    const gasScalesList = JSON.parse(localStorage.getItem('gasScales'));
    
    return gasScalesList?.map(gasScale => {
      return {
        value: gasScale?.id,
        label: gasScale?.name
      }
    })
  },[])

  const _getPower = useCallback(() => {
    dataRequests.getPower()
    const powersList = JSON.parse(localStorage.getItem('powerList'));
    
    return powersList?.map(power => {
      return {
        value: power?.id,
        label: power?.name
      }
    })
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

  console.log(allEmployees, 'employees from type')

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
          power: _getPower()
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
          power: _getPower()
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
          gasScale: _getGasScale(),
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
          gasScale: _getGasScale(),
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
          gasScale: _getGasScale(),
          power: _getPower(),
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
          gasScale: _getGasScale(),
          power: _getPower(),
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