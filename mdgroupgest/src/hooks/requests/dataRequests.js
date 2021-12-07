import axios from 'axios'

import _currentTokenOnRAM from './currentToken'
import useVPSURL from './defaultVpsURL'

const url = useVPSURL()

export default {
  getFeedbackCall:  () => {

    return new Promise((resolve, reject) => {

      var feedbackCallRequest = {
          method: 'GET',
          url: `${url}feedBackCall/`,
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
          url: `${url}sellState/`,
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
          url: `${url}payment/`,
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
          url: `${url}gasScale/`,
          headers: {
            'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(gasScaleRequest)

      .then(res => {

        const gasScaleArr = res?.data
        let gasScalesListCondominium = []
        let gasScalesList = []

        for (let i = 0; i < gasScaleArr?.length; i++ ) {
          if (gasScaleArr[i]?.is_condominium) {
            gasScalesListCondominium.push(gasScaleArr[i])
          } else {
            gasScalesList.push(gasScaleArr[i])
          }
        }
        
        localStorage.setItem('gasScalesCond', JSON.stringify(gasScalesListCondominium)) 
        localStorage.setItem('gasScales', JSON.stringify(gasScalesList)) 
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
          url: `${url}power/`,
          headers: {
            'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
        };
      
      axios(gasPowerRequest)

      .then(res => {
        const powerArr = res?.data
        let powersListCondominium = []
        let powersList = []

        for (let i = 0; i < powerArr?.length; i++ ) {
          if (powerArr[i]?.is_condominium) {
            powersListCondominium.push(powerArr[i])
          } else {
            powersList.push(powerArr[i])
          }
        }
        
        localStorage.setItem('powerListCond', JSON.stringify(powersListCondominium)) 
        localStorage.setItem('powerList', JSON.stringify(powersList)) 
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
        url: `${url}officeGrossBilling/${officeID}`,
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
        url: `${url}myCurrentSalary/`,
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
        url: `${url}employees/${office_id}`,
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
        url: `${url}officesResultsByDay/${office_id}`,
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
        url: `${url}myCurrentResults/`,
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