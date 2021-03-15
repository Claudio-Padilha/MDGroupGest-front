import _currentTokenOnRAM from './currentToken';
import axios from 'axios';
import dataRequests from './dataRequests';
import useVPSURL from './defaultVpsURL';

const url = useVPSURL();

export default {
  getContracts: (officeId) => { 
    return new Promise((resolve, reject) => {

      var contractRequest = {
          method: 'GET',
          url: `${url}monthContracts/${officeId}`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(contractRequest)

      .then(async res => {
        console.log(res, 'RESPOSTA')
        localStorage.removeItem('contracts', JSON.stringify(res.data))
        localStorage.setItem('contracts', JSON.stringify(await res.data.sort((a, b) => b.id - a.id)))
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
          url: `${url}contracts/`,
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
  updateContract: async (data) => { 

    return new Promise((resolve, reject) => {

      var contractRequest = {
          method: 'PATCH',
          url: `${url}contracts/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          data: data,
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
        url: `${url}contracts/`,
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
              url: `${url}contracts/`,
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