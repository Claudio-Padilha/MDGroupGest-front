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
                'Comercial Promovido!',
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
              'O comercial não foi promovido.',
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
                'Comercial Excluído!',
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
              'O comercial não foi excluído.',
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
                name + ", portador(a) do Cartão de Cidadão com o número de identificação 000000000",
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
                "                                                  CLÁUSULA QUARTA - PRAZO E RESOLUÇÃO",
                "4.1      O presente Contrato vigorará pelo prazo de 12 meses contados a partir da data de sua assinatura, e dei-",
                "xará de produzir efeitos, independentemente da invocação de sua causa, desde que a CONTRATANTE ou   o",
                "CONTRATADO comunique à outra PARTE, por escrito e com antecedência mínima de 15 dias úteis.",
                "4.2     Por ocasião do término do Contrato, independentemente da modalidade de rescisão contratual, o CONTRA-",
                "TADO fará jus, apenas e tão somente ao valor referente às comissões daquilo que efetivamente for recebido pela",
                "CONTRATANTE ('RESULTADOS EFETIVOS').",
                "4.3     O CONTRATADO tem plena ciência de que, no caso de angariação de novos clientes e serviços, os RE-",
                "SULTADOS EFETIVOS são apurados após 90 (noventa) dias da respetiva angariação, de forma que em caso de",
                "rescisão e/ou abandono pelo Contratado, nada será devido pela CONTRATANTE antes de transcorridos 90 dias",
                "e antes de que sejam apurados eventuais descontos por infração contratual.",
                "4.4      Se, no prazo de 5 dias, o CONTRATADO, por qualquer motivo, não contatar a CONTRATANTE - e/ou não",
                "puder ser contatado pela mesma - ficará, de imediato, caracterizado abandono do Contrato, não sendo devida",
                "qualquer remuneração ao CONTRATADO.",
                "4.5      O valor devido pelo CONTRATADO em decorrência da violação das obrigações aqui estabelecidas se-",
                "rá, de forma legítima, integralmente descontado pela CONTRATANTE de eventual valor que ainda seja devido ao", 
                "CONTRATADO a título de remuneração.",
                "4.6      Após o termo do Contrato, o CONTRATADO obriga-se a: (a) entregar à CONTRATANTE no prazo máximo", 
                "de 5 (cinco) dias toda a documentação, informação, materiais e equipamentos que, direta ou indiretamente, tenha", 
                "recebido no exercício das atividades prestadas no âmbito deste Contrato; e (b) a não contatar ou usar por qualquer", 
                "forma a lista de clientes e de produtos a que teve acesso no cumprimento do presente contrato, sob pena de ser",
                "responsabilizado a pagar a multa cominatória (Cláusula Décima), sem prejuízo da indemnização devida pelos da-",
                "nos emergentes e lucros cessantes causados à CONTRATANTE.",
                "\n",
                "                              CLÁUSULA QUINTA - OBRIGAÇÕES E RESPONSABILIDADES DO CONTRATADO",
                "5.1      O CONTRATADO atuará por conta e no interesse da CONTRATANTE na venda de produtos relacionados",
                "ao projeto a que estiver relacionado e na prestação de serviços conexos, devendo entregar os resultados diários", 
                "dos serviços e/ou clientes angariados à CONTRATANTE.",
                "5.2      O prazo máximo para o CONTRATADO comunicar à CONTRATANTE o resultado dos serviços prestados",
                "é de dois dias úteis, sob pena de, não o fazendo, incorrer em multa pelo negócio tardiamente comunicado.",
                "5.3      O CONTRATADO compromete-se, ainda, a agir em conformidade com a  Política de Privacidade   da", 
                "Fenixthousand Solutions, Lda. atualizada em 25 de Maio de 2018 e disponibilizada no ato da assinatura des-",
                "te Contrato, mantendo todos os clientes, vendedores e compradores com os quais contactar no âmbito desta ",
                "prestação de Serviços cientes dos termos da Politica de Privacidade e do direito de, a qualquer tempo, limitar",
                "a utilização - ou ter excluída - toda e qualquer informação sua da base de dados da CONTRATANTE, sempre",
                "de acordo com o Regulamento UE 2016/679.",
                "5.4     Os serviços contratados serão prestados pelo CONTRATADO seguindo com a mais absoluta autonomia",
                "técnica e funcional, não seestabelecendo qualquer vínculo empregatício entre a CONTRATANTE e o  CON-",
                "TRATADO.",
                "5.5     O CONTRATADO se compromete a frequentar e participar, por sua conta, em ações de formação orga-",
                "nizadas pela CONTRATANTE.",
                "5.6     O CONTRATADO carece de legitimidade para garantir ou prometer qualquer beneficio em nome e por",
                "conta da CONTRATANTE, salvo com autorização expressa e inequívoca desta.",
                "5.7     O CONTRATADO compromete-se a jamais utilizar o nome da CONTRATANTE ou de seus sócios para",
                "realizar quaisquer negócios em benefício próprio ou de terceiro que não a própria CONTRATANTE, seus só-", 
                "cios ou empresas a eles relacionadas, sob pena de incorrer na coima estabelecida na Cláusula Décima.",
                "5.8     O CONTRATADO compromete-se a tomar todas as diligências necessárias à boa cobrança dos valores",
                "devidos em decorrência dos negócios celebrados no âmbito dos Serviços.",
                "5.9     No estrito cumprimento da legislação em vigor, o CONTRATADO reconhece que todas as receitas ob-",
                "tidas e geradas através desta prestação de serviços, e enquanto este Contrato permanecer em vigor, pertencem",
                "única e exclusivamente à CONTRATANTE.",
                "5.10    O CONTRATADO está obrigado a entregar todas as receitas obtidas através da atividade desenvolvida no",
                "âmbito deste Contrato, com base nas quais será efetuado o cálculo das comissões para a remuneração do CON-",
                "TRATADO.",
                
      ], 10, 30)
      doc.addPage()
      doc.text([
                "                              CLÁUSULA SEXTA - OBRIGAÇÕES E RESPONSABILIDADES DA CONTRATANTE",
                "6.1     Durante a vigência deste Contrato, a CONTRATANTE deverá permitir que o CONTRATADO utilize, a seu",
                "exclusivo critério e sempre que assim julgue necessário, as instalações da sua agência situada na Rua Quinta de",
                "Santa Marta nº 2 - loja 2 D e E, 1495-171, Algés, bem como os seus materiais, equipamentos de comunicação e",
                "outros que sejam necessários ao desenvolvimento da sua atividade.",
                "6.2     Durante a vigência deste Contrato, a CONTRATANTE fornecerá ao CONTRATADO os meios necessários",
                "à divulgação e contratação dos respetivos Serviços, os quais serão previamente requisitados pelos clientes",
                "da Fenixthousand Solutions, Lda., bem como dará acesso ao CONTRATADO aos valores e informações acerca",
                "das mercadorias que sejam parte do projeto para o qual o CONTRATADO exerça suas atividades.",
                "\n",
                "                                                        CLÁUSULA SÉTIMA - CONFIDENCIALIDADE",
                "7.1    O CONTRATADO, neste ato, reconhece que:",
                "   (i) em virtude da prestação dos Serviços, terá acesso a uma expressiva quantidade de dados sensíveis e",
                "   estratégicos relacionados não só à CONTRATANTE, mas também a seus clientes e sócios ('Informações Confi-",
                "   denciais');",
                "   (ii) o uso dissociado aos limites do fiel cumprimento do Contrato ou a divulgação a terceiros de qualquer Informa-",
                "   ção Confidencial causará danos de dificílima reparação à Fenixthousand Solutions, Lda e a seus clientes.",
                "7.2    Para os fins deste Contrato, são consideradas 'Informações Confidenciais' toda e qualquer informação rela-",
                "cionada, direta ou indiretamente, à Fenixthousand Solutions, Lda, aos sócios da CONTRATANTE, clientes da",
                "CONTRATANTE e parceiros comerciais.",
                "7.3    O CONTRATADO fica proibido, sob qualquer hipótese, de praticar qualquer ato que possa caracterizar, dire-",
                "ta ou indiretamente, uso abusivo ou privilegiado das Informações Confidenciais, devendo comunicar de imediato à",
                "CONTRATANTE quaisquer incidentes que permitam ou possam permitir o extravio ou a revelação das Informa-",
                "ções Confidenciais, sem prejuízo da responsabilidade da CONTRATADA em caso de culpa no incidente.",
                "7.4    O CONTRATADO concorda e reconhece que todos e quaisquer documentos, pen drives, discos, ou outros",
                "meios de armazenamento de documento, media ou informação contendo quaisquer Informações Confidenciais que",
                "sejam por ele recebidas ou adquiridas durante a vigência deste Contrato deverão ser devolvidas, em vias ori-",
                "ginais e eventuais,  sejam por cópias que possam ter sido feitas, bem como todos e quaisquer arquivos, corres-",
                "pondências e/ou outras comunicações recebidas, mantidas e/ou elaboradas pela CONTRATADA durante tal prazo.",
                "7.5    A inobservância do compromisso de confidencialidade assumido nesta Cláusula, além de ensejar execução",
                "específica da obrigação de fazer cessar a divulgação de Informações Confidenciais, sujeitará o CONTRATADO",
                "a pagar à CONTRATANTE, em parcela única, a multa prevista na Cláusula Décima abaixo, sem prejuízo da in-",
                "demnização pelos danos causados pela violação dos deveres previstos nesta Cláusula.",
                "\n",
                "                                                        CLÁUSULA OITAVA - NÃO CONCORRÊNCIA",
                "8.1     Durante o período de vigência deste Contrato e pelo período de 6 (seis) meses após seu encerramento, o",
                "CONTRATADO obriga-se a não:",
                "   (i) realizar negócios, em nome próprio ou de terceiro, com qualquer cliente da Fenixthousand Solutions, Lda.,",
                "   seja este antigo, atual ou futuro;",
                "   (ii) contratar, oferecer contrato ou induzir a que terceiro contrate ou ofereça contrato, a qualquer emprega-",
                "   do, prestador de serviço, cliente ou fornecedor da CONTRATANTE;",
                "   (iii) auxiliar qualquer pessoa ou sociedade na realização de negócios com qualquer cliente ou parceiro comercial,",
                "   passado, atual ou futuro da CONTRATANTE;",
                "   (iv) aconselhar ou pedir, direta ou indiretamente, a qualquer cliente, que retire, reduza ou cancele os negócios",
                "   mantidos com a CONTRATANTE;",
                "   (v) induzir ou tentar influenciar, direta ou indiretamente, qualquer empregado ou prestador de serviço da CON-",
                "   TRATANTE a rescindir o respectivo contrato;",
                "   (vi) induzir ou tentar influenciar qualquer agente, distribuidor, consultor ou trabalhador autônomo contratado",
                "   pela CONTRATANTE, ou que com esta mantenha negócios, a terminar, reduzir ou desviar tais negócios.",
                "8.2    Se a qualquer tempo - mesmo após o término do presente Contrato - o CONTRATADO fizer uso de quais-",
                "quer materiais da CONTRATANTE ou contatar pessoalmente, disponibilizar a terceiro ou usar por qualquer forma a",
                "lista de clientes, produtos e/ou serviços, independente da finalidade pretendida, este deverá pagar à Fenixthousand",
                "Solutions, Lda., a multa prevista na Cláusula Décima e arcar com todas as consequências advindas de tal violação."
      ],10, 30)
      doc.addPage()
      doc.text([
                "                                                        CLÁUSULA NONA - NÃO EXCLUSIVIDADE",
                "Durante a vigência deste Contrato, a prestação dos Serviços pelo CONTRATADO dar-se-á em caráter não-exclusi-",
                "vo, exceto em relação às atividades que possam fazer concorrência à CONTRATANTE.",
                "\n",
                "                                                        CLÁUSULA DÉCIMA - COIMA",
                "10.1    A infração às obrigações estabelecidas nas Cláusulas Sétima, Oitava e Nona, além de constituir motivo", 
                "para a rescisão deste Contrato, sujeitará o CONTRATADO a pagar à Fenixthousand Solutions, Lda., multa contra-",
                "tual no valor de 5.000,00 (cinco mil euros), sem prejuízo de todas e quaisquer perdas ou danos, materiais ou mo-",
                "rais, incorridos pela CONTRATANTE, bem como das demais implicações nas esferas administrativa e criminal ca-",
                "bíveis e de outras penalidades expressamente estabelecidas neste Contrato.",
                "10.2    O valor estabelecido nesta Cláusula poderá ser integralmente retido pela CONTRATANTE, que ficará,",
                "em caso de violação, desobrigada de pagar qualquer remuneração ao CONTRATADO até o limite do valor da mul-",
                "ta estabelecida nesta Cláusula.",
                "\n",
                "                                                 CLÁUSULA DÉCIMA PRIMEIRA - DISPOSIÇÕES GERAIS",
                "11.1    O presente Contrato constitui o acordo final e integral havido entre as PARTES com relação às matérias",
                "aqui tratadas, substituindo e prevalecendo sobre qualquer ajuste eventual e previamente entre elas existente,",
                "e não poderá ser alterado, salvo por acordo escrito e assinado por ambas as PARTES.",
                "11.2    Se, por qualquer razão, qualquer disposição deste Contrato vier a ser considerada inválida, ilegal ou inefi-",
                "caz, as disposições remanescentes deste Contrato não serão por qualquer forma afetadas ou prejudicadas.",
                "11.3    Ocorrendo a declaração de invalidade, ilegalidade ou ineficácia de qualquer cláusula deste Contrato, as",
                "PARTES se comprometem a negociar, no menor prazo possível, em substituição à cláusula em questão, a inclu-",
                "são de termos e condições válidos que reflitam os termos e condições da mesma cláusula, observada a intenção e",
                "objetivo das PARTES quando da sua negociação.",
                "11.4    As PARTES declaram que prescindem do reconhecimento notarial de assinaturas neste Contrato, abstendo-",
                "se de invocar a falta dessa formalidade para impedir a completa produção de efeitos do mesmo.",
                "11.5 As Partes elegem o Tribunal da Comarca de Oeiras, para dirimir quaisquer dúvidas ou controvérsias oriun-",
                "das do presente contrato, com renúncia de qualquer outro, por mais privilegiado que seja.",
                "\n",
                "                                                                         Algés, " + String(today.getDate()) + "/" + String((today.getMonth() + 1) > 9 ? today.getMonth() + 1 : "0") + String(today.getMonth() + 1) + "/" + String(today.getFullYear()),
                "\n",
                "\n",
                "\n",
                "\n",
                "\n",
                "\n",
                "                                             _________________________________________________",
                "                                                CONTRATANTE: FENIXTHOUSAND SOLUTIONS, LDA.",
                "\n",
                "\n",
                "\n",
                "\n",
                "\n",
                "\n",
                "                                             _________________________________________________",
                "                                                CONTRATADO: " + name
      ], 10, 30)
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
          <SubHeading>Ainda não há comerciais...</SubHeading>
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
