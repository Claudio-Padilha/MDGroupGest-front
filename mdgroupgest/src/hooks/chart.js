const useChart = ({
  dataToPopulateGraphic,
  ko,
  ok,
  r
}) => {
  const dataToForm = []

  Object.keys(dataToPopulateGraphic).forEach(function(item){
    dataToForm.push(dataToPopulateGraphic[item])
  })

  console.log(dataToPopulateGraphic, 'DATA TO POPULATE NO HOOK')

  const dataOfficeResult = [[
    'Dias',
    `${ok === 1 || ok === 0 ? `(${ok}) Válido` : `(${ok}) Válidos`}`,
    `${r === 1 || r === 0 ? `(${r}) Pendente` : `(${r}) Pendentes`}`,
    `${ko === 1 || ko === 0 ? `(${ko}) Anulado` : `(${ko}) Anulados`}`,
  ], ...dataToForm]

  console.log(dataOfficeResult, 'RESULT NO HOOK')

  return dataOfficeResult
}

export default useChart