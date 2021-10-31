import { useEffect } from 'react'

import dataRequests from '../requests/dataRequests'

export const useStartAppActions = () => {

  const getFeedbackCalls = () => dataRequests.getFeedbackCall()
  const getSellStates = () =>dataRequests.getSellState()
  const getPayments =  () => dataRequests.getPayment()
  const getGasScales = () => dataRequests.getGasScale()
  const getPowers = () => dataRequests.getPower()
  const getResultsToPresent = () => dataRequests.getResultsToPresent()

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  return start
}