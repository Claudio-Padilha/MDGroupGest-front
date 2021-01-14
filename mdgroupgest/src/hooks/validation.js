import Swal from 'sweetalert2';

function _nifValidation(nif) {
  if(nif?.length <= 9) {
    return null;
  }
  return 'O limite de caracteres no NIF é de 9.';
}

function _clientNifValidation(clientNif) {
  if(clientNif?.length <= 9) {
    return null;
  }
  return 'O limite de caracteres no NIF/NIPC é de 9.';
}

function _nipcValidation(nipc) {
  if(nipc?.length <= 9) {
    return null;
  }
  return 'O limite de caracteres no NIPC é de 9.';
}


function _addressValidation(address) {
  if(address?.length <= 120) {
    return null;
  }
  return 'O limite de caracteres na morada é de 120.'
}

function _contactValidation(contact) {
  if(contact?.length <= 9) {
    return null;
  }
  return 'O limite de caracteres no contacto é de 9.'
}

function _clientContactValidation(clientContact) {
  if(clientContact?.length <= 9) {
    return null;
  }
  return 'O limite de caracteres no contacto é de 9.'
}

// REGEX PARA CUI
function _CUIValidation(CUIForGas) {
  if(CUIForGas?.length <= 9) {
    return null;
  }
  return 'MEXER NO CUI'
}

// REGEX PARA CUI
function _CUIDUALValidation(CUIDUAL) {
  if(CUIDUAL?.length <= 9) {
    return null;
  }
  return 'MEXER NO CUI'
}

// REGEX PARA CPE
function _CPEValidation(CPEForElectricity) {
  if(CPEForElectricity?.length <= 9) {
    return null;
  }
  return 'MEXER NO CPE'
}

// REGEX PARA CPE
function _CPEDUALValidation(CPEDUAL) {
  if(CPEDUAL?.length <= 9) {
    return null;
  }
  return 'MEXER NO CPE'
}

function _observationsValidation(observations) {
  if(observations?.length <= 500) {
    return null;
  }
  return 'O limite de caracteres no nome é de 500.'
}

function _nameValidation(name) {
  if(name?.length <= 80) {
    return null;
  }
  return 'O limite de caracteres no nome é de 80.'
}

function _clientNameValidation(clientName) {
  if(clientName?.length <= 80) {
    return null;
  }
  return 'O limite de caracteres no nome é de 80.'
}

function _emailValidation(email) {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
  ) {
    return null;
  }
  return 'Por favor, insira um e-mail válido.';
};

function _zipCodeValidation(zipCode) {
  if (
    /(^\d{4}$)|(^\d{4}-\d{3}$)/.test(zipCode)
  ) {
      return null;
    }
  return `O formato correto para o código postal é: <br> "1234-123". <br> ${zipCode?.length === 0 ? 'Precisamos de um valor' : `Você digitou ${zipCode}`}.`
}

function _hasValidations(
  name,
  nif,
  nipc,
  address,
  contact,
  email,
  zipCode,
  clientName,
  clientNif,
  clientContact,
  CUIDUAL,
  CUIForGas,
  CPEDUAL,
  CPEForElectricity,
  observations
) {
  return (
    _nameValidation(name) !== null ||
    _nifValidation(nif) !== null ||
    _nipcValidation(nipc) !== null ||
    _addressValidation(address) !== null ||
    _contactValidation(contact) !== null ||
    _emailValidation(email) !== null ||
    _zipCodeValidation(zipCode) !== null ||
    _clientNameValidation(clientName) !== null ||
    _clientNifValidation(clientNif) !== null ||
    _clientContactValidation(clientContact) !== null ||
    _CUIDUALValidation(CUIDUAL) !== null ||
    _CUIValidation(CUIForGas) !== null ||
    _CPEDUALValidation(CPEDUAL) !== null ||
    _CPEValidation(CPEForElectricity) !== null ||
    _observationsValidation(observations) !== null
  )
}

function _executeAllValidations(
  name,
  nif,
  nipc,
  address,
  contact,
  email,
  zipCode,
  clientName,
  clientNif,
  clientContact,
  CUIDUAL,
  CUIForGas,
  CPEDUAL,
  CPEForElectricity,
  observations
) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  })

  return (
    localStorage.setItem('formWasValidated', true),
    swalWithBootstrapButtons.fire(
      {
        title: 'Atente-se às validações',
        html: `
          ${_nameValidation(name) ? _nameValidation(name) : ''} <br>
          ${_nifValidation(nif) ? _nifValidation(nif) : ''} <br>
          ${_nipcValidation(nipc) ? _nipcValidation(nipc) : ''} <br>                                            
          ${_addressValidation(address) ? _addressValidation(address) : ''} <br>                             
          ${_contactValidation(contact) ? _contactValidation(contact) : ''} <br>                             
          ${_emailValidation(email) ? _emailValidation(email) : ''} <br>
          ${_zipCodeValidation(zipCode) ? _zipCodeValidation(zipCode) : ''} <br>
          ${_clientNameValidation(clientName) ? _clientNameValidation(clientName) : ''} <br>
          ${_clientNifValidation(clientNif) ? _clientNifValidation(clientNif) : ''} <br>
          ${_clientContactValidation(clientContact) ? _clientContactValidation(clientContact) : ''} <br>
          ${_CUIDUALValidation(CUIDUAL) ? _CUIDUALValidation(CUIDUAL) : ''} <br>
          ${_CUIValidation(CUIForGas) ? _CUIValidation(CUIForGas) : ''} <br>
          ${_CPEDUALValidation(CPEDUAL) ? _CPEDUALValidation(CPEDUAL) : ''} <br>
          ${_CPEValidation(CPEForElectricity) ? _CPEValidation(CPEForElectricity) : ''} <br>
          ${_observationsValidation(observations) ? _observationsValidation(observations) : ''} <br>
        `,
        icon: 'info'
      }
    )
  )
}

export function _executeValidationsIfHas(
  name='',
  nif='',
  nipc='',
  address='',
  contact='',
  email='',
  zipCode='',
  clientName='',
  clientNif='',
  clientContact='',
  CUIDUAL='',
  CUIForGas='',
  CPEDUAL='',
  CPEForElectricity='',
  observations='',
) {
  if(_hasValidations(
    name,
    nif,
    nipc,
    address,
    contact,
    email,
    zipCode,
    clientName,
    clientNif,
    clientContact,
    CUIDUAL,
    CUIForGas,
    CPEDUAL,
    CPEForElectricity,
    observations
  )) {
    return _executeAllValidations(
      name,
      nif,
      nipc,
      address,
      contact,
      email,
      zipCode,
      clientName,
      clientNif,
      clientContact,
      CUIDUAL,
      CUIForGas,
      CPEDUAL,
      CPEForElectricity,
      observations
    )
  }
}
