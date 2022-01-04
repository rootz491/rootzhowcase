import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function PrivateRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    return (
        <Route {...rest} render = {props => (
            auth ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
        )} />
    )
}