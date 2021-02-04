import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    let isLogged= false;

    if(localStorage.getItem('token')){
        isLogged = true
    }

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            isLogged ?
                <Component {...props} />
            : <Redirect to="/sign-in" />
        )} />
    );
};

export default PrivateRoute;
