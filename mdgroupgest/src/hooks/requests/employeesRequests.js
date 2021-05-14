import axios from 'axios'
import Swal from 'sweetalert2';

import _currentTokenOnRAM from './currentToken';
import dataRequests from './dataRequests';
import { FormField } from 'semantic-ui-react';
import useVPSURL from './defaultVpsURL';

const url = useVPSURL();

export default {
  getAllEmployees: (officeID) => {
    return new Promise((resolve, reject) => {
      var getAllEmployeesRequest = {
        method: 'GET',
        url: `${url}employees/${officeID}`,
        headers: { 
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }
        

      axios(getAllEmployeesRequest)

      .then((res) => {
        localStorage.removeItem('allEmployees');
        localStorage.setItem('allEmployees', JSON.stringify(res.data));
        resolve(res);     
      })

      .catch(error => {
        localStorage.removeItem('allEmployees');
        reject(error);
      })
    })
  },
  getEmployees: (employeeType) => {

    return new Promise((resolve, reject) => {

      var getEmployeesRequest = {
        method: 'GET',
        url: `${url}${employeeType}/`,
        headers: { 
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(getEmployeesRequest)

      .then(res => {      
        localStorage.setItem(`${employeeType}`, JSON.stringify(res.data));
        resolve(res);     
      })

      .catch(error => {
        reject(error);
      })
    })
  },
  getMyTeamResults: () => {
    return new Promise((resolve, reject) => {
      var getMyTeamResults = {
        method: 'GET',
        url: `${url}myTeamResult/`,
        headers: { 
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }
        

      axios(getMyTeamResults)

      .then((res) => {
        localStorage.removeItem('myTeamResults');
        localStorage.setItem('myTeamResults', JSON.stringify(res.data));
        resolve(res);     
      })

      .catch(error => {
        localStorage.removeItem('myTeamResults');
        reject(error);
      })
    })
  },
  createEmployee: (user_type, data) => {

    var userType = localStorage.getItem('currentUserType');
    var userTypeBody = userType

    var user_type = userType === "sales_person" ? "salesPerson" : userType === "team_leader" ? "teamLeader" : userType;
    
    return new Promise((resolve) => {

      var employeeRequest = {
          method: 'POST',
          url: `${url}${user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: data,
          dataType: "json",
          contentType: "application/json"
        };
      axios(employeeRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
        console.log("ERROR =========== ", error)
        resolve(error);
      })
    });
  },
  updateEmployee: (formdFields, data) => {

    const dataToSend = {
      ...formdFields,
      ...data
    }

    var userType = data?.user_type;
    const convertToSalesperson = (userType === "sales_person" || userType === "instructor" || userType === "team_leader")
    var user_type = convertToSalesperson ? "salesPerson" : userType;
    
    return new Promise((resolve, reject) => {

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `${url}${user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: dataToSend,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(employeeUpdateRequest)

      .then(res => {
        resolve(res);
      })
      .catch(error => {
        resolve(error);
      })
    });
  },
  deleteEmployee: (data) => {
    return new Promise((resolve, reject) => {

      var userType = data?.user.user_type;
      const convertToSalesperson = (userType === "sales_person" || userType === "instructor" || userType === "team_leader")
      var user_type = convertToSalesperson ? "salesPerson" : userType;
      
      var employeeDeleteRequest = {
        method: 'DELETE',
        url: `${url}${user_type}/`,
        headers: {
          'Authorization': 'Token ' + _currentTokenOnRAM(),
        },
        data: { id: data?.id },
        json: true,
        dataType: "json",
        contentType: "application/json"
      }

      axios(employeeDeleteRequest)

      .then((res) => {
        resolve(res); 
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  promoteEmployee: (id) => {
    return new Promise((resolve, reject) => {

      var employeePromoteRequest = {
          method: 'POST',
          url: `${url}promote/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          data: {
            employee_id: id
          },
          json: true,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(employeePromoteRequest)

      .then(res => {

        resolve(res)
      })
      .catch(error => {
        resolve(error);
      })
    });
  },

  addPhoto: (data) => {
    return new Promise((resolve, reject) => {

      let user_type_for_route 
      if(data?.user_type === "team_leader") {
        user_type_for_route = "teamLeader"
      } else if(data?.user_type === "sales_person") {
        user_type_for_route ="salesPerson"
      } else {
        user_type_for_route = data?.user_type
      }

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `${url}${user_type_for_route}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: data,
          dataType: "json",
          contentType: "application/json"
        };
      
      axios(employeeUpdateRequest)

      .then(res => {
        localStorage.removeItem('userForPhoto');
        localStorage.setItem('userForPhoto', JSON.stringify(res.data))

        resolve(res)
      })
      .catch(error => {
        resolve(error);
      })
    });
  }
}