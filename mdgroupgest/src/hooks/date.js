const useDate = () => {
  const date = new Date()
  
  let months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  let currentMonthNumber = date.getDate() <= 20 ?
    date.getMonth() === 0 ?
    11 : date.getMonth() : date.getMonth() === 11 ?
    0 : date.getMonth() + 1

  const currentMonth = months[currentMonthNumber]

  return currentMonth
}

const usePassedPeriodDays = () => {
  const date = new Date()
  const currentMonthDay = date.getDate()

  let passedDays

  if (currentMonthDay <= 20) {
    const lastMonthDays = new Date(date.getFullYear(), date.getMonth() - 1, 0).getDate()
    passedDays = currentMonthDay + lastMonthDays - 20
  } else {
    passedDays = currentMonthDay - 20
  }

  return passedDays
} 

export { useDate, usePassedPeriodDays }