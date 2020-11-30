import React, { useCallback } from "react";
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

import request from '../../components/Form/request'

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

  function _goBack() {
    history.push({
      pathname: "/ChooseEmployeeTypeToSee"
    })
  }

  async function _redirectToEmployeeTypes() {
    await request.getAllEmployees()
    history.push({
      pathname: "ChooseEmployeeTypeToSee",
    })
  }

  const renderEmployee = (employee, i) => {
    if(!employees) {
      return null;
    }

    function _handleEditEmployee() {
      history.push({
        pathname: "/EmployeeEdit",
        state: {
          employeeData: employee
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
            await request.deleteEmployee(employee)         
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

    const userType = employee?.user?.user_type;
    const userTypeCapitalized = userType.charAt(0).toUpperCase() + userType.slice(1);

    function _handlePDFButton() {
      return (
        <div style={{
          display: 'flex',
          alignContent:'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          width: "60%",
          height: "30px",
          boxShadow: "2px 2px 3px rgba(200, 200, 200, 0.7)",
        }}>
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
          <SubHeading>{`Funcionário nº ${i + 1}`}</SubHeading>
          <Button
            disabled={true}
            small={true}
            text={userTypeCapitalized}
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
          </Column>
          
        </List.Item>
        <Divider />
      </>
    );
  };

  function _renderOrNot() {
    if(!employees || employees?.length === 0 || employees === undefined || employees === null) {
      return (
        <EmptyContainer>
          <SubHeading>Ainda não há funcionários...</SubHeading>
        </EmptyContainer>
      )
    } else {
      return employees.map((employee, index) => { 
        return renderEmployee(employee, index)
      }) 
    };
  }

  return (
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} color={"black"} className={"backIcon"}/>
      <List divided verticalAlign="middle" className={"listContainer"}>
        {_renderOrNot()}
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
