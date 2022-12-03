import { authHeader } from '../_helpers';

export const userService = {
<<<<<<< HEAD
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
=======
    logout, // done
    getInfo,
    checkInfoAvailable,
    getRequsts,
    getRequestByCode, // done
    approveRequestByID, // done
    getBenefitPurchased, // Not used
    getBenefitUsage,  // Not used
    getDailyHistory, // done
    undoTransaction, // done
    allBusinessBenefitOffer,
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
    postAddBenefitToUser,
};
const globalHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};
<<<<<<< HEAD
let serverUrl = "https://api.test.mybenefitz.com";
=======
// let serverUrl = "http://localhost:8090";
let serverUrl = "https://api.test.mybenefitz.com";
// let serverUrl = "https://api.mybenefitz.com";

>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
if (process.env.REACT_APP_ENV_TYPE === "test"){
  serverUrl = "https://api.test.mybenefitz.com";
} else if (process.env.REACT_APP_ENV_TYPE === "development"){
  serverUrl = "http://localhost:8090";
} else if (process.env.REACT_APP_ENV_TYPE === "prod"){
  serverUrl = "https://api.mybenefitz.com";
}
console.log("API Path", serverUrl);

<<<<<<< HEAD

function login(email, password) {
=======
async function allBusinessBenefitOffer() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
    return fetch(`${serverUrl}/admin/business/${user.business_id}/benefit_offer`, requestOptions)
    .then(res => res.json())
    .then(res => {return res})
    .catch(err => {return err});
}

// function approveRequestByID(reqID, points) {
  //   let data = {
    //     "requestId": reqID,
//     "pointsToReduce": points,
//   }
//   const requestOptions = {
//       method: 'POST',
//       headers: {...authHeader(), ...globalHeaders},
//       body: JSON.stringify(data),
//   };
//   let user = JSON.parse(localStorage.getItem('user'));
//   return fetch(`${serverUrl}/admin/club`, requestOptions)
//   .then(response => response.json())
//   .then(user => {
//       resolve(JSON.stringify(user));
//   }).catch((err)=>{
//     console.log(err)
//   })
// }


export const addBenefit= async ({benefitOfferId,pointsStatus,code})=>{
  const requestOptions = {
    method: 'POST',
    headers: {...authHeader(), ...globalHeaders},
    body: JSON.stringify({benefitOfferId,pointsStatus,code}),
};

  let user=localStorage.getItem("user");
  user=JSON.parse(user);

  return fetch(`${serverUrl}/business/${user.business_id}/used_benefit`, requestOptions)
  .then(response => response.json())
  .then(user => {
      return(JSON.stringify(user));
  }).catch(handleError)
}


// Add club // POSTMAN
export const registerUser= async ({name,description,phoneNum,email,website,extraInfo,type,smallLogoUrl,largeLogoUrl})=>{
  const requestOptions = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({name,description,phoneNum,email,website,extraInfo,type,smallLogoUrl,largeLogoUrl}),
  };

  return fetch(`${serverUrl}/admin/club`, requestOptions)
  .then(response => response.json())
  .then(user => {
      return(JSON.stringify(user));
  }).catch((err)=>{
    console.log(err)
  })
}

export const clubOffer= ({price,points,possiblePurchases,discountAmount,smallPicturlUrl,largePicturlUrl,type,description,longDescription})=>{
  const requestOptions = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({price,points,possiblePurchases,discountAmount,smallPicturlUrl,largePicturlUrl,type,description,longDescription}),
  };

  const clubId=JSON.parse(localStorage.getItem("clubId"));

  return new Promise(resolve => {
    fetch(`${serverUrl}/admin/club/${clubId.id}/benefit_offer`, requestOptions)
    .then(handleResponse)
    .then(benefit => {
        resolve(JSON.stringify(benefit));
    }).catch((err)=>{
      console.log(err)
    })
  });
}

export const brandInfo= (data)=>{
  const requestOptions = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
  };
  return new Promise((resolve,reject)=>{
    fetch(`${serverUrl}/admin/business`, requestOptions)
      .then(handleResponse)
      .then(res => {
        resolve(JSON.stringify(res));
      }).catch((err)=>{
        reject(err)
      })
  })
}

