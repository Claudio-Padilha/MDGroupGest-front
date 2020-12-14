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
  createEmployee: (officeID, data) => {

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

    const userObj = {
      office: officeID,
      user: {
        name: data?.name,
        email: data?.email,
        password: "Mdgroup2020@",
        user_type: userTypeBody,
        nif: data?.nif,
        contact: data?.contact,
        address: data?.address,
      }
    }
    
    return new Promise((resolve) => {

      var employeeRequest = {
          method: 'POST',
          url: `http://127.0.0.1:8000/${user_type}/`,
          headers: {
              'Authorization': 'Token ' + _currentTokenOnRAM(),
          },
          json: true,
          data: userObj,
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
      user_type: data?.user_type,
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
      
      var employeeDeleteRequest = {
        method: 'DELETE',
        url: `http://127.0.0.1:8000/${data?.user?.user_type}/`,
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
}