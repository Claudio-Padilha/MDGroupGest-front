import React, { useReducer, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { jsPDF } from "jspdf";

import { Heading, SubHeading, Body, SmallBody, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon, EditIcon } from '../../components/Icon/icons';

import ContractDocumentPDF from './employmentContract';

import employeesRequests from "../../hooks/requests/employeesRequests";
import { useRefresh } from '../../hooks/window/refresh';

import {
  MainContainer,
  Row,
  Column,
  LogoContainer,
  EmptyContainer,
  WidthMessageContainer
} from "./styles";

import { List } from "semantic-ui-react";
import { useTheme } from "@material-ui/core";
import dataRequests from "../../hooks/requests/dataRequests";

const EmployeeList = (props) => {
  const history = useHistory();

  const employees = props?.location?.state?.data;
  const userType = props?.location?.state?.userType;
  const shouldRenderEmployeeAssociation = props?.location?.state?.shouldRenderEmployeeAssociation;
  const title = props?.location?.state?.title;
  const officeID = props?.location?.state?.officeID;
  const employeeToAssociate = props?.location?.state?.employeeToAssociate;
  const isFromEdit = props?.location?.state?.isFromEdit;
  const employeesListStateFromEdit = props?.location?.state?.employeeListState;
  const employeesReturningFromEdit = props?.location?.state?.employeesReturningFromEdit;
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  const dataToGoBack = props?.location?.state?.dataGoingToList;
  const isFromEmployeeTypeSelection = props?.location?.state?.isFromEmployeeTypeSelection;

  const { wasRefreshed } = useRefresh()

  const initialState = {
    employees: employees,
    userType: userType,
    shouldRenderEmployeeAssociation: shouldRenderEmployeeAssociation,
    title: title,
    officeID: officeID,
    employeeToAssociate: employeeToAssociate,
    isFromEdit: isFromEdit,
  }

  useEffect(() => {
    if(!wasRefreshed) {
      if(isFromEdit) {
        localStorage.setItem('employeeListScreenState', JSON.stringify(employeesListStateFromEdit))
      } else {
        localStorage.setItem('employeeListScreenState', JSON.stringify(initialState))
      } 
    }
  }, [wasRefreshed, isFromEdit])

  const reducer = (firstState, action) => {
    let reducerState = {}
    const stateOnRAM = JSON.parse(localStorage.getItem('employeeListScreenState'))
    
    switch (action) {
      case 'MAINTAIN_SCREEN_STATE':
        reducerState = stateOnRAM;
    }
    
    localStorage.removeItem('employeeListScreenState')
    localStorage.setItem('employeeListScreenState', JSON.stringify(reducerState))

    return reducerState
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if(isFromEmployeeTypeSelection) {
      window.location.reload()
    }
  }, [isFromEmployeeTypeSelection])

  useEffect(() => {
    if(wasRefreshed || isFromEdit) {
      return dispatch('MAINTAIN_SCREEN_STATE')
    } else {
      return state
    }
  }, [wasRefreshed])

  function _goBack() {
    localStorage.removeItem('employeeListScreenState')
    history.push({
      pathname: "/ChooseEmployeeTypeToSee",
      state: {
        cameFromList: true,
        dataToGoBack
      }
    })
  }

  async function _redirectToEmployeeTypes() {
    await employeesRequests.getAllEmployees(currentOfficeID)
    history.push({
      pathname: "ChooseEmployeeTypeToSee",
    })
  }

  const textForPromotion = useCallback((position) => {
      if (state['userType'] === 'teamLeader') {
        return 'Promover a Gerente'
      } else if(state['userType'] === 'instructor' && position) {
        return 'Promover a Team Leader'
      } else if (state['userType'] === 'salesPerson') {
        return 'Promover a Instrutor'
      } else {
        return
      }
  }, [state])

  const renderEmployee = (employee, i) => {

    const userType = employee?.user?.user_type;
    const userTypeCapitalized = userType.charAt(0).toUpperCase() + userType.slice(1);

    console.log(employee, 'EMPLOYEEE')
    console.log(userType, 'USER TYPE')
    
    const isManagerAssistant = employee?.is_manager_assistant
    const isTeamLeader = employee?.is_team_leader;
    const isInstructor = employee?.is_instructor;

    const renderPromotion = (userType === 'sales_person' || isInstructor || isTeamLeader)

    function _userTypeInPortuguese() {
      switch (userTypeCapitalized) {
        case "Ceo":
          return "CEO";
        case "Admin":
          return "Administrador(a)"
        case "Manager":
          return "Empresário";
        case "Manager_assistant":
          return "Gerente";
        case "Secretary":
          return "Secretária";
        case "Team_leader":
          return "Team Leader";
        case "Instructor":
          return "Instrutor";
        case "Sales_person":
          return "Comercial";      
        default:
          return;
      }
    }
    console.log(state, 'ESTADO')
    function _handleEditEmployee() {
      history.push({
        pathname: "/EmployeeEdit",
        state: {
          employeeData: employee,
          officeID: officeID,
          shouldRenderEmployeeAssociation: state?.shouldRenderEmployeeAssociation,
          title: state?.title,
          userType: userType,
          employeeToAssociate: state?.employeeToAssociate,
          employeesComingFromList: state?.isFromEdit ? state?.employeesReturningFromEdit : state?.employees,
          employeeListState: state
        }
      })
    }

    function _confirmToPromoteEmployee() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      return (
        swalWithBootstrapButtons.fire({
          title: 'Tem certeza?',
          text: `Vai promover o ${employee?.user?.name}.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não, cancelar',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            await employeesRequests.promoteEmployee(employee?.id)        
            .then(async() => {
              await dataRequests.getMyTeam(currentOfficeID)
              swalWithBootstrapButtons.fire(
                'Funcionário Promovido!',
                'A operação foi concluída com sucesso.',
                'success'
              )  
              }).then(_redirectToEmployeeTypes)      
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Ação cancelada!',
              'O funcionário não foi promovido.',
              'error'
            )
          }
        })
      )
    }

    function _confirmToDeleteEmployee() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      return (
        swalWithBootstrapButtons.fire({
          title: 'Tem certeza?',
          text: "Não poderá voltar atrás.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não, cancelar',
          reverseButtons: true
        }).then(async (result) => {
          if (result.isConfirmed) {
            await employeesRequests.deleteEmployee(employee)         
            .then(() => (
              swalWithBootstrapButtons.fire(
                'Funcionário Excluído!',
                'A operação foi concluída com sucesso.',
                'success'
              )  
            )).then(_redirectToEmployeeTypes)      
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              'Ação cancelada!',
              'Seu funcionário não foi excluído.',
              'error'
            )
          }
        })
      )
    }

    function _handlePDFButton(name, nif, address) {

      const today = new Date()

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       });
      doc.setFontSize(11)
      doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS",65,30);
      doc.text(["FENIXTHOUSAND SOLUTIONS LDA., sociedade com sede na Rua Ricardo Reis, nº 2, 6º esq, 2675-237 Odive-", 
                "las com o NIPC 514216131, matriculada na Conservatória do Registo Comercial de Lisboa,  sob o mesmo núme-",
                "ro, neste ato representada na forma de seus atos constitutivos, adiante designada 'Fenixthousand Solutions, Lda.",
                "ou 'CONTRATANTE'; e",
                "\n",
                name + " Pereira Martins Silva, portador(a) do Cartão de Cidadão com o número de identificação 000000000",
                "emitido por República Portuguesa e válido até (VALIDADE), número de identificação fiscal " + nif+ ", com",
                "residência habitual na " + address + ", adiante designado como 'CONTRATADO';",
                "\n",
                "Sendo CONTRATANTE e CONTRATADO, em conjunto, doravante denominados simplesmente 'Partes';",
                "\n",
                "                                                       CONSIDERANDO que:",
                "(i) a CONTRATANTE tem por objeto social o exercício da atividade de venda de mercadorias; angariação de no-",
                "vos clientes e serviços; e prestação de serviços de divulgação comercial;",
                "\n",
                "(ii) A CONTRATANTE tem interesse em contratar os serviços do CONTRATADO e que este aceita prestar, em re-",
                "gime de exclusividade, os seus serviços profissionais no sentido de colaborar para o desenvolvimento da ativida-",
                "de da Fenixthousand Solutions, Lda.",
                "\n",
                "Resolvem as PARTES, de comum acordo, celebrar o presente Contrato de Prestação de Serviços ('Contrato'),   o",
                "qual se regerá de acordo com os seguintes termos e condições:",
                "\n",
                "                                                       CLÁUSULA PRIMEIRA - OBJETO",
                "1.1     O presente Contrato tem por objeto a prestação de serviços pelo CONTRATADO à CONTRATANTE, em",
                "regime de exclusividade,nomeadamente, (i) o desenvolvimento de tarefas necessárias à preparação e ao cum-",
                "primento dos contratos de venda de mercadorias e de angariação de novos clientes e serviços; e (ii) a presta-",
                "ção de serviços de divulgação comercial; tudo de forma autônoma e independente, não sujeita à autoridade ou",
                "direção da Fenixthousand Solutions, Lda ('Serviços');",
                "1.2     A CONTRATANTE e o CONTRATADO acordam que, pelo facto de serem entidades juridicamente autó-",
                "nomas e não existir qualque relação de trabalho que não seja a de prestação de serviços, o CONTRATADO é o",
                "único e exclusivo responsável pelos pagamentos e contribuições relativas a impostos, segurança social, seguros",
                "de acidentes de trabalho ou outras importâncias devidas e inerentes a sua atividade de profissional liberal (ou",
                "empresário em nome individual), salvo disposições legais em contrário.",
                "\n",
                "                                                        CLÁUSULA SEGUNDA - LOCAL",
                "O CONTRATADO desenvolverá seus serviços em território português, sendo da essência deste Contrato a ne-",
                "cessidade de deslocamento em viagens para o desenvolvimento pleno dos Serviços. Tais viagens correrão, ",
                "exclusivamente, às expensas do CONTRATADO.",
                "\n",
                "                                                 CLÁUSULA TERCEIRA - REMUNERAÇÂO PELOS SERVIÇOS",
                "3.1       Em contrapartida aos serviços prestados, a A Fenixthousand Solutions, Lda deverá ao CONTRATADO",
                "valor apurado com base em Comissão prevista no respectivo Plano de Comissões do Projeto, com as atualiza-",
                "ções que vigorarem na data da realização dos serviços, sendo certo que ambas as partes admitem ter pleno co-",
                "nhecimento do Plano de Comissões vigente e acesso às respectivas atualizações.",
                "3.2     O valor devido pela prestação dos Serviços acima será pago ao CONTRATADO em até 5 (cinco) dias a",
                "contar da data em que ocorrer a boa cobrança pela CONTRATANTE dos serviços prestados pelo CONTRATADO,",
                "o que costuma ocorrer até o dia 12 de cada mês.",
                "3.3      As despesas incorridas pelo CONTRATADO na execução dos serviços, tais como passagens, estadia", 
                "e alimentação em viagens, são de exclusiva responsabilidade do CONTRATADO e, via de regra, não serão an-",
                "tecipadas ou reembolsadas pela CONTRATANTE.",
               ], 10, 55)
      doc.addPage()
      doc.text([
        "                                                   CLÁUSULA QUARTA - PRAZO E RESOLUÇÃO"
      ], 10, 20)
     
      // doc.line(10, 229, 80, 229)
      // doc.line(120, 229, 190, 229)
      // doc.text("Contratante", 20, 239)
      // doc.text("Contratado", 130, 239)
      // doc.text("Lisboa, " + String(today.getDate()) + "/" + String((today.getMonth() + 1) > 9 ? today.getMonth() + 1 : "0") + String(today.getMonth() + 1) + "/" + String(today.getFullYear()), 140, 279)
     
      doc.save(name + ".pdf");
    };

    const roleToPromotion = isInstructor ? 'teamLeader': 'instructor'
    console.log(renderPromotion, 'DEVE RENDERIZAR PROMOTION')
    return (
      <>
        <Row  key={employee?.id} className={"titleRow"}>
          { employee?.user?.user_type === "manager" && employee?.user?.user_type !== "secretary" &&
            <SubHeading style={{marginRight: '-8%'}}>Área do</SubHeading>
          }
          { employee?.user?.user_type !== "manager" && employee?.user?.user_type === "secretary" &&
            <SubHeading style={{marginRight: '-8%'}}>Área da</SubHeading>
          }
          <Button
            disabled={true}
            small={true}
            text={_userTypeInPortuguese()}
            className={"userTypeTag"}
          />
          <EditIcon color={"black"} onClick={_handleEditEmployee} style={{display: "flex", width: "20%", height: "50%"}}/>
        </Row>
        <List.Item className={"eachEmployee"}>
          <Column className={"employeeInfo"}>
            <List.Content>
              <Body><b>Nome:</b></Body>
              <Body>  
                {employee?.user?.name}
              </Body>
            </List.Content>
            <List.Content>
              <Body><b>NIF:</b></Body>
              <Body>{employee?.user?.nif}</Body>
            </List.Content>
          </Column>

          <Column className={"employeeInfo"}>
            <List.Content>
              <Body><b>Morada:</b></Body>
              <Body>  
                {employee?.user?.address}
              </Body>
            </List.Content>
            <List.Content>
              <Body><b>E-mail:</b></Body>
              <Body>{employee?.user?.email}</Body>
            </List.Content>
          </Column>

          <Column className={"employeeInfo"}>
            <List.Content>
              <Body><b>Contacto:</b></Body>
              <Body>  
                {employee?.user?.contact}
              </Body>
            </List.Content>
            <List.Content>
              <SmallSubHeading><b>Comissões:</b></SmallSubHeading>
              <Body className={"employeeComission"}>700€</Body>
            </List.Content>
          </Column>

          <Column className={"optionsAboutEmployee"}>
            { renderPromotion &&
              <Column className={"promotionContainer"}>
                <Button
                  disabled={false}
                  action={_confirmToPromoteEmployee}
                  small={false}
                  text={textForPromotion(isInstructor)}
                  className={"promotionButton"}
                />
              </Column>
            }

            <Column className={"deleteOrGenerateContract"}>
              <Button
                disabled={false}
                action={_confirmToDeleteEmployee}
                small={true}
                text="Excluir"
                className={"secondaryButton"}
              />
              <Button
                disabled={false}
                action={() => {_handlePDFButton(employee.user.name, employee.user.nif, employee.user.address)}}
                small={true}
                text="Gerar contrato"
                className={"primaryButton"}
              />
            </Column>

          </Column>
          
        </List.Item>
        <Divider />
      </>
    );
  };

  const employeesFromEdit = state?.employeesReturningFromEdit;
  const employeesToLoop = state?.employees

  const employeesToRender = () => {
    if (isFromEdit) {
      return state?.employees?.map((employee, index) => {
        return renderEmployee(employee, index)
      }) 
    } else if(!state?.employees || state?.employees?.length === 0 || state?.employees === undefined || state?.employees === null && !state?.employeesReturningFromEdit) {
      return (
        <EmptyContainer>
          <SubHeading>Ainda não há funcionários...</SubHeading>
        </EmptyContainer>
      )
    } else if (!state?.isFromEdit && state?.employees) {
      return employeesToLoop.map((employee, index) => { 
        return renderEmployee(employee, index)
      }) 
    }
  }

  employeesToRender()

  return (
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer id={"mainContainer"}>
        <BackIcon onClick={_goBack} className={"backIcon"}/>
        <List divided verticalAlign="middle" className={"listContainer"}>
          {employeesToRender()}
        </List>
        <LogoContainer>
          <LogoMD action={
            () => history.push({
              pathname: "/BackOffice"
            }
            )}
          />
        </LogoContainer>
      </MainContainer>
    </>
  )

};

export default EmployeeList;
