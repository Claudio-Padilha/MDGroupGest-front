import axios from 'axios'
import Swal from 'sweetalert2';

import _currentTokenOnRAM from './currentToken';
import useVPSURL from './endpoint';

const mdgroupURL = useVPSURL();

export default {
  getFeedbackCall: () => {

    return new Promise((resolve, reject) => {

      var feedbackCallRequest = {
          method: 'GET',
          url: `${mdgroupURL}feedBackCall/`,
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
          url: `${mdgroupURL}sellState/`,
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
          url: `${mdgroupURL}payment/`,
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
  getGasScale: () => {

    return new Promise((resolve, reject) => {

      var gasScaleRequest = {
          method: 'GET',
          url: `${mdgroupURL}gasScale/`,
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
  getPower: () => {

    return new Promise((resolve, reject) => {

      var gasPowerRequest = {
          method: 'GET',
          url: `${mdgroupURL}power/`,
          headers: {
            'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(gasPowerRequest)

      .then(res => {
        localStorage.setItem('powerList', JSON.stringify(res.data)) 
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
        url: `${mdgroupURL}officeGrossBilling/${officeID}`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(officeResultsRequest)

      .then(res => {
        localStorage.removeItem('officeResults')
        localStorage.setItem('officeResults', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  },
  getMySalary: () => {
    return new Promise((resolve, reject) => {

      var mySalaryRequest = {
        method: 'GET',
        url: `${mdgroupURL}myCurrentSalary/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(mySalaryRequest)

      .then(res => {
        localStorage.removeItem('myCurrentSalary')
        localStorage.setItem('myCurrentSalary', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  },

  getMyTeam: (office_id) => {
    return new Promise((resolve) => {

      var myTeamRequest = {
        method: 'GET',
        url: `${mdgroupURL}employees/${office_id}`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(myTeamRequest)

      .then(res => {
        localStorage.removeItem('myTeam')
        localStorage.setItem('myTeam', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  },

  getOfficesResultsByDay: (office_id) => {

    return new Promise((resolve) => {
      var officesResultsByDayRequest = {
        method: 'GET',
        url: `${mdgroupURL}officesResultsByDay/${office_id}`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(officesResultsByDayRequest)
      .then(res => {
        localStorage.removeItem('officeResultsByDay')
        localStorage.setItem('officeResultsByDay', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  },

  getResultsToPresent: () => {

    return new Promise((resolve) => {
      var resultsToPresent = {
        method: 'GET',
        url: `${mdgroupURL}myCurrentResults/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
      };

      axios(resultsToPresent)
      .then(res => {
        localStorage.removeItem('resultsToPresent');
        localStorage.setItem('resultsToPresent', JSON.stringify(res?.data))
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    })
  }

}