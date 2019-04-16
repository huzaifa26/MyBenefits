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
};
const globalHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
let serverUrl = "http://carditapi.hipper.world:8090";
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development"){
  serverUrl = "http://localhost:8090"
} else if (process.env.NODE_ENV === "production"){
  serverUrl = "http://carditapi.hipper.world:8090"
}


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

    console.log(requestOptions);
    return fetch(`${serverUrl}/business/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log(user);
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
    return fetch(`${serverUrl}/business/${user.business_id}`, requestOptions).then(handleResponse);
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
function getRequestByCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request/${code}`, requestOptions).then(handleResponse);
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
    return fetch(`${serverUrl}/business/${user.business_id}/request/redeem`, requestOptions).then(handleResponse);
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

    return fetch(url, requestOptions).then(handleResponse)
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
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions).then(handleResponse);
}
function getBenefitPurchased() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased`, requestOptions).then(handleResponse);
}
function getBenefitUsage() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage`, requestOptions).then(handleResponse)
}
function undoTransaction(type, id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    switch(type) {
      case "purchased":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased/${id}/refund`, requestOptions).then(handleResponse);
      case "usage":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage/${id}/refund`, requestOptions).then(handleResponse);
      default:
        return Promise.reject("Unknown type: " + type);
    }
}

function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        if (!response.ok) {
            // if (response.status === 401) {
            //     // auto logout if 401 response returned from api
            //     logout();
            //     window.location.reload(true);
            // }

            //const error = (data && data.error) || (data && data.message) || response.statusText;
            return Promise.reject(response);
        }

        return data;
    });
}
