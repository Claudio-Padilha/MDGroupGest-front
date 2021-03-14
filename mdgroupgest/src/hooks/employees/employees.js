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

  const manager = useMemo(() => {
    const managers = allEmployees?.manager
    let ceo = []
    let regularManager = []

    for (let i = 0; i < managers?.length; i++) {
      if (managers[i]?.user?.is_admin) {
        ceo.push(managers[i])
      } else {
        regularManager.push(managers[i])
      }
    }

    return { ceo, regularManager }
  }, [allEmployees])

  console.log(allEmployees, 'TODOS')

  const secretarie = useMemo(() => {
    const secretaries = allEmployees?.secretary
    let regularSecretary = []
    let administrator = []

    for (let i = 0; i < secretaries?.length; i++) {
      console.log(secretaries[i]?.user?.is_admin, 'TESTE')
      if (secretaries[i]?.user?.is_admin) {
        administrator.push(secretaries[i])
      } else {
        regularSecretary.push(secretaries[i])
      }
    }

    return { administrator, regularSecretary }
  }, [allEmployees])

  const salesPerson = useMemo(() => {
    const salesPersonArr = allEmployees?.sales_person

    let comercial = []
    let instructor = []
    let teamLeader = []

    for (let i = 0; i < salesPersonArr?.length; i++) {
      if (salesPersonArr[i]?.is_team_leader) {
        teamLeader.push(salesPersonArr[i])
      } else if (salesPersonArr[i]?.is_instructor) {
        instructor.push(salesPersonArr[i])
      } else {
        comercial.push(salesPersonArr[i])
      }
    }

    return { comercial, instructor, teamLeader }
  }, [allEmployees])

  const ceo = manager?.ceo
  const regularManager = manager?.regularManager
  const administrator = secretarie?.administrator
  const regularSecretary = secretarie?.regularSecretary
  const teamLeaders = salesPerson?.teamLeader
  const instructors = salesPerson?.instructor
  const comercials = salesPerson?.comercial

  return { 
    ceo, 
    regularManager,
    administrator,
    regularSecretary,
    teamLeaders, 
    instructors, 
    comercials
  }
}