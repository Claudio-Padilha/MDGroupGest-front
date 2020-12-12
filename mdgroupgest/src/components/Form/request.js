import axios from 'axios'
import Swal from 'sweetalert2';

function _currentTokenOnRAM() {
  return localStorage.getItem('currentToken');
}

function _firstTimeOfAnUser() {
  return (
    Swal.fire({
      title: 'Bem vindo(a), escolha uma password.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      showLoaderOnConfirm: true,
      preConfirm: (data) => {
        return axios.patch("http://127.0.0.1:8000/auth/login/")
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        _HandleConfirmLoginAlert()
      }
    })
  )
}

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

          axios.post("http://127.0.0.1:8000/auth/login/", data)

              .then((res) => {
                  resolve(res);
                  console.log(res, 'RESPOSTA DO LOGIN')
                  const user = res?.data;

                  if (user[0] === "invalid credentials") {
                    _HandleDeniedLogin()
                  }
                  
                  const currentAuthToken = res?.data?.user?.token;

                  if (currentAuthToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentToken', currentAuthToken);



                    return new Promise((resolve, reject) => {

                      //const officeID = user?.user?.office

                      var contractRequest = {
                          method: 'GET',
                          url: `http://127.0.0.1:8000/contracts/`,
                          headers: {
                              'Authorization': 'Token ' + _currentTokenOnRAM(),
                          },
                        };
                      
                      axios(contractRequest)
                
                      .then(res => {
                        if(res?.data?.user?.last_login === null) {
                          _firstTimeOfAnUser()
                        } else {
                          localStorage.setItem('contracts', JSON.stringify(res.data))
                          _HandleConfirmLoginAlert()
                        }
                        resolve(res);
                      })
                      .catch(error => {
                          
                          reject(error);
                      })
                    });
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

          var authOptions = {
              method: 'POST',
              url: 'http://127.0.0.1:8000/auth/token/logout',
              headers: {
                  'Authorization': 'Token ' + _currentTokenOnRAM(),
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              json: true
            };

          axios(authOptions)

          .then((res) => {
              window.localStorage.clear();

              
              // localStorage.removeItem('myTeam')
              // localStorage.removeItem('employeeDetail')
              // localStorage.removeItem('currentToken')
              

              resolve(res);
          })
          .catch(error => {
              const message = 'Erro do servidor.';
              reject(message);
          })
      })
  },

  getOffices: () => {

    return new Promise((resolve, reject) => {

      var getOfficesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/office/`,
        headers: {
            'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getOfficesRequest)

      .then(res => {
        localStorage.setItem('offices', JSON.stringify(res.data));
        resolve(res);
      })
      .catch(error => {
        reject(error);
      })
    }); 
  },
  getOffice: (officeID) => {

    return new Promise((resolve, reject) => {

      var getOfficeRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/office/${officeID}`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getOfficeRequest)

      .then(res => {
        localStorage.setItem('currentOffice', JSON.stringify(res.data));
        resolve(res);
      })
      .catch(error => {
        reject(error);
      })
    }); 
  },
  createOffice: (data) => {
    
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
              'Authorization': 'Token ' + _currentTokenOnRAM(),
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
  // updateOffice: (data) => {

  //   const officeObj = {
  //     name: data?.officeName,
  //     email: data?.officeEmail,
  //     nipc: data?.officeNIPC,
  //     address: data?.officeAddress,
  //   }

  //   return new Promise((resolve, reject) => {
      
  //     var officeUpdateRequest = {
  //       method: 'PATCH',
  //       url: `http://127.0.0.1/office/${data?.id}/`,
  //       headers: {
  //         'Authorization': 'Token ' + _currentTokenOnRAM(),
  //       },
  //       json: true,
  //       data: officeObj,
  //       dataType: "json",
  //       contentType: "application/json"
  //     }

  //     axios(officeUpdateRequest)

  //     .then(res => {
  //       resolve(res);
  //     })
  //     .catch(err => {
  //       reject(err);
  //     })
  //   })
  // },
  deleteOffice: () => {

    return new Promise((resolve, reject) => {
      
      var officeDeleteRequest = {
        method: 'DELETE',
        url: `http://127.0.0.1/office/`, // id provavelmente
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(officeDeleteRequest)

      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getAllEmployees: (officeID) => {
    return new Promise((resolve, reject) => {
      var getAllEmployeesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/employees/${officeID}`,
        headers: { 
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }
        

      axios(getAllEmployeesRequest)

      .then((res) => {
        localStorage.removeItem('allEmployees'); 
        localStorage.setItem('allEmployees', JSON.stringify(res.data));
        resolve(res);     
      })

      .catch(error => {
        localStorage.removeItem('allEmployees');
        reject(error);
      })
    })
  },

  getEmployees: (employeeType) => {

    return new Promise((resolve, reject) => {

      var getEmployeesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/${employeeType}/`,
        headers: { 
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getEmployeesRequest)

      .then(res => {      
        localStorage.setItem(`${employeeType}`, JSON.stringify(res.data));
        resolve(res);     
      })

      .catch(error => {
        reject(error);
      })
    })
  },
  createEmployee: (officeID, data) => {

    var userType = localStorage.getItem('currentUserType');
    console.log(userType, 'userType')
    var userTypeBody = userType

    var user_type = userType === "sales_person" ? "salesPerson" : userType === "team_leader" ? "teamLeader" : userType;
    
    // function _getUserType() {
    //   if (userType === "sales_person") {
    //     return "salesPerson"
    //   } else if (userType === "team_leader") {
    //     return "teamLeader"
    //   } else {
    //     return userType
    //   }
    // }

    const userObj = {
      office: officeID,
      user: {
        name: data?.name,
        email: data?.email,
        password: "Mdgroup2020@",
        user_type: userTypeBody,
        nif: data?.nif,
        contact: data?.contact,
        address: data?.address,
      }
    }
    
    return new Promise((resolve) => {

      var employeeRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/${user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
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
        resolve(error);
      })
    });
  },
  updateEmployee: (formFields, data) => {
    console.log(formFields, 'form fields')
    console.log(data, 'data from update employee')

    const userObj = {
      id: data?.id,
      office: data?.office,
      name: formFields?.name,
      email: formFields?.email,
      user_type: data?.user_type,
      nif: formFields?.nif,
      contact: formFields?.contact,
      address: formFields?.address,
    }
    
    return new Promise((resolve, reject) => {

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `http://127.0.0.1:8000/${data?.user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: userObj,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(employeeUpdateRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
          const message = 'Erro do servidor';
          reject(message);
      })
    });
  },
  deleteEmployee: (data) => {
    return new Promise((resolve, reject) => {
      
      var employeeDeleteRequest = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000/${data?.user?.user_type}/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        data: { id: data?.id },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(employeeDeleteRequest)

      .then((res) => {
        resolve(res); 
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getContracts: () => {
    
    return new Promise((resolve, reject) => {

      var contractRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/contracts/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(contractRequest)

      .then(res => {
        console.log(res, 'res do contrato')
        localStorage.setItem('contracts', JSON.stringify(res.data))
        resolve(res);
      })
      .catch(error => {
        
        reject(error);
      })
    });
  },
  createContract: (data) => {
    console.log(data, 'TESTE PARA VER SE TÁ CERTO')
    
    return new Promise((resolve) => {

      var contractRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/contracts/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: data,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(contractRequest)

      .then(res => {
        let contractsSoFar = JSON.parse(localStorage.getItem('contracts'));
        let currentContracts = {...res, ...contractsSoFar}
        localStorage.removeItem('contracts');
        localStorage.setItem('contracts', currentContracts);
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    });
  },
  updateContract: (data) => {
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
          method: 'PATCH',
          url: `http://127.0.0.1:8000/contracts/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: contractObj,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(contractRequest)

      .then(res => {
        let contractsSoFar = JSON.parse(localStorage.getItem('contracts'));
        let currentContracts = {...res, ...contractsSoFar}
        localStorage.removeItem('contracts');
        localStorage.setItem('contracts', currentContracts);
        resolve(res);
      })
      .catch(error => {
        reject(error);
      })
    });
  },
  deleteContract: (id) => {
    return new Promise((resolve, reject) => {
      
      var contractDeleteRequest = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000/contract/${id}/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      }

      axios(contractDeleteRequest)

      .then(res => {
        resolve(res);
        return new Promise((resolve, reject) => {

          var contractRequest = {
              method: 'GET',
              url: `http://127.0.0.1:8000/contracts/`,
              headers: {
                  'Authorization': 'Token ' + _currentTokenOnRAM(),
              },
            };
          
          axios(contractRequest)
    
          .then(res => {
            localStorage.removeItem('contracts')
            localStorage.setItem('contracts', JSON.stringify(res.data))
            resolve(res);
          })
          .catch(error => {  
            reject(error);
          })
        });
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getFeedbackCall: () => {

    return new Promise((resolve, reject) => {

      var feedbackCallRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/feedBackCall/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(feedbackCallRequest)

      .then(res => {
        localStorage.setItem('feedbackCalls', JSON.stringify(res.data))
        resolve(res);
      })
      .catch(error => {  
        reject(error);
      })
    });
  },
  getSellState: () => {

    return new Promise((resolve, reject) => {

      var sellStateRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/sellState/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(sellStateRequest)

      .then(res => {
        localStorage.setItem('sellStates', JSON.stringify(res.data))
        resolve(res);
      })
      .catch(error => { 
        reject(error);
      })
    });
  },
  getSpecificSellState: (id) => {

    return new Promise((resolve, reject) => {

      var sellStateSpecificRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/sellState/${id}`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(sellStateSpecificRequest)

      .then(res => {
        localStorage.setItem('specificSellState', JSON.stringify(res?.data?.name))
        resolve(res)
      })
      .catch(error => { 
        reject(error);
      })
    });
  },
  getPayment: () => {

    return new Promise((resolve, reject) => {

      var paymentsRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/payment/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(paymentsRequest)

      .then(res => {
        localStorage.setItem('payments', JSON.stringify(res.data))
        resolve(res);
      })
      .catch(error => {  
        reject(error);
      })
    });
  },
  // here we gonna have getPower()
  getGasScale: () => {

    return new Promise((resolve, reject) => {

      var gasScaleRequest = {
          method: 'GET',
          url: `http://127.0.0.1:8000/gasScale/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(gasScaleRequest)

      .then(res => {
        localStorage.setItem('gasScales', JSON.stringify(res.data))
        resolve(res);
      })
      .catch(error => { 
        reject(error);
      })
    });
  },
}