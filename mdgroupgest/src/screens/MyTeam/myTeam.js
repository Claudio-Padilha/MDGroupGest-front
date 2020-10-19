import React from "react";
import { Link, useHistory } from "react-router-dom";
import Tree from 'react-tree-graph';

import { SubHeading } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';
import request from '../../components/Form/request';

import data from './data';

import { MainContainer } from "./styles";

import { MDCard, MDCardBody } from '../../screens/Home/md';

const MyTeam = () => {

  const history = useHistory();

  // aqui cada clique leva a pagina de detalhe de cada funcionário
  function _handleMainClick (event, nodeKey) {
    console.log('handle click ', event);
    console.log('handle click nodeKey', nodeKey);

    localStorage.setItem('employeeDetail', nodeKey)
    history.push("/EmployeeDetail");
  }

  // caso haja lógica para o right click
  function _handleRightClick(event, nodeKey) {
    event.preventDefault();
    console.log('handle click right', nodeKey)
    alert(`Right clicked ${nodeKey}`);
  }

  var team = localStorage.getItem('myTeam');

  var parsedTeam = JSON.parse(team);

  // const officeId = parsedTeam[0].office;
  //const teamMembers = parsedTeam[0].user; // ter lógica de map na array para pegar todos

  function _goBack() {
    history.push("/BackOffice");
  }

  return (
    <MainContainer className="custom-container">
      <BackIcon onClick={_goBack} className={"backIcon"}/>
      <Tree
        data={data}
        height={700}
        width={1000}
        animated
        steps={90}
        duration={1500}
        svgProps={{
          className: 'custom',
        }}
        gProps={{
          onClick: _handleMainClick,
          onContextMenu: _handleRightClick
        }}
        nodeShape="image"
        nodeProps={{
          height: 30,
          width: 30,
          nodeRadius: 15,
          href: 'https://i.pinimg.com/originals/58/d8/c1/58d8c1a2363061117c2c00018b04e34c.jpg'
        }}
        margins={{
          top: 20,
          bottom: 10,
          left: 20,
          right: 200
        }}
      />
    </MainContainer>
  );
};

export default MyTeam;
