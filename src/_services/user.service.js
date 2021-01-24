import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getInfo,
    checkInfoAvailable,
    getRequsts,
    getRequestByCode,
    approveRequestByID,
    getBenefitPurchased,
    getBenefitUsage,
    getDailyHistory,
    undoTransaction,
    getBusinessBenefits,
    postAddBenefitToUser,
};
const globalHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
let serverUrl = "https://api.test.mybenefitz.com";
if (process.env.REACT_APP_ENV_TYPE === "test"){
  serverUrl = "https://api.test.mybenefitz.com";
} else if (process.env.REACT_APP_ENV_TYPE === "development"){
  serverUrl = "http://localhost:8090";
} else if (process.env.REACT_APP_ENV_TYPE === "prod"){
  serverUrl = "https://api.mybenefitz.com";
}
console.log("API Path", serverUrl);


function login(email, password) {
    const requestOptions = {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ email, password }),
    };

    return fetch(`${serverUrl}/business/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getInfo() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}`, requestOptions).then(handleResponse).catch(handleError);
}
function checkInfoAvailable() {
    getInfo()
    .then(x => {
      console.log(x)
      return true
    })
    .catch(x => {
      console.log("fail")
      return false
    });
}
function getBusinessBenefits() {
  const requestOptions = {
      method: 'GET',
      headers: {...authHeader(), ...globalHeaders}
  };
  let user = JSON.parse(localStorage.getItem('user'));
  return fetch(`${serverUrl}/business/${user.business_id}/benefit_offer`, requestOptions).then(handleResponse).catch(handleError);
}

function getRequestByCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request/${code}`, requestOptions).then(handleResponse).catch(handleError);
}
function approveRequestByID(reqID, points) {
    let data = {
      "requestId": reqID,
      "pointsToReduce": points,
    }
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), ...globalHeaders},
        body: JSON.stringify(data),
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request/redeem`, requestOptions).then(handleResponse).catch(handleError);
}

function postAddBenefitToUser(benefitOfferId,code, pointsStatus) {
  let data = {
    "benefitOfferId": benefitOfferId,
    "pointsStatus": pointsStatus,
    "code":code,
  }
  const requestOptions = {
      method: 'POST',
      headers: {...authHeader(), ...globalHeaders},
      body: JSON.stringify(data),
  };
  let user = JSON.parse(localStorage.getItem('user'));
  return fetch(`${serverUrl}/business/${user.business_id}/used_benefit`, requestOptions).then(handleResponse);
}

function getDailyHistory(dateRange) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    let url = `${serverUrl}/business/${user.business_id}/benefit/history`
      + `?prevDays=${dateRange.prevDays ? dateRange.prevDays : ""}`
      + `&fromDate=${dateRange.fromDate ? dateRange.fromDate : ""}`
      + `&toDate=${dateRange.toDate ? dateRange.toDate : ""}`;

    return fetch(url, requestOptions).then(handleResponse).catch(handleError)
    .then( res =>{
        var array = [];
        res.purchesed.forEach(purchase => {
          purchase.objectType = "purchased";
          array.push(purchase);
        });
        res.usage.forEach(usage => {
          usage.objectType = "usage";
          array.push(usage);
        });
        res.canceled.forEach(canceled => {
          canceled.objectType = "canceled";
          array.push(canceled);
        });
        array.sort((a, b) => {
            if (a.createDate > b.createDate) return -1;
            if (a.createDate < b.createDate) return 1;
            return 0;
        });

        return array;
    });
}

function getRequsts() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions).then(handleResponse).catch(handleError);
}
function getBenefitPurchased() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased`, requestOptions).then(handleResponse).catch(handleError);
}
function getBenefitUsage() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage`, requestOptions).then(handleResponse).catch(handleError);
}
function undoTransaction(type, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    switch(type) {
      case "purchased":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased/${id}/refund`, requestOptions).then(handleResponse).catch(handleError);
      case "usage":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage/${id}/refund`, requestOptions).then(handleResponse).catch(handleError);
      default:
        return Promise.reject("Unknown type: " + type);
    }
}

function handleResponse(response) {
  console.log("response:", response);
  if (response.status === 401) {
    // auto logout if 401 response returned from api
    logout();
    window.location.reload(true);
  }
  return response.text().then(text => {

      const data = text && JSON.parse(text);
      if (!response.ok) {

          //const error = (data && data.error) || (data && data.message) || response.statusText;
          return Promise.reject(response);
      }

      return data;
  });
}
function handleError(e) {
  console.log("Error:", e);
  return Promise.reject(e);
}
// function handleErrorLogout(e) {
//   console.log("Error:", e);
//   logout();
//   window.location.reload(true);
//   return Promise.reject(e);
// }