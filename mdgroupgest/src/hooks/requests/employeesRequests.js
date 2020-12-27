import axios from 'axios'
import Swal from 'sweetalert2';

import _currentTokenOnRAM from './currentToken';

export default {
  getAllEmployees: (officeID) => {
    return new Promise((resolve, reject) => {
      var getAllEmployeesRequest = {
        method: 'GET',
        url: `http://127.0.0.1:8000/employees/${officeID}`,
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
        url: `http://127.0.0.1:8000/${employeeType}/`,
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
    
    // function _getUserType() {
    //   if (userType === "sales_person") {
    //     return "salesPerson"
    //   } else if (userType === "team_leader") {
    //     return "teamLeader"
    //   } else {
    //     return userType
    //   }
    // }

    // const userObj = {
    //   office: officeID,
    //   // manager: , TENDO EM CONSIDERAÇÃO AS ASSOCIAÇÕES CORRETAS
    //   // team_leader: ,
    //   // instructor: ,
    //   user: {
    //     name: data?.name,
    //     email: data?.email,
    //     password: "Mdgroup2020@",
    //     user_type: userTypeBody,
    //     nif: data?.nif,
    //     contact: data?.contact,
    //     address: data?.address,
    //     is_admin: false
    //   }
    // }
    
    return new Promise((resolve) => {

      var employeeRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/${user_type}/`,
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
        resolve(error);
      })
    });
  },
  updateEmployee: (formFields, data) => {

    const userObj = {
      id: data?.id,
      office: data?.office,
      name: formFields?.name,
      email: formFields?.email,
      employee_type: data?.user_type,
      employee_id: data?.id,
      nif: formFields?.nif,
      contact: formFields?.contact,
      address: formFields?.address,
    }
    
    return new Promise((resolve, reject) => {

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `http://127.0.0.1:8000/${data?.user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: userObj,
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
        url: `http://127.0.0.1:8000/${_userTypeCamelCase()}/`,
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

      console.log(data, "DATA INSIDE REQUEST =============================")

      var employeeUpdateRequest = {
          method: 'PATCH',
          url: `http://127.0.0.1:8000/${data?.user_type}/`,
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

        console.log(res.data, "RESPONSE FROM ADD PHOTO")

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