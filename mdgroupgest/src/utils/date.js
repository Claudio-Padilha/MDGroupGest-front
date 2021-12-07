const _formatDate = (date) => {
  if (date !== undefined && date !== "") {
    var myDate = new Date(date);
    var month = [
      " de Janeiro de ",
      " de Fevereiro de ",
      " de Março de ",
      " de Abril de ",
      " de Maio de ",
      " de Junho de ",
      " de Julho de ",
      " de Agosto de ",
      " de Setembro de ",
      " de Outubro de ",
      " de Novembro de ",
      " de Dezembro de ",
    ][myDate.getMonth()];
    var str = myDate.getDate() + "" + month + "" + myDate.getFullYear();
    return str;
  }
  return "";
}

export {
  _formatDate
}