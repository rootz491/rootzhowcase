import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useUser from '../../hooks/useUser';

const VerifiedRoute = async () => {
    const auth = await useAuth();
    const user = await useUser();
    const verified = user.isVerified;

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return  auth ? verified ? <Outlet /> : <Navigate to="/unverified" /> : <Navigate to="/login" />;
}

export default VerifiedRoute;