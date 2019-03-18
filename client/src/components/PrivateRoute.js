import { Route } from 'react-router-dom';
import React from 'react';
import { Redirect } from 'react-router';

const PrivateRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        props.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login'/>
    )} />
);

export default PrivateRoute;