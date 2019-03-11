import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

const PrivateRoute = ({component : Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        props.isAuthenticated
        ? <Component {...props} />
        : <Redirect to='/login'/>
        
    )} />
)

export default PrivateRoute