import React from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { jsPDF } from "jspdf";

import { SubHeading, Body, SmallBody, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon, EditIcon } from '../../components/Icon/icons';

import ContractDocumentPDF from './employmentContract';

import employeesRequests from "../../hooks/requests/employeesRequests";

import {
  MainContainer,
  Row,
  Column,
  LogoContainer,
  EmptyContainer
} from "./styles";

import { List } from "semantic-ui-react";

const EmployeeList = (props) => {
  const history = useHistory();

  const employees = props?.location?.state?.data;
  const userType = props?.location?.state?.userType;
  const shouldRenderEmployeeAssociation = props?.location?.state?.shouldRenderEmployeeAssociation;
  const title = props?.location?.state?.title;
  const officeID = props?.location?.state?.officeID;
  const employeeToAssociate = props?.location?.state?.employeeToAssociate;
  const isFromEdit = props?.location?.state?.isFromEdit;
  const employeesReturningFromEdit = props?.location?.state?.employeesReturningFromEdit;
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  const dataToGoBack = props?.location?.state?.dataGoingToList;

  function _goBack() {
    history.push({
      pathname: "/ChooseEmployeeTypeToSee",
    })
  }

  async function _redirectToEmployeeTypes() {
    await employeesRequests.getAllEmployees(currentOfficeID)
    history.push({
      pathname: "ChooseEmployeeTypeToSee",
    })
  }

  const renderEmployee = (employee, i) => {

    const userType = employee?.user?.user_type;
    const userTypeCapitalized = userType.charAt(0).toUpperCase() + userType.slice(1);

    function _userTypeInPortuguese() {
      switch (userTypeCapitalized) {
        case "Manager":
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

    function _handleEditEmployee() {
      history.push({
        pathname: "/EmployeeEdit",
        state: {
          employeeData: employee,
          officeID: officeID,
          shouldRenderEmployeeAssociation: shouldRenderEmployeeAssociation,
          title: title,
          userType: userType,
          employeeToAssociate: employeeToAssociate,
          employeesComingFromList: isFromEdit ? employeesReturningFromEdit : employees,
        }
      })
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

      const doc = new jsPDF();
      doc.text("CONTRATO DE PRESTAÇÃO DE SERVIÇOS",45,30);
      doc.text("FENIXTHOUSAND SOLUTIONS LDA., sociedade com sede na Rua", 10, 45)
      doc.text("Ricardo Reis, nº 2, 6º esq, 2675-237 Odivelas, com o NIPC 514216131,", 10, 55)
      doc.text("matriculada na Conservatória do Registo Comercial de Lisboa,  sob  o", 10, 65)
      doc.text("mesmo número, neste ato representada na forma de seus atos constitutivos,", 10, 75)
      doc.text("adiante designada 'Fenixthousand Solutions, Lda.' ou 'Contratante'; e", 10, 85)
      doc.text(name +",", 10, 95)
      doc.text("portador(a) do Cartão de Cidadão com o número de identificação civil NR ,", 10, 105)
      doc.text("emitido por República Portuguesa e válido até (VALIDADE), número de", 10, 115)
      doc.text("identificação fiscal " + nif + ", com residência habitual na", 10, 125)
      doc.text(address +",", 10, 135)
      doc.text("adiante designado como 'Contratado';", 10, 145)
      doc.text("Sendo Contratante e Contratado, em conjunto, doravante denominados", 10, 155)
      doc.text("simplesmente 'Partes';", 10, 165)
      doc.text("Considerando que:", 10, 177)
      doc.text("i) a Contratante tem por objeto social o exercício da atividade", 10, 187)
      doc.text("de venda de mercadorias;", 14, 197)
      doc.text("(ii) A Contratante tem interesse em contratar os serviços do", 10, 207)
      doc.text("Contratado e que este aceita prestar, em regime de exclusividade,", 14, 217)
      doc.text("os seus serviços profissionais no sentido de colaborar para o de-", 14, 227)
      doc.text("senvolvimento da atividade da Fenixthousand Solutions, Lda.", 14, 237)
      doc.text("Resolvem as Partes, de comum acordo, celebrar o presente Contrato de", 10, 249)
      doc.text("Prestação de Serviços ('Contrato'), o qual se regerá de acordo com os", 10, 259)
      doc.text("seguintes termos e condições:", 10, 269)
      doc.addPage()
      doc.text("Cláusula Primeira - Objeto", 10, 15)
      doc.text("1.      O presente Contrato tem por objeto a prestação de serviços pelo", 10, 27)
      doc.text("Contratado à Contratante, em regime de exclusividade, nomeadamente, (i) o", 10, 37)
      doc.text("desenvolvimento de tarefas necessárias à preparação e ao cumprimento dos", 10, 47)
      doc.text("contratos de venda de mercadorias e de angariação de novos clientes e", 10, 57)
      doc.text("serviços; e (ii) a prestação de serviços de divulgação comercial; tudo de", 10, 67)
      doc.text("1.2     A Contratante e o Contratado acordam que, pelo facto de serem", 10, 77)
      doc.text("entidades juridicamente autónomas e não existir qualquer relação de trabalho", 10, 87)
      doc.text("que não seja a de prestação de serviços, o Contratado é o único e exclusivo", 10, 97)
      doc.text("responsável pelos pagamentos e contribuições relativas a impostos, segurança", 10, 107)
      doc.text("social, seguros de acidentes de trabalho ou outras importâncias devidas e", 10, 117)
      doc.text("inerentes a sua atividade de profissional liberal (ou empresário em nome", 10, 127)
      doc.text("individual), salvo disposições legais em contrário.", 10, 137)
      doc.text("Cláusula Segunda - Local", 10, 149)
      doc.text("O Contratado desenvolverá seus serviços em território português, sendo", 10, 159)
      doc.text("da essência deste Contrato a necessidade de deslocamento em viagens", 10, 169)
      doc.text("para o desenvolvimento pleno dos Serviços. Tais viagens  correrão,", 10, 179)
      doc.text(" exclusivamente, às expensas do Contratado.", 10, 189)
      doc.line(10, 229, 80, 229)
      doc.line(120, 229, 190, 229)
      doc.text("Contratante", 20, 239)
      doc.text("Contratado", 130, 239)
      doc.text("Lisboa, " + String(today.getDate()) + "/" + String((today.getMonth() + 1) > 9 ? today.getMonth() + 1 : "0") + String(today.getMonth() + 1) + "/" + String(today.getFullYear()), 140, 279)
     
      doc.save(name + ".pdf");
    };

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
          
        </List.Item>
        <Divider />
      </>
    );
  };

  const employeesToRender = () => {
    if (isFromEdit) {
      return employeesReturningFromEdit.map((employee, index) => {
        return renderEmployee(employee, index)
      }) 
    } else if(!employees || employees?.length === 0 || employees === undefined || employees === null && !employeesReturningFromEdit) {
      return (
        <EmptyContainer>
          <SubHeading>Ainda não há funcionários...</SubHeading>
        </EmptyContainer>
      )
    } else if (!isFromEdit && employees) {
      return employees.map((employee, index) => { 
        return renderEmployee(employee, index)
      }) 
    }
  }

  employeesToRender()

  return (
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
  )

};

export default EmployeeList;
