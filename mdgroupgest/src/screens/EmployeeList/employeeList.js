import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';
import Swal from 'sweetalert2';

import { SubHeading, Body, SmallSubHeading } from '../../components/Text/text';
import { LogoMD } from '../../components/Logo/logo';
import Button from "../../components/Button/button";
import { BackIcon } from '../../components/Icon/icons';

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

  function _goBack() {
    history.push({
      pathname: "/ChooseEmployeeTypeToSee",
      state: {
        fromEmployeeList: true
      }
    })
  }

  const history = useHistory();

  var localStorage = window.localStorage;

  const employees = useMemo(() => {
    if (props?.location?.state?.userType) {
      const employeeType = props?.location?.state?.userType
      return JSON.parse(localStorage.getItem(employeeType))
    }
  },[props])

  console.log(employees, 'FUNCS')

  // function _removeContractFromRAM() {
  //   _.remove(contracts, function(obj) {
  //     return obj.id === deletedID
  //   })
  // }

  // if(deletedID) {
  //   _removeContractFromRAM()
  // }

  const renderEmployee = (employee, i) => {

    function _confirmToDeleteEmployee() {
      console.log(employee, 'data')
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
            request.deleteEmployee(employee) 
            .then(
              request.getContracts().then(
                swalWithBootstrapButtons.fire(
                  'Funcionário Excluído!',
                  'A operação foi concluída com sucesso.',
                  'success'
                )
              )
            )
  
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
    const userTypeCapitalized = userType.charAt(0).toUpperCase() + userType.slice(1)

    return (
      <>
        <Row className={"titleRow"}>
          <SubHeading>{`Funcionário nº ${i + 1}`}</SubHeading>
          <Button
            disabled={true}
            small={true}
            text={userTypeCapitalized}
            className={"userTypeTag"}
          />
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
              action={() => {
                history.push({
                  pathname:"/EmployeeDetail",
                })
              }}
              small={true}
              text="Gerar contrato"
            />

            <Button
              disabled={false}
              // action={() => {
              //   Promise.all([
              //     request.deleteContract(contract?.id),
              //     request.getOffices(),
              //   ])
              // }}
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

  return (
    <MainContainer id={"mainContainer"}>
      <BackIcon onClick={_goBack} color={"black"}/>
      <List divided verticalAlign="middle" className={"listContainer"}>
      {employees?.length === 0 && 
        <EmptyContainer>
          <SubHeading>Ainda não há funcionários...</SubHeading>
        </EmptyContainer>
      }
       {employees && 
        employees.map((employee, index) => { 
          return renderEmployee(employee, index)
        })
      }         
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
