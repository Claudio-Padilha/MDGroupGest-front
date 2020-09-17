import axios from 'axios'
//import handleAxiosError from 'axiosErrorHandler'
import routes from '../../routes';
// We should import all we need to control the application responsiveness here

export default {
    login: (data) => {
        return new Promise((resolve, reject) => {
            console.log("LOGN PAYLOAD: ", data)
            console.log("ROUTE: ", routes.login_url)
            axios.post(`${routes.login_url}`, data)

                .then((res) => {
                    console.log("RESPONSE: ", res)

                    // HERE WE SHOULD UPDATE FRONTEND'S RESPONSIVE 
                    // STRUCTURE WITH UPDATED DATA FROM DATABASE
            
                    //resolve()
                })
                .catch(error => {
                    console.log("ERRO: ", error)
                    //const message = handleAxiosError(error, 'Erro do servidor ao atualizar caminhão')
                    //reject(message)
                })
        })
    },
}