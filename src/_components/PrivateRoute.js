import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { userService } from '../_services';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        (localStorage.getItem('user'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

// if (localStorage.getItem('user') && userService.checkInfoAvailable()){
//   <Component {...props} />
// } else {
//   <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
// }}

PrivateRoute.propTypes = {
  location: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};
