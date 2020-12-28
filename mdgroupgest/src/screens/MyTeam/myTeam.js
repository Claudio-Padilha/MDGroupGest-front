import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Tree from 'react-tree-graph';
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";

import { BackIcon } from '../../components/Icon/icons';

import { MainContainer } from "./styles";

const MyTeam = () => {

  const currentOffice = JSON.parse(localStorage.getItem('currentOffice'));
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, [1500]);

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

  function _goBack() {
    history.push("/BackOffice");
  }

  function _getData() {
    
    const employees = JSON.parse(localStorage.getItem('myTeam'))

    const managers = employees['manager']
    const team_leaders = employees['team_leader']
    const instructors = employees['instructor']
    const sales_people = employees['sales_person']

    var data = {
      name: currentOffice.name,
      textProps: {x: -30, y: 25},
      children: []
    }

    for (var i = 0; i < managers.length; i++) {     
      data.children.push(
        {
          name: managers[i].user.name,
          textProps: {x: -30, y: 25},
          nodeProps: {
            href: managers[i].user.avatar ? managers[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
            height: 30,
            width: 30,
            nodeRadius: 35,
          },
          children:[]
        }
      )

      for (var j = 0; j < team_leaders.length; j++) {
        if (team_leaders[j].manager === managers[i].id) {
          data.children[i].children.push(
            {
              name: team_leaders[j].user.name,
              nodeProps: {
                href: team_leaders[j].user.avatar ? team_leaders[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                height: 30,
                width: 30,
                nodeRadius: 35,
              },
              textProps: {x: -30, y: 25},
              children:[]
            }
          )

          for (var k = 0; k < instructors.length; k++) {
            if (instructors[k].team_leader === team_leaders[j].id) {
              data.children[i].children[j].children.push(
                {
                  name: instructors[k].user.name,
                  nodeProps: {
                    href: instructors[k].user.avatar ? instructors[k].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                    height: 30,
                    width: 30,
                    nodeRadius: 35,
                  },
                  textProps: {x: -30, y: 25},
                  children:[]
                }
              )

              for (var l = 0; l < sales_people.length; l++){
                if (sales_people[l].instructor === instructors[k].id) {
                  data.children[i].children[j].children[k].children.push(
                    {
                      name: sales_people[l].user.name,
                      nodeProps: {
                        href: sales_people[l].user.avata ? sales_people[l].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                        height: 30,
                        width: 30,
                        nodeRadius: 35,
                      },
                      textProps: {x: -30, y: 25},
                      children:[]
                    }
                  )
                }
              }
            }
          }

          for (var l = 0; l < sales_people.length; l++) {
            if (sales_people[l].team_leader === team_leaders[j].id) {
              data.children[i].children[j].children.push(
                {
                  name: sales_people[l].user.name,
                  nodeProps: {
                    href: sales_people[l].user.avatar ? sales_people[l].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                    height: 30,
                    width: 30,
                    nodeRadius: 35,
                  },
                  textProps: {x: -30, y: 25},
                  children:[]
                }
              )
            }
          }
        }
      }

      for (var j = 0; j < instructors.length; j++) {
        if (instructors[j].manager === managers[i].id) {
          data.children[i].children.push(
            {
              name: instructors[j].user.name,
              nodeProps: {
                href: instructors[j].user.avatar ? instructors[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                height: 30,
                width: 30,
                nodeRadius: 35,
              },
              textProps: {x: -30, y: 25},
              children:[]
            }
          )

          for (var k = 0; k < sales_people.length; k++) {
            if (sales_people[k].instructor === instructors[j].id) {
              data.children[i].children[j].children.push(
                {
                  name: sales_people[k].user.name,
                  nodeProps: {
                    href: sales_people[k].user.avatar ? sales_people[k].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                    height: 30,
                    width: 30,
                    nodeRadius: 35,
                  },
                  textProps: {x: -30, y: 25},
                  children:[]
                }
              )
            }
          }
        }
      }

      for (var j = 0; j < sales_people.length; j++) {
        if (sales_people[j].manager === managers[i].id) {
          data.children[i].children.push(
            {
              name: sales_people[j].user.name,
              nodeProps: {
                href: sales_people[j].user.avatar ? sales_people[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                height: 30,
                width: 30,
                nodeRadius: 35,
              },
              textProps: {x: -30, y: 25},
              children:[]
            }
          )
        }
      }
    }
    localStorage.setItem('teamData', JSON.stringify(data))
    return data;
  }

  const dataToProcess = _getData()

  return (
    isLoading ?
    <MainContainer className="custom-container">
      <CombSpinner size={300} color="#686769" loading={isLoading} />
    </MainContainer>  
    :
    <MainContainer className="custom-container">
      <BackIcon onClick={_goBack} className={"backIcon"}/>
      <Tree
        data={dataToProcess}
        height={700}
        width={1000}
        animated
        steps={350}
        duration={2000}
        svgProps={{
          className: 'custom',
        }}
        // gProps={{
        //   onClick: _handleMainClick,
        //   onContextMenu: _handleRightClick
        // }}
        nodeShape="image"
        nodeProps={{
          height: 45,
          width: 45,
          nodeRadius: 35,
          href: require('../../assets/icons/loboMD.png'),
        }}
        margins={{
          top: 20,
          bottom: 10,
          left: 20,
          right: 200
        }}
      />

      <button onClick={_getData} />
    </MainContainer>
  );
};

export default MyTeam;
