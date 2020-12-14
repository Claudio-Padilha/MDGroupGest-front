import _currentTokenOnRAM from './currentToken';

export default {
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
  getOfficeResults: (officeID) => {
    return new Promise((resolve, reject) => {
      
      var officeResultsRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/officeGrossBilling/${officeID}`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(officeResultsRequest)

      .then(res => {
        localStorage.setItem('officeResults', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  },
}