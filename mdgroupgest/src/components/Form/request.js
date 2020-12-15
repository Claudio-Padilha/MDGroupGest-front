import axios from 'axios'
import Swal from 'sweetalert2';
import dataRequests from '../../hooks/requests/dataRequests';
import employeesRequests from '../../hooks/requests/employeesRequests';

function _currentTokenOnRAM() {
  return localStorage.getItem('currentToken');
}

export default {

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
}