import axios from 'axios'
import Swal from 'sweetalert2';

import _currentTokenOnRAM from './currentToken';
import dataRequests from './dataRequests';
import { FormField } from 'semantic-ui-react';
import useVPSURL from './endpoint';

const mdgroupURL = useVPSURL();

export default {
  getAllEmployees: (officeID) => {
    return new Promise((resolve, reject) => {
      var getAllEmployeesRequest = {
        method: 'GET',
        url: `${mdgroupURL}employees/${officeID}`,
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
        url: `${mdgroupURL}${employeeType}/`,
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
  createEmployee: (user_type, data) => {

    var userType = localStorage.getItem('currentUserType');
    var userTypeBody = userType

    var user_type = userType === "sales_person" ? "salesPerson" : userType === "team_leader" ? "teamLeader" : userType;
    
    return new Promise((resolve) => {

      var employeeRequest = {
          method: 'POST',
          url: `${mdgroupURL}${user_type}/`,
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
    var user_type = userType === "sales_person" ? "salesPerson" : userType === "team_leader" ? "teamLeader" : userType;
    console.log(user_type, 'USER TYPE DO UPDATE')
    return new Promise((resolve, reject) => {

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `${mdgroupURL}${user_type}/`,
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

      function _userTypeCamelCase() {
        if(data?.user?.user_type === "team_leader") {
          return "teamLeader"
        } else if(data?.user?.user_type === "sales_person") {
          return "salesPerson"
        } else {
          return data?.user?.user_type
        }
      }
      
      var employeeDeleteRequest = {
        method: 'DELETE',
        url: `${mdgroupURL}${_userTypeCamelCase()}/`,
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
          url: `${mdgroupURL}${user_type_for_route}/`,
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