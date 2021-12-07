const useDate = () => {
  const date = new Date();

  var months = new Array();
  months[0] = "Janeiro";
  months[1] = "Fevereiro";
  months[2] = "Março";
  months[3] = "Abril";
  months[4] = "Maio";
  months[5] = "Junho";
  months[6] = "Julho";
  months[7] = "Agosto";
  months[8] = "Setembro";
  months[9] = "Outubro";
  months[10] = "Novembro";
  months[11] = "Dezembro";

  let currentMonthNumber = date?.getMonth();

  const currentMonth = months[currentMonthNumber];

  return currentMonth;
}

export { useDate };