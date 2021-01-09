const validate = values => {
  const errors = {};
  if (!values?.officeName) {
    errors.officeName = "Necessário";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values?.officeName)) {
    errors.officeName = "Endereço de e-mail inválido.";
  }

  return errors;
};

export default validate;
