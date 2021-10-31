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

  let currentMonthNumber = date?.getMonth()

  const currentMonth = months[currentMonthNumber]

  return currentMonth
}

export { useDate }