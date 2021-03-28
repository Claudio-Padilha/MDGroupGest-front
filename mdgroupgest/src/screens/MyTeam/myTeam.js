import React, { useState, useMemo, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Tree from 'react-tree-graph';
import { SwishSpinner, GuardSpinner, CombSpinner } from "react-spinners-kit";

import { BackIcon } from '../../components/Icon/icons';

import { MainContainer } from "./styles";
import dataRequests from '../../hooks/requests/dataRequests';
import { Autocomplete } from "@material-ui/lab";

const MyTeam = () => {

  const currentOffice = JSON.parse(localStorage.getItem('currentOffice'));
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, [2000]);

  // aqui cada clique leva a pagina de detalhe de cada funcionário
  function _handleMainClick (event, nodeKey) {

    localStorage.setItem('employeeDetail', nodeKey)
    history.push("/EmployeeDetail");
  }

  // caso haja lógica para o right click
  function _handleRightClick(event, nodeKey) {
    event.preventDefault();
    alert(`Right clicked ${nodeKey}`);
  }
  
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
            i--
          }
        }

      }
      for (var k = 0; k<my_children.length; k++){  
        employees.splice(my_children[k].my_index_on_employees, 1)
      }

      for (var j = 0; j<my_children.length; j++){  
        return maketree(my_children[j], father?.children[j], employees)
      }

      return
  }

  function _goBack() {
    history.push({
      pathname: "/BackOffice",
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
    const copy_sales_people = employees['sales_person']

    const team_leaders = []
    const instructors = []

    // copy_sales_people.forEach(person => {
    //   if (person.is_team_leader){
    //     team_leaders.push(person)
    //     sales_people.splice(sales_people.indexOf(person), 1)
    //   }else if(person.is_instructor){
    //     instructors.push(person)
    //     sales_people.splice(sales_people.indexOf(person), 1)
    //   }
    // });

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

    // for (var i = 0; i < managers?.length; i++) {     
    //   data.children.push(
    //     {
    //       name: managers[0]?.user.name,
    //       textProps: {x: -30, y: 25},
    //       nodeProps: {
    //         href: managers[i]?.user?.avatar ? managers[i].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //         height: 30,
    //         width: 30,
    //         nodeRadius: 35,
    //         cursor: 'auto',
    //       },
    //       children:[]
    //     }
    //   )

    //   for (var j = 0; j < team_leaders?.length; j++) {
    //     if (team_leaders[j]?.manager === managers[i]?.id) {
    //       data.children[i].children.push(
    //         {
    //           name: team_leaders[j].user.name,
    //           nodeProps: {
    //             href: team_leaders[j].user.avatar ? team_leaders[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //             height: 30,
    //             width: 30,
    //             nodeRadius: 35,
    //             cursor: 'auto',
    //           },
    //           textProps: {x: -30, y: 25},
    //           children:[]
    //         }
    //       )

    //       for (var k = 0; k < instructors.length; k++) {
    //         if (instructors[k].team_leader === team_leaders[j].id) {
    //           data.children[i].children[j].children.push(
    //             {
    //               name: instructors[k].user.name,
    //               nodeProps: {
    //                 href: instructors[k].user.avatar ? instructors[k].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //                 height: 30,
    //                 width: 30,
    //                 nodeRadius: 35,
    //                 cursor: 'auto',
    //               },
    //               textProps: {x: -30, y: 25},
    //               children:[]
    //             }
    //           )

    //           for (var l = 0; l < sales_people.length; l++){
    //             if (sales_people[l].instructor === instructors[k].id) {
    //               var a = data?.children[i]?.children[j]?.children[k]?.children.push(
    //                 {
    //                   name: sales_people[l].user.name,
    //                   nodeProps: {
    //                     href: sales_people[l].user.avata ? sales_people[l].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //                     height: 30,
    //                     width: 30,
    //                     nodeRadius: 35,
    //                     cursor: 'auto',
    //                   },
    //                   textProps: {x: -30, y: 25},
    //                   children:[]
    //                 }
    //               )
    //             }
    //           }
    //         }
    //       }

    //       for (var l = 0; l < sales_people.length; l++) {
    //         if (sales_people[l].team_leader === team_leaders[j].id) {
    //           data.children[i].children[j].children.push(
    //             {
    //               name: sales_people[l].user.name,
    //               nodeProps: {
    //                 href: sales_people[l].user.avatar ? sales_people[l].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //                 height: 30,
    //                 width: 30,
    //                 nodeRadius: 35,
    //                 cursor: 'auto',
    //               },
    //               textProps: {x: -30, y: 25},
    //               children:[]
    //             }
    //           )
    //         } 
    //       }
    //     }
    //   }

    //   for (var j = 0; j < instructors.length; j++) {
    //     if (instructors[j].manager === managers[i].id) {
    //       data.children[i].children.push(
    //         {
    //           name: instructors[j].user.name,
    //           nodeProps: {
    //             href: instructors[j].user.avatar ? instructors[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //             height: 30,
    //             width: 30,
    //             nodeRadius: 35,
    //             cursor: 'auto',
    //           },
    //           textProps: {x: -30, y: 25},
    //           children:[]
    //         }
    //       )

    //       for (var k = 0; k < sales_people.length; k++) {
    //         if (sales_people[k].instructor === instructors[j].id) {
    //           data.children[i].children[j].children.push(
    //             {
    //               name: sales_people[k].user.name,
    //               nodeProps: {
    //                 href: sales_people[k].user.avatar ? sales_people[k].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //                 height: 30,
    //                 width: 30,
    //                 nodeRadius: 35,
    //                 cursor: 'auto',
    //               },
    //               textProps: {x: -30, y: 25},
    //               children:[]
    //             }
    //           )
    //         }
    //       }
    //     }
    //   }

    //   for (var j = 0; j < sales_people.length; j++) {
    //     if (sales_people[j].manager === managers[i].id) {
    //       data.children[i].children.push(
    //         {
    //           name: sales_people[j].user.name,
    //           nodeProps: {
    //             href: sales_people[j].user.avatar ? sales_people[j].user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GmQmTlnNxxG_DbYack1kqNxDRQMXAeDF0w&usqp=CAU',
    //             height: 30,
    //             width: 30,
    //             nodeRadius: 35,
    //             cursor: 'auto',
    //           },
    //           textProps: {x: -30, y: 25},
    //           children:[]
    //         }
    //       )
    //     }
    //   }
    // }
    // localStorage.setItem('teamData', JSON.stringify(data))
  
    return data;
  }

  const [finalData, setFinalData] = useState({})

  useEffect(() => {
    _getData()
      .then((result) => {
        setFinalData(result)
      })

    return finalData
  }, [])

  console.log(finalData, 'FINAL DATA')

  return (
    isLoading ?
    <MainContainer className="custom-container">
      <SwishSpinner size={300} color="#686769" loading={isLoading} />
    </MainContainer>  
    :
    <MainContainer className="custom-container">
      <BackIcon onClick={_goBack} className={"backIcon"}/>
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
        nodeShape="image"
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

      <button onClick={_getData} />
    </MainContainer>
  );
};

export default MyTeam;
