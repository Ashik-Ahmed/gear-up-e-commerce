import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useDBUser from '../../hooks/useDBUser';
import Loading from '../Shared/Loading/Loading';

const RequireAdmin = ({ children }) => {
    let location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [dbUser, dbLoading] = useDBUser(user.email);

    if (loading || dbLoading) {
        return <Loading />
    }
    // if (dbUser.role !== 'admin') {
    //     toast.warn("Admin Access Required");
    // }
    if (!user || dbUser.role !== 'admin') {
        signOut(auth);
        toast.warn("Admin Access Required");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAdmin;