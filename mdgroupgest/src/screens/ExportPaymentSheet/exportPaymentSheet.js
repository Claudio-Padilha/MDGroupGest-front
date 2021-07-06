import React, { useMemo, useReducer, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit"
import { DateRangePicker, DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { pt } from 'react-date-range/src/locale/index'
import { saveAs } from "file-saver"

import Swal from 'sweetalert2'

import { Heading, SubHeading, Body } from '../../components/Text/text'
import { BackIcon } from '../../components/Icon/icons'

import CONSTANTS from '../../constants'
import {
  CalendarContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  ExportButton,
  MainContainerEType,
  WidthMessageContainer
} from "./styles"

import { MDButton } from '../../screens/Home/md'

import { useRefresh } from '../../hooks/window/refresh'
import employeesRequests from "../../hooks/requests/employeesRequests"
import officesRequests from '../../hooks/requests/officesRequests'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

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

  const [isLoading, setIsLoading] = useState(true)
  // const [date, setDate] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 7),
  //     key: 'selection'
  //   }
  // ])

  var today = new Date()
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)

  const [date, setDate] = useState([
    {
      startDate: today,
      endDate: lastDayOfMonth,
      key: 'selection'
    }
  ])

  if (isLoading) {
    setTimeout(() => {
      setIsLoading(false)
    }, [500])
  }

  async function createNewExcelFile() {

    await officesRequests.paymentSheetByPeriod(dateToSend)

    const sheet = JSON.parse(localStorage.getItem('payrollSheet'))

    var Excel = require('exceljs')
    // A new Excel Work Book
    var workbook = new Excel.Workbook()

    // Some information about the Excel Work Book.
    workbook.creator = 'PAD Tech'
    workbook.lastModifiedBy = ''
    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.lastPrinted = new Date()

    for (let i = 0; i < sheet?.length; i++) {
      // Create a sheet
      var eachSheet = workbook.addWorksheet(`${sheet[i]?.funcionario} - ${period}`)
      // A table header
      eachSheet.columns = [
          { header: 'NOME DO COMERCIAL', key: 'employee_name', width: 22 },
          { header: 'TIPO DE VENDA', key: 'contract_type', width: 14 },
          { header: 'DATA DE ASSINATURA', key: 'signature_date', width: 18 },
          { header: 'NOME DO TITULAR', key: 'client_name', width: 18 },
          { header: 'PPI LUZ', key: 'electricity_ppi', width: 8, style: { alignment: 'center'}},
          { header: 'PEL', key: 'pel', width: 8 },
          { header: 'PPI GÁS', key: 'gas_ppi', width: 8 },
          { header: 'MGI', key: 'mgi', width: 8 },
          { header: 'LUZ - CPE', key: 'cpe', width: 8 },
          { header: 'POTÊNCIA', key: 'power', width: 8 },
          { header: 'GÁS - CUI', key: 'cui', width: 8 },
          { header: 'ESCALÃO GÁS', key: 'gas_scale', width: 8 },
          { header: 'ESTADO EM VENDA', key: 'sell_state', width: 8 },
          { header: 'OBS BO', key: 'observations', width: 18 },
          { header: 'VALOR', key: 'employee_comission', width: 8 },
          { header: 'TOTAL', key: 'total', width: 10 },
      ]

      eachSheet.addRow({
          employee_name: `${sheet[i]?.funcionario}`,
          contract_type: '',
          signature_date: '',
          client_name: '',
          electricity_ppi: '',
          pel: '',
          gas_ppi: '',
          mgi: '',
          cpe: '',
          power: '',
          cui: '',
          gas_scale: '',
          sell_state: '',
          observations: '',
          employee_comission: '',
        
      })

      for (let j = 0; j < sheet[i]?.itens?.length; j++) {
        const hasPower = (
          sheet[i]?.itens[j]?.contract_type === 'electricity' ||
          sheet[i]?.itens[j]?.contract_type === 'condominium_electricity' ||
          sheet[i]?.itens[j]?.contract_type === 'dual' ||
          sheet[i]?.itens[j]?.contract_type === 'condominium_dual' 
        )

        eachSheet.addRow(
          {
            contract_type: `${
              sheet[i]?.itens[j]?.contract_type === 'condominium_dual' ? 
                'Dual Condomínio' : sheet[i]?.itens[j]?.contract_type === 'condominium_electricity' ?
                'Electricidade Condomínio'
                : sheet[i]?.itens[j]?.contract_type === 'condominium_gas' ? 
                'Gás Condomínio' 
                : sheet[i]?.itens[j]?.contract_type === 'dual' ? 
                'Dual' 
                : sheet[i]?.itens[j]?.contract_type === 'gas' ? 
                'Gás' 
                : 'Eletricidade'
                
            }`,
            signature_date: sheet[i]?.itens[j]?.signature_date,
            client_name: sheet[i]?.itens[j]?.client_name,
            electricity_ppi: `${sheet[i]?.itens[j]?.electricity_ppi ? 'S' : 'N'}`,
            pel: `${sheet[i]?.itens[j]?.pel ? 'S' : 'N'}`,
            gas_ppi: `${sheet[i]?.itens[j]?.gas_ppi ? 'S' : 'N'}`,
            mgi: `${sheet[i]?.itens[j]?.mgi ? 'S' : 'N'}`,
            cpe: sheet[i]?.itens[j]?.cpe,
            power: 
              hasPower ? `${
                sheet[i]?.itens[j]?.dynamic_power !== null ? 
                `${sheet[i]?.itens[j]?.dynamic_power} kVA` : 
                `${sheet[i]?.itens[j]?.power__name} kVA`}` : 
                '',
            cui: sheet[i]?.itens[j]?.cui,
            gas_scale: sheet[i]?.itens[j]?.gas_scale__name,
            sell_state: sheet[i]?.itens[j]?.sell_state__name.toUpperCase(),
            observations: sheet[i]?.itens[j]?.observations,
            employee_comission: sheet[i]?.itens[j]?.employee_comission === null ? 'anulado' : `${sheet[i]?.itens[j]?.employee_comission}€`,
          }
        )
      }

      eachSheet.addRow({ total: `${sheet[i]?.total ? `${sheet[i]?.total}€` : '0€'}` })
    }

    let cellAddress

    workbook.eachSheet(function (sheet) {
      sheet.eachRow(function(row) {
        row.eachCell(function(cell) {
          if (cell?._column?._key === 'total') {
            cellAddress = cell?._address
          }
        })
      })

      sheet.getCell(cellAddress).border = {
        top: {style:'thick', color: {argb:'00000000'}},
        left: {style:'thick', color: {argb:'00000000'}},
        bottom: {style:'thick', color: {argb:'00000000'}},
        right: {style:'thick', color: {argb:'00000000'}}
      };

      sheet.getCell(cellAddress).font = { bold: true }
    })



    // console.log(test1, 'TESTE 1')

    // console.log(eachSheet, 'TESTE');
    // console.log(workbook, 'WORK BOOK');
    // Add rows in the above header

    const buffer = await workbook.xlsx.writeBuffer()
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const fileExtension = '.xlsx'

    const blob = new Blob([buffer], {type: fileType})

    saveAs(blob, period + fileExtension)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'O seu ficheiro foi gerado com sucesso!',
      showConfirmButton: false,
      timer: 2000
    })
  }

  async function createNewExcelFileAllContracts() {

    await officesRequests.paymentSheetByPeriod(dateToSend)

    const allContractsSheet = JSON.parse(localStorage.getItem('payrollSheet'))

    var Excel = require('exceljs')
    // A new Excel Work Book
    var workbook = new Excel.Workbook()

    // Some information about the Excel Work Book.
    workbook.creator = 'PAD Tech'
    workbook.lastModifiedBy = ''
    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.lastPrinted = new Date()

    // Create a sheet
    var defaultSheet = workbook.addWorksheet(`${period}`)

    let auxTotal = 0

    for (let i = 0; i < allContractsSheet?.length; i++) {
      
      // A table header
      defaultSheet.columns = [
          { header: 'NOME DO COMERCIAL', key: 'employee_name', width: 22 },
          { header: 'TIPO DE VENDA', key: 'contract_type', width: 14 },
          { header: 'DATA DE ASSINATURA', key: 'signature_date', width: 18 },
          { header: 'NOME DO TITULAR', key: 'client_name', width: 18 },
          { header: 'PPI LUZ', key: 'electricity_ppi', width: 8, style: { alignment: 'center'}},
          { header: 'PEL', key: 'pel', width: 8 },
          { header: 'PPI GÁS', key: 'gas_ppi', width: 8 },
          { header: 'MGI', key: 'mgi', width: 8 },
          { header: 'LUZ - CPE', key: 'cpe', width: 8 },
          { header: 'POTÊNCIA', key: 'power', width: 8 },
          { header: 'GÁS - CUI', key: 'cui', width: 8 },
          { header: 'ESCALÃO GÁS', key: 'gas_scale', width: 8 },
          { header: 'ESTADO EM VENDA', key: 'sell_state', width: 8 },
          { header: 'OBS BO', key: 'observations', width: 18 },
          { header: 'VALOR', key: 'employee_comission', width: 8 },
          { header: 'TOTAL', key: 'total', width: 10 },
      ]

      defaultSheet.addRow({
          employee_name: `${allContractsSheet[i]?.funcionario}`,
          contract_type: '',
          signature_date: '',
          client_name: '',
          electricity_ppi: '',
          pel: '',
          gas_ppi: '',
          mgi: '',
          cpe: '',
          power: '',
          cui: '',
          gas_scale: '',
          sell_state: '',
          observations: '',
          employee_comission: '',
        
      })

      for (let j = 0; j < allContractsSheet[i]?.itens?.length; j++) {
        const hasPower = (
          allContractsSheet[i]?.itens[j]?.contract_type === 'electricity' ||
          allContractsSheet[i]?.itens[j]?.contract_type === 'condominium_electricity' ||
          allContractsSheet[i]?.itens[j]?.contract_type === 'dual' ||
          allContractsSheet[i]?.itens[j]?.contract_type === 'condominium_dual' 
        )

        auxTotal += allContractsSheet[i]?.itens[j]?.employee_comission

        defaultSheet.addRow(
          {
            contract_type: `${
              allContractsSheet[i]?.itens[j]?.contract_type === 'condominium_dual' ? 
                'Dual Condomínio' : allContractsSheet[i]?.itens[j]?.contract_type === 'condominium_electricity' ?
                'Electricidade Condomínio'
                : allContractsSheet[i]?.itens[j]?.contract_type === 'condominium_gas' ? 
                'Gás Condomínio' 
                : allContractsSheet[i]?.itens[j]?.contract_type === 'dual' ? 
                'Dual' 
                : allContractsSheet[i]?.itens[j]?.contract_type === 'gas' ? 
                'Gás' 
                : 'Eletricidade'
                
            }`,
 

            signature_date: allContractsSheet[i]?.itens[j]?.signature_date,
            client_name: allContractsSheet[i]?.itens[j]?.client_name,
            electricity_ppi: `${allContractsSheet[i]?.itens[j]?.electricity_ppi ? 'S' : 'N'}`,
            pel: `${allContractsSheet[i]?.itens[j]?.pel ? 'S' : 'N'}`,
            gas_ppi: `${allContractsSheet[i]?.itens[j]?.gas_ppi ? 'S' : 'N'}`,
            mgi: `${allContractsSheet[i]?.itens[j]?.mgi ? 'S' : 'N'}`,
            cpe: allContractsSheet[i]?.itens[j]?.cpe,
            power: 
              hasPower ? `${
                allContractsSheet[i]?.itens[j]?.dynamic_power !== null ? 
                `${allContractsSheet[i]?.itens[j]?.dynamic_power} kVA` : 
                `${allContractsSheet[i]?.itens[j]?.power__name} kVA`}` : 
                '',
            cui: allContractsSheet[i]?.itens[j]?.cui,
            gas_scale: allContractsSheet[i]?.itens[j]?.gas_scale__name,
            sell_state: allContractsSheet[i]?.itens[j]?.sell_state__name.toUpperCase(),
            observations: allContractsSheet[i]?.itens[j]?.observations,
            employee_comission: allContractsSheet[i]?.itens[j]?.employee_comission === null ? 'anulado' : `${allContractsSheet[i]?.itens[j]?.employee_comission}€`,
          }
        )
      }

    }
    defaultSheet.addRow({ total: `${auxTotal ? `-> ${auxTotal}€` : '0€'}` })

    const buffer = await workbook.xlsx.writeBuffer()
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    const fileExtension = '.xlsx'

    const blob = new Blob([buffer], {type: fileType})

    saveAs(blob, `${period} | Total` + fileExtension)

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'O seu ficheiro foi gerado com sucesso!',
      showConfirmButton: false,
      timer: 2000
    })
  }


  const dateToAPI = (date) => {

    var year = date.getFullYear()
    var month = date.getMonth()+1
    var dt = date.getDate()
    
    if (dt < 10) {
      dt = '0' + dt
    }
    if (month < 10) {
      month = '0' + month
    }

    return year+'-' + month + '-'+dt
  }

  const startPeriod = dateToAPI(date[0]?.startDate)
  const endPeriod = dateToAPI(date[0]?.endDate)
  const period = `${startPeriod} - ${endPeriod}`

  const isFromBackOffice = props?.location?.state?.isFromBackOffice

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const currentOfficeID = currentUser?.user?.office

  const dateToSend = {
    office_id: currentOfficeID,
    inicio_periodo: startPeriod,
    fim_periodo: endPeriod
  }

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
        reducerState = stateOnRAM
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
        <ExportButton onClick={createNewExcelFile}>
          <Body>
            <MDButton style={{width: '20vw', height: '5vh', fontSize: '20px'}}>Exportar individual</MDButton>
          </Body>
        </ExportButton>

        <ExportButton onClick={createNewExcelFileAllContracts}>
          <Body>
            <MDButton style={{width: '20vw', height: '5vh', fontSize: '20px'}}>Exportar tudo</MDButton>
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
  )
}

export default ExportPaymentSheet