export const addbusinessToClub= ({id})=>{
  const requestOptions = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({id}),
  };

  const clubId=JSON.parse(localStorage.getItem("clubId"));

  return new Promise((resolve,reject) => {
    fetch(`${serverUrl}/admin/club/${clubId.id}/business`, requestOptions)
    .then(handleResponse)
    .then(brand => {
      resolve(JSON.stringify(brand));
    }).catch((err)=>{
      reject(err)
    })
  });
}

// Add Brand //POSTMAN
export const addBrand= async ({name,description,logoUrl})=>{
  const requestOptions = {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({name,description,logoUrl}),
  };

  return fetch(`${serverUrl}/admin/brand`, requestOptions)
    .then((res)=>res.json())
    .then(res=>{return res})
    .catch(err=>{return err})
}

export function login(email, password) {
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
        .then(handleResponse)
=======
        .then(response => response.json())
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
    return fetch(`${serverUrl}/business/${user.business_id}`, requestOptions).then(handleResponse).catch(handleError);
}
=======
    return fetch(`${serverUrl}/business/${user.business_id}`, requestOptions).then((res)=>res.json())
    .then(res=>{return res})
    .catch(err=>{return err})
}


>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
function getBusinessBenefits() {
  const requestOptions = {
      method: 'GET',
      headers: {...authHeader(), ...globalHeaders}
  };
  let user = JSON.parse(localStorage.getItem('user'));
  return fetch(`${serverUrl}/business/${user.business_id}/benefit_offer`, requestOptions).then(handleResponse).catch(handleError);
}
=======
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef

function getRequestByCode(code) {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(), ...globalHeaders}
    };
    let user = JSON.parse(localStorage.getItem('user'));
<<<<<<< HEAD
    return fetch(`${serverUrl}/business/${user.business_id}/request/${code}`, requestOptions).then(handleResponse).catch(handleError);
}
function approveRequestByID(reqID, points) {
=======
    return fetch(`${serverUrl}/business/${user.business_id}/request/${code}`, requestOptions)
    .then(response => response.json())
    .then(response => {return response})
}

async function approveRequestByID(reqID, points) {
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
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
=======
    return fetch(`${serverUrl}/business/${user.business_id}/request/redeem`, requestOptions)
    .then(res=>res.json())
    .then(res=>{return res})
    .catch(err => console.log(err))
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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

<<<<<<< HEAD
    return fetch(url, requestOptions).then(handleResponse).catch(handleError)
=======
    return fetch(url, requestOptions).then(response => response.json())
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions).then(handleResponse).catch(handleError);
=======
    return fetch(`${serverUrl}/business/${user.business_id}/request`, requestOptions)
    .then(res => res.json())
    .then(res => {return res})
    .catch(err => {return err});
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased/${id}/refund`, requestOptions).then(handleResponse).catch(handleError);
      case "usage":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage/${id}/refund`, requestOptions).then(handleResponse).catch(handleError);
=======
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_purchased/${id}/refund`, requestOptions)
        .then(response => response.json())
        .then(response => {return response})
      case "usage":
        return fetch(`${serverUrl}/business/${user.business_id}/benefit_usage/${id}/refund`, requestOptions)
        .then(response => response.json())
        .then(response => {return response})
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
      default:
        return Promise.reject("Unknown type: " + type);
    }
}

function handleResponse(response) {
  console.log("response:", response);
  if (response.status === 401) {
    // auto logout if 401 response returned from api
<<<<<<< HEAD
    logout();
    window.location.reload(true);
=======
    // logout();
    // window.location.reload(true);
  }

  if (response.status === 409) {

>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
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
<<<<<<< HEAD
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
=======

function postAddBenefitToUser(benefitOfferId, pointsStatus, code) {
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
  console.log(user.business_id)
  return fetch(`${serverUrl}/business/${user.business_id}/used_benefit`, requestOptions)
  .then(response => response.json())
  .then(response => {return response})
}

function handleError(e) {
  console.log("Error:", e);
  // logout();
  // window.location.reload(true);
  return Promise.reject(e);
}
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
