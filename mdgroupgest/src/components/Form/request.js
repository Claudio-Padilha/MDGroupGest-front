import axios from 'axios'
import routes from '../../routes';
import Swal from 'sweetalert2';

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
                    window.localStorage.clear()
                    resolve(res);
                    const user = res?.data;
                    const currentAuthToken = res?.data?.user?.token;

                    if (currentAuthToken) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('currentToken', currentAuthToken)
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
            window.localStorage.clear();
            axios(authOptions)

            .then((res) => {
                resolve(res);
            })
            .catch(error => {
                const message = 'Erro do servidor.';
                reject(message);
            })
        })
    },
    createEmployee: (user) => {
      console.log(user, 'USER REQUEST')
      var currentToken = localStorage.getItem('currentToken');

      var userType = localStorage.getItem('currentUserType');

      return new Promise((resolve, reject) => {

        var employeeRequest = {
            method: 'POST',
            url: `http://127.0.0.1:8000/${userType}/`,
            headers: {
                'Authorization': 'Token ' + currentToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true,
            data: user,
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
        return new Promise((resolve, reject) => {
            console.log("New Contract Payload --> ", data)
            axios.post(`${routes.createEmployee}`, data)
                .then(res => {
                    console.log("RESPONSE --> ", res);
                })
                .catch(error => {
                    console.log("ERROR --> ", error);
                })
        })
    }
}