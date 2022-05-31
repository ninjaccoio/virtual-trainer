import React, {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../config/firebase';
import logging from '../../config/logging';

interface IAuthRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
    const {children} = props;
    const navigate = useNavigate();

    onAuthStateChanged(auth, (user) => {
        if (!user || !user.emailVerified) {
            navigate('/login');
        }
    });

    return <>{children}</>;
};

export default ProtectedRoute;
