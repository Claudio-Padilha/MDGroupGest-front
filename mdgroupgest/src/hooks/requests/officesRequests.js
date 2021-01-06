import axios from 'axios'
import _currentTokenOnRAM from './currentToken';

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
        localStorage.removeItem('offices');
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
        let officesSoFar = JSON.parse(localStorage.getItem('offices'));
        let currentOffices = {...res, ...officesSoFar}
        localStorage.removeItem('offices');
        localStorage.setItem('offices', currentOffices);
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
}