import { useMemo, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import employeesRequests from '../requests/employeesRequests'

export const useEmployeesActions = ({ officeId }) => {
  const dispatch = useDispatch()

  const actions = useMemo(
    () => bindActionCreators(
        {
          getEmployees: employeesRequests.getAllEmployees(officeId)
        },
        dispatch
    ),
    [dispatch]
  )

  const getAllEmployees = useCallback(
    (officeId) => {
      return actions.getAllEmployees(officeId)
    },
    [actions],
  )

  return { getAllEmployees }
}


export const useEmployees = () => {
  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [localStorage])

  const ceo = useMemo(() => {
    return allEmployees?.ceo
  }, [allEmployees])

  const administrator = useMemo(() => {
    return allEmployees?.admin
  }, [allEmployees])

  const regularManager = useMemo(() => {
    const managers = allEmployees?.manager

    return managers
  }, [allEmployees])

  const regularSecretary = useMemo(() => {
    return allEmployees?.secretary
  }, [allEmployees])

  const salesPerson = useMemo(() => {
    const salesPersonArr = allEmployees?.sales_person

    let comercial = []
    let instructor = []
    let teamLeader = []
    let managerAssistant = []

    for (let i = 0; i < salesPersonArr?.length; i++) {
      if (salesPersonArr[i]?.is_manager_assistant) {
        managerAssistant.push(salesPersonArr[i])
      } else if (salesPersonArr[i]?.is_team_leader) {
        teamLeader.push(salesPersonArr[i])
      } else if (salesPersonArr[i]?.is_instructor) {
        instructor.push(salesPersonArr[i])
      } else {
        comercial.push(salesPersonArr[i])
      }
    }

    return { comercial, instructor, teamLeader, managerAssistant }
  }, [allEmployees])

  const managerAssistants = salesPerson?.managerAssistant
  const teamLeaders = salesPerson?.teamLeader
  const instructors = salesPerson?.instructor
  const comercials = salesPerson?.comercial

  return { 
    ceo, 
    regularManager,
    administrator,
    regularSecretary,
    managerAssistants,
    teamLeaders, 
    instructors, 
    comercials
  }
}