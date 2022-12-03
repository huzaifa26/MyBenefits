export function authHeader() {
    // return authorization header with basic auth credentials
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.access_token) {
        return { 'Authorization': 'Bearer ' + user.access_token };
    } else {
        return {};
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 6dd1e25de7981292365df9a66f81af7fea68eeef
