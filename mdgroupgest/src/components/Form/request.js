import axios from 'axios'
//import handleAxiosError from 'axiosErrorHandler'
import routes from '../../routes';
// We should import all we need to control the application responsiveness here

export default {
    login: (data) => {
        return new Promise((resolve, reject) => {
            console.log("LOGN PAYLOAD: ", data);
            console.log("ROUTE: ", routes.login_url);
            axios.post(`${routes.login_url}`, data)

                .then((res) => {
                    console.log("RESPONSE: ", res);

                    // HERE WE SHOULD UPDATE FRONTEND'S RESPONSIVE 
                    // STRUCTURE WITH UPDATED DATA FROM DATABASE
            
                    //resolve()
                })
                .catch(error => {
                    console.log("ERRO: ", error);
                    //const message = handleAxiosError(error, 'Erro do servidor ao atualizar caminhão')
                    //reject(message)
                })
        });
    },
    createEmployee: (data) => {
        return new Promise((resolve, reject) => {
            console.log("New Employee Payload --> ", data)
            axios.post(`${routes.createEmployee}`, data)
                .then(res => {
                    console.log("RESPONSE --> ", res);
                })
                .catch(error => {
                    console.log("ERROR --> ", error);
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