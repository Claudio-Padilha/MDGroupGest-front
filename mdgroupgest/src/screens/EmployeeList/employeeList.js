import React from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Swal from 'sweetalert2';
import { PDFDownloadLink } from '@react-pdf/renderer';

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
  console.log(props, 'props da employee list')

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
  console.log(isFromEdit, 'TODOS OS FUNCIONÁRIOS DA TYPE TO SEE')

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

    console.log(employee, 'EMPLOYEEEEEEEEEEEEEE')
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

    function _handlePDFButton() {
      return (
        <div>
          <PDFDownloadLink
            document={
              <ContractDocumentPDF
                employeeName={employee?.user?.name}
                employeeNif={employee?.user?.nif}
                employeeAddress={employee?.user?.address}
              />
            }
            fileName={`contrato${employee?.user?.name}.pdf`}
            style={{textDecoration: "none", padding: 5, textShadow: "1px 1px 3px rgba(255, 255, 255, 0.3)", color: "#fff"}}
          >
            Gerar contrato
          </PDFDownloadLink>
        </div>
      )
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
              action={_handlePDFButton}
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
        console.log(employee, 'cada func')
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
