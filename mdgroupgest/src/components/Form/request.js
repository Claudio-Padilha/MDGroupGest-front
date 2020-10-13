import axios from 'axios'
import routes from '../../routes';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

function _HandleConfirmLoginAlert() {
  const currentUserOnRAM = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserOnRAM);

  const hasPermission = currentUser?.user?.user_type === "admin";

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn-success',
      cancelButton: 'btn-danger'
    },
    buttonsStyling: true
  })
    return (
      swalWithBootstrapButtons.fire({
        title: 'Você foi autenticado com sucesso!',
        text: hasPermission ? 'Escolha o que quer fazer' : '',
        icon: 'success',
        showCancelButton: true,
        showConfirmButton: hasPermission,
        confirmButtonText: 'Inserir contrato',
        cancelButtonText: 'Ir para dashboard',
        reverseButtons: false
      }).then((result) => {

        // "result.isConfirmed" significa que foi clicado o botão esquerdo do alerta (Inserir contrato)
        if (result.isConfirmed) {
          window.location.assign("/CreateContract");
         
        // "!result.isConfirmed" significa que foi clicado o botão direito do alerta (Ir para dashboard)  
        } else if (!result.isConfirmed) {
          window.location.assign("/BackOffice")
        } else {
          console.log('nothing was choosed')
        }
      })
    ) 
}

function _HandleDeniedLogin() {
  return (
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuário ou senha incorreto(s). Tente de novo.'
    })
  )
}

export default {
  login: (data) => {
      return new Promise((resolve, reject) => {
          console.log("LOGN PAYLOAD: ", data);

          axios.post("http://127.0.0.1:8000/auth/login/", data)

              .then((res) => {
                  resolve(res);
                  const user = res?.data;
                  const currentAuthToken = res?.data?.user?.token;

                  if (currentAuthToken) {
                    // controlar tipos de requests feitos a partir de user type (DASHBOARD VAI PRECISAR DE USER TYPES DIFERENTES) // SWITCH MELHOR MANEIRA*
                      localStorage.setItem('currentUser', JSON.stringify(user));
                      localStorage.setItem('currentToken', currentAuthToken);
                  }
                  const currentUserOnRAM = localStorage.getItem('currentUser');
                  const currentUser = JSON.parse(currentUserOnRAM);

                  if (currentUser !== null && localStorage.length !== 0) {
                    _HandleConfirmLoginAlert()
                  } 
                  if (currentUser === null || user[0] === "invalid credentials") {
                    _HandleDeniedLogin()
                  }           
              })
              .catch(error => {
                  const message = 'Erro do servidor.';
                  reject(message)
              })
      });
  },
  logout: () => {
      return new Promise((resolve, reject) => {   
          var currentToken = localStorage.getItem('currentToken');

          var authOptions = {
              method: 'POST',
              url: 'http://127.0.0.1:8000/auth/token/logout',
              headers: {
                  'Authorization': 'Token ' + currentToken,
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              json: true
            };

          axios(authOptions)

          .then((res) => {
              localStorage.removeItem('myTeam')
              localStorage.removeItem('employeeDetail')
              localStorage.removeItem('currentToken')
              
              
              resolve(res);
          })
          .catch(error => {
              const message = 'Erro do servidor.';
              reject(message);
          })
      })
  },
  createOffice: (data) => {
    var currentToken = localStorage.getItem('currentToken');
    
    const officeObj = {
      name: data?.officeName,
      email: data?.officeEmail,
      nipc: data?.officeNIPC,
      address: data?.officeAddress,
    }
    
    return new Promise((resolve, reject) => {

      var officeRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/office/`,
          headers: {
              'Authorization': 'Token ' + currentToken,
          },
          json: true,
          data: officeObj,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(officeRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
          const message = 'Erro do servidor';
          reject(message);
      })
    });
  },
  createEmployee: (data) => {
    console.log(data, 'USER REQUEST')
    var currentToken = localStorage.getItem('currentToken');

    var userType = localStorage.getItem('currentUserType');
    
    const userObj = {
      office: 1,
      user: {
        name: data?.name,
        email: data?.email,
        password: "123RRRttt",
        user_type: userType,
        nif: data?.nif,
        contact: data?.contact,
        address: data?.address,
      }
    }
    
    return new Promise((resolve, reject) => {

      var employeeRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/${userType}/`,
          headers: {
              'Authorization': 'Token ' + currentToken,
          },
          json: true,
          data: userObj,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(employeeRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
          const message = 'Erro do servidor';
          reject(message);
      })
    });
  },
  createContract: (data) => {
    var currentToken = localStorage.getItem('currentToken');
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var payment = data?.lightPPI ? "Débito Directo" : "Multibanco";
    
    var deliveryDate = data?.deliveryDate.toJSON();
    var deliveryWorkedDate = deliveryDate.substring(0, 9);

    var signatureDate = data?.signatureDate.toJSON();
    var signatureWorkedDate = signatureDate.substring(0, 9);
    
    const contractObj = {
      user: currentUser?.user?.id, // Receber dinamicamente
      delivery_date: deliveryWorkedDate,
      signature_date: signatureWorkedDate,
      employee_name: data?.employeeName,
      client_name: data?.clientName,
      client_nif: data?.clientNif,
      client_contact: data?.clientContact,
      electronic_bill: data?.electronicBill ? data?.electronicBill : false,
      cpe: data?.CPE.toString(),
      electricity_ppi: data?.lightPPI ? data?.lightPPI : false,
      cui: data?.CUI.toString(),
      gas_ppi: data?.gasPPI ? data?.gasPPI : false,
      pel: data?.pel ? data?.pel : false,
      observations: data?.observations,
      employee_comission: data?.comission,
      feedback_call: data?.feedbackCall,
      payment: payment,
      sell_state: data?.sellState,
      power: data?.power,
      gas_scale: data?.gasScale
    }

    return new Promise((resolve, reject) => {

      var contractRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/contract/`,
          headers: {
              'Authorization': 'Token ' + currentToken,
          },
          json: true,
          data: contractObj,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(contractRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
          const message = 'Erro do servidor';
          reject(message);
      })
    });
  },
  getOffices: () => {
    var currentToken = localStorage.getItem('currentToken');

    return new Promise((resolve, reject) => {

      var getOfficesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/office/`,
        headers: {
            'Authorization': 'Token ' + currentToken,
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getOfficesRequest)

      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(error => {
        console.log(error, 'ERRO');
        reject(error);
      })
    }); 
  },
  getEmployees: () => {
    var currentToken = localStorage.getItem('currentToken');

    const employeeType = localStorage.getItem('currentUserType');

    return new Promise((resolve, reject) => {

      var getEmployeesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/secretary/`,
        headers: { 
          'Authorization': 'Token ' + currentToken,
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getEmployeesRequest)

      .then(res => {
        
        localStorage.setItem('myTeam', JSON.stringify(res.data));
        resolve(res);
        
      })

      .catch(error => {
        console.log(error);
        reject(error);
      })
    })
  }
}