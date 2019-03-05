import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    getInfo,
    getRequsts,
    getRequestByCode,
    approveRequestByID,
};
const globalHeaders = {
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*',
};
const serverUrl = "http://localhost:8090";
const test = process.env.NODE_ENV;
console.log("process.env.NODE_ENV");
console.log(process.env.NODE_ENV);


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
function getRequsts() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions).then(handleResponse);
}
function getHistory() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions).then(handleResponse);
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

            const error = (data && data.error) || (data && data.message) || response.statusText;
            return Promise.reject(response);
        }

        return data;
    });
}
