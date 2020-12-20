import _currentTokenOnRAM from './currentToken';
import axios from 'axios';
import dataRequests from './dataRequests';

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
  updateContract: (contractID) => {
    dataRequests.getSellState()

    const sellStates = JSON.parse(localStorage.getItem('sellStates'))
    console.log(sellStates, 'TESTE')
    const sellStateOK = sellStates?.filter(sellState => {
      return sellState?.name === "ok"
    });
    
    const sellStateID = sellStateOK[0]?.id;

    return new Promise((resolve, reject) => {

      var contractRequest = {
          method: 'PATCH',
          url: `http://127.0.0.1:8000/contracts/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          data: { id: contractID, sell_state: sellStateID },
          json: true,
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
        url: `http://127.0.0.1:8000/contracts/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        data: {contract : id}
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