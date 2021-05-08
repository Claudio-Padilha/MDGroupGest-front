import React, { useMemo, useReducer, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";
import { DateRangePicker, DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { pt } from 'react-date-range/src/locale/index'

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  CalendarContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  ExportButton,
  MainContainerEType,
  WidthMessageContainer
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import { useRefresh } from '../../hooks/window/refresh';
import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from '../../hooks/requests/officesRequests';

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const ExportPaymentSheet = (props) => {
  const history = useHistory()
  
  function _goBack() {
    localStorage.removeItem('exportPaymentSheetState')
    history.push({
      pathname: '/BackOffice',
      state: {
        fromEmployeeType: true
      }
    })
  }

  const { wasRefreshed } = useRefresh()

  const [isLoading, setIsLoading] = useState(true);
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ]);

  var today = new Date();
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);

  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: lastDayOfMonth,
      key: 'selection'
    }
  ]);

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500]);
  }

  const dateToAPI = (date) => {

    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();
    
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return year+'-' + month + '-'+dt
  }

  const startPeriod = dateToAPI(date[0]?.startDate)
  const endPeriod = dateToAPI(date[0]?.endDate)
  
  const dateToSend = {
    inicio_periodo: startPeriod,
    fim_periodo: endPeriod
  }

  console.log(dateToSend, 'DATA PARA API')

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const currentOfficeID = currentUser?.user?.office;

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  function _allEmployees() {
    if(isFromBackOffice) {
      return employeesRequests.getAllEmployees(currentOfficeID)
    }
  }
  _allEmployees()

  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [isFromBackOffice])

  let initialState = {
    currentOffice: currentOfficeObject
  }

  if(!wasRefreshed) {
    localStorage.setItem('exportPaymentSheetState', JSON.stringify(initialState))
  }

  const reducer = (firstState, action) => {
    let reducerState = {}
    const stateOnRAM = JSON.parse(localStorage.getItem('exportPaymentSheetState'))

    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM;
    }

    localStorage.removeItem('exportPaymentSheetState')
    localStorage.setItem('exportPaymentSheetState', JSON.stringify(reducerState))

    return reducerState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(wasRefreshed) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  }, [wasRefreshed])

  const renderCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "secretary", 
        title: "Secretário(a)",
        data: state?.regularSecretary,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false,
        isFromEmployeeTypeSelection: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Teste</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const handleScreen = () => (
    <CalendarContainer>

      <FirstRow>
        {/* <DateRangePicker
          onChange={item => setDate([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={date}
          direction="horizontal"
          showPreview={true}
          rangeColors={'#000000'}
          color={'#000000'}
          dateDisplayFormat={'dd MMMM, yyyy'}
          locale={pt}
          endDatePlaceholder={'fim período'}
        /> */}

        <DateRange
          editableDateInputs={true}
          onChange={item => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          showPreview={true}
          rangeColors={'#000000'}
          color={'#000000'}
          dateDisplayFormat={'dd MMMM, yyyy'}
          locale={pt}
          endDatePlaceholder={'fim período'}
          months={2}
          direction="horizontal"
        />
      </FirstRow>

      <SecondRow>
        <ExportButton onClick={() => console.log('exportaaaaar')}>
          <Body>
            <MDButton style={{width: '22vw', height: '5vh', fontSize: '20px'}}>Exportar</MDButton>
          </Body>
        </ExportButton>
      </SecondRow>

      <SecondRow>
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', fontSize: '18px'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CalendarContainer>
  )

  
  const contentOfThisPage = () => (
    <>
      <Heading style={{
        position: 'absolute',
        top: '0%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.darkGrey
      }}>
        Olá, {currentUser?.user?.name}!
      </Heading>

      <SubHeading style={{
        position: 'absolute',
        top: '10%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.mediumGrey
      }}>
        Selecione o período para o fecho da folha de pagamento.
      </SubHeading>
    
      { handleScreen() }
    </>
  )  
  
  const loadingContainer = () => (
    <SwishSpinner size={200} color="#686769" loading={isLoading} />
  )
 
  return(
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainerEType>
        <BackIcon onClick={_goBack} />
        { isLoading ? loadingContainer() : contentOfThisPage() }
      </MainContainerEType>
    </>
  );
};

export default ExportPaymentSheet;