const useChart = ({
  dataToPopulateGraphic,
  ko,
  ok,
  r
}) => {
  if (!dataToPopulateGraphic) {
    return
  }
  
  const dataToForm = []

  Object.keys(dataToPopulateGraphic).forEach(function(item){
    dataToForm.push(dataToPopulateGraphic[item])
  })

  const dataOfficeResult = [[
    'Dias',
    `${ok === 1 || ok === 0 ? `(${ok}) Válido` : `(${ok}) Válidos`}`,
    `${r === 1 || r === 0 ? `(${r}) Pendente` : `(${r}) Pendentes`}`,
    `${ko === 1 || ko === 0 ? `(${ko}) Anulado` : `(${ko}) Anulados`}`,
  ], ...dataToForm]

  return dataOfficeResult
}

export default useChart