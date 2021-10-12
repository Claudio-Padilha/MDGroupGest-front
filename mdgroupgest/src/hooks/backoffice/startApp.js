import { useEffect } from 'react'

import dataRequests from '../requests/dataRequests'

export const useStartAppActions = () => {

  const getFeedbackCalls = () => {
    return dataRequests.getFeedbackCall()
  }

  const getSellStates =  () => {
    return dataRequests.getSellState()
  }

  const getPayments =  () => {
    return dataRequests.getPayment()
  }

  const getGasScales = () => {
    return dataRequests.getGasScale()
  }

  const getPowers = () => {
    return dataRequests.getPower()
  }

  const getResultsToPresent = () => {
      return dataRequests.getResultsToPresent()
    }

  return {
    getFeedbackCalls,
    getSellStates,
    getPayments,
    getGasScales,
    getPowers,
    getResultsToPresent
  }
}

export const useStartApp = () => {
  const start = JSON.parse(localStorage.getItem('start'))

  const {
    getFeedbackCalls,
    getSellStates,
    getPayments,
    getGasScales,
    getPowers,
    getResultsToPresent,
  } = useStartAppActions()
  
  useEffect(() => {
    
    getFeedbackCalls()
    getSellStates()
    getPayments()
    getGasScales()
    getPowers()
    getResultsToPresent()
  }, [start])

  return start
}