import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";
//import { userService } from '../_services';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    localStorage.getItem("user") 
    ? <Component {...props} /> 
    : <Navigate to={{ pathname: "/login" }} replace />
  );
};
// if (localStorage.getItem('user') && userService.checkInfoAvailable()){
//   <Component {...props} />
// } else {
//   <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
// }}

// : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />

PrivateRoute.propTypes = {
  //location: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
