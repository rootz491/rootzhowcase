import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

export default function VerifiedRoute({ component: Component, ...rest }) {
    const auth = useAuth();
    const user = useUser();
    const isVerified = auth && user.isVerified;

    return (
        <Route {...rest} render = {props => (
            auth ? (
                isVerified ? 
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname: '/unverified' }} />
            ) : (
                <Redirect to={{ pathname: '/login' }} />
            )
        )} />
    )
}