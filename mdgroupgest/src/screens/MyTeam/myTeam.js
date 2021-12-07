import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Tree from 'react-tree-graph'
import { SwishSpinner } from 'react-spinners-kit'

import { BackIcon } from '../../components/Icon/icons'
import { Heading, SubHeading } from '../../components/Text/text'

import { MainContainer, WidthMessageContainer } from './styles'
import dataRequests from '../../hooks/requests/dataRequests'

const MyTeam = () => {

  const currentOffice = JSON.parse(localStorage.getItem('currentOffice'))
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)

  setTimeout(() => {
    setIsLoading(false)
  }, [2000])

  // aqui cada clique leva a pagina de detalhe de cada funcionário
  // function _handleMainClick (event, nodeKey) {

  //   localStorage.setItem('employeeDetail', nodeKey)
  //   history.push('/EmployeeDetail');
  // }
  
  function maketree(instance, father, employees) {
    
    let my_children = []

    if (employees.length === 0 ){
      return
    }
      
      for (var i=0; i<employees.length; i++){
        if (instance.user.user_type === 'manager'){
          if (instance.id === employees[i].manager){
            father.children.push(
              {
                name: employees[i]?.user.name,
                textProps: {x: -30, y: 25},
                nodeProps: {
                  href: employees[i]?.user?.avatar ? employees[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                  height: 30,
                  width: 30,
                  nodeRadius: 35,
                  cursor: 'auto',
                },
                children:[]
              }
            )
            employees[i].my_index_on_employees = i
            my_children.push(employees[i])
            employees.splice(i, 1)
            i--
          }
          
        } else if (instance.user.user_type === 'manager_assistant'){
          if (instance.id === employees[i].manager_assistant){
            father.children.push(
              {
                name: employees[i]?.user.name,
                textProps: {x: -30, y: 25},
                nodeProps: {
                  href: employees[i]?.user?.avatar ? employees[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                  height: 30,
                  width: 30,
                  nodeRadius: 35,
                  cursor: 'auto',
                },
                children:[]
              }
            )
            employees[i].my_index_on_employees = i
            my_children.push(employees[i])
            employees.splice(i, 1)
            i--
          }
        } else if (instance.user.user_type === 'team_leader'){
          if (instance.id === employees[i].team_leader){
            father.children.push(
              {
                name: employees[i]?.user.name,
                textProps: {x: -30, y: 25},
                nodeProps: {
                  href: employees[i]?.user?.avatar ? employees[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                  height: 30,
                  width: 30,
                  nodeRadius: 35,
                  cursor: 'auto',
                },
                children:[]
              }
            )
            employees[i].my_index_on_employees = i
            my_children.push(employees[i])
            employees.splice(i, 1)
            i--
          }
        } else if (instance.user.user_type === 'instructor'){
          if (instance.id === employees[i].instructor){
            father.children.push(
              {
                name: employees[i]?.user.name,
                textProps: {x: -30, y: 25},
                nodeProps: {
                  href: employees[i]?.user?.avatar ? employees[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
                  height: 30,
                  width: 30,
                  nodeRadius: 35,
                  cursor: 'auto',
                },
                children:[]
              }
            )
            employees[i].my_index_on_employees = i
            my_children.push(employees[i])
            employees.splice(i, 1)
            i--
          }
        }

      }

      for (var j = 0; j<my_children.length; j++){  
        maketree(my_children[j], father?.children[j], employees)
      }
  }

  function _goBack() {
    history.push({
      pathname: '/BackOffice',
      state: {
        fromMyTeam: true,
      }
    })
  }

  dataRequests.getMyTeam(currentOffice?.id)

  async function _getData() {

    const employees = JSON.parse(localStorage.getItem('myTeam'))

    const managers = employees['manager']
    const sales_people = employees['sales_person']

    var data = {
      name: currentOffice.name,
      textProps: {x: -30, y: 25},
      children: []
    }
    
    var instance = managers[0]
    data.children.push(
      {
        name: managers[0]?.user.name,
        textProps: {x: -30, y: 25},
        nodeProps: {
          href: managers[0]?.user?.avatar ? managers[0].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
          height: 30,
          width: 30,
          nodeRadius: 35,
          cursor: 'auto',
        },
        children:[]
      }
    )

    await maketree(instance, data.children[0], sales_people)
    return data;
  }

  const [finalData, setFinalData] = useState({})

  useEffect(() => {
    _getData()
      .then((result) => {
        setFinalData(result)
      })

    return finalData
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    isLoading ?
    <MainContainer className='custom-container'>
      <SwishSpinner size={300} color='#686769' loading={isLoading} />
    </MainContainer>  
    :
    <>
      <WidthMessageContainer>
        <Heading>Você precisa de mais espaço!</Heading>
        <SubHeading>Volte ao tamanho necessário.</SubHeading>
      </WidthMessageContainer>
      <MainContainer className='custom-container'>
        <BackIcon onClick={_goBack} className={'backIcon'}/>
        <Tree
          data={finalData}
          height={900}
          width={1200}
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
          nodeShape='image'
          nodeProps={{
            height: 45,
            width: 45,
            nodeRadius: 35,
            cursor: 'auto',
            href: require('../../assets/icons/loboMD.png'),
          }}
          margins={{
            top: 20,
            bottom: 10,
            left: 20,
            right: 200
          }}
        />
      </MainContainer>
    </>
  );
};

export default MyTeam;
