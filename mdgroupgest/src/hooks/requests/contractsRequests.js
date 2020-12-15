import _currentTokenOnRAM from './currentToken';
import axios from 'axios';

export default {
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
}