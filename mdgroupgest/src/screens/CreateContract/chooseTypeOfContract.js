import React from "react";
import { Link } from "react-router-dom";

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

import request from '../../components/Form/request';

const ChooseTypeOfContract = (props) => {
  function _goBack() {
    window.location.assign("/BackOffice");    
  }

  function _feedbackCall() {
    request.getFeedbackCall()
    const feedbackCallList = JSON.parse(localStorage.getItem('feedbackCalls'));

    return feedbackCallList?.map(feedbackCall => {
      return {
        value: feedbackCall?.value,
        label: feedbackCall?.value
      }
    })
  }

  function _sellState() {
    request.getSellState()
    const sellStatesList = JSON.parse(localStorage.getItem('sellStates'));
    
    return sellStatesList?.map(sellState => {
      return {
        value: sellState?.value,
        label: sellState?.value
      }
    })
  }

  function _payment() {
    request.getPayment()
    const paymentsList = JSON.parse(localStorage.getItem('payments'));
    
    return paymentsList?.map(payment => {
      return {
        value: payment?.value,
        label: payment?.value
      }
    })
  }

  function _gasScale() {
    request.getGasScale()
    const gasScalesList = JSON.parse(localStorage.getItem('gasScales'));
    
    return gasScalesList?.map(gasScale => {
      return {
        value: gasScale?.value,
        label: gasScale?.value
      }
    })
  }

  const renderElectricityCard = () => {

    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          type: "electricity",
          cameFromChoice: true,
          feedbackCall: _feedbackCall(),
          sellState: _sellState(),
          payment: _payment(),
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

  const renderGasCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          type: "gas",
          cameFromChoice: true,
          feedbackCall: _feedbackCall(),
          sellState: _sellState(),
          gasScale: _gasScale(),
          payment: _payment()
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

  const renderDualCard = () => {
    return (
      <Link to={{
        pathname:"/CreateContract",
        state: {
          type: "dual",
          cameFromChoice: true,
          feedbackCall: _feedbackCall(),
          sellState: _sellState(),
          payment: _payment(),
          gasScale: _gasScale()
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
          <GoHomeButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </GoHomeButton>
        </SecondRow>
      
      </CardsContainer>

    </MainContainerEType>
  );
};

export default ChooseTypeOfContract;