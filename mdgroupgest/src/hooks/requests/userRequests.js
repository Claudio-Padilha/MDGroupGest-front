import axios from 'axios';
import Swal from 'sweetalert2';

import _currentTokenOnRAM from './currentToken';
import dataRequests from '../../hooks/requests/dataRequests';
import employeesRequests from '../../hooks/requests/employeesRequests';

function _firstTimeOfAnUser(user_id) {
  return (
    Swal.fire({
      title: 'Bem vindo(a), escolha uma password.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      confirmButtonText: 'Confirmar',
      allowOutsideClick: false,
      preConfirm: (data) => {

          return axios.post("http://127.0.0.1:8000/auth/definePassword/", {password: data, id: user_id}, {Authorization: 'Token ' + _currentTokenOnRAM()})
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
          }
      }
  ))
}

function _HandleConfirmLoginAlert() {
  const currentUserOnRAM = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserOnRAM);

  const hasPermission = currentUser?.user?.user_type === "manager";

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
      }).then(async (result) => {
        await dataRequests.getMySalary()
        await dataRequests.getOfficeResults(currentUser?.user?.office)
        await employeesRequests.getAllEmployees(currentUser?.user?.office)
        // "result.isConfirmed" significa que foi clicado o botão esquerdo do alerta (Inserir contrato)
        if (result.isConfirmed) {
          window.location.assign("/ChooseTypeOfContract");
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
              if(res?.data?.user?.last_login === null) {
                _firstTimeOfAnUser(res.data.user.id)
              } else {
          
              
                resolve(res);
                console.log(res, 'RESPOSTA DO LOGIN')
                const user = res?.data;

                if (user[0] === "invalid credentials") {
                  _HandleDeniedLogin()
                }
                
                const currentAuthToken = res?.data?.user?.token;

                if (currentAuthToken) {
                  localStorage.setItem('userForPhoto', JSON.stringify(user));
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  localStorage.setItem('currentToken', currentAuthToken);
                  localStorage.setItem('isAdmin', JSON.stringify(user.user?.is_admin));

                  dataRequests.getOfficesResultsByDay(user?.user?.office)

                  return new Promise((resolve, reject) => {

                    const officeID = user?.user?.office

                    var contractRequest = {
                        method: 'GET',
                        url: `http://127.0.0.1:8000/monthContracts/${officeID}`,
                        headers: {
                            'Authorization': 'Token ' + _currentTokenOnRAM(),
                        },
                      };
                    
                    axios(contractRequest)
              
                    .then(res => {
                      localStorage.setItem('contracts', JSON.stringify(res.data))
                      _HandleConfirmLoginAlert()
                      resolve(res);
                    })
                    .catch(error => {
                        
                        reject(error);
                    })
                  });
                }
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
}