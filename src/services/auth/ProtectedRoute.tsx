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
        logging.info('onAuthStateChange');

        if (user) {
            logging.info(user.displayName);
        } else {
            logging.info('non sono loggato');
            navigate('/login');
        }
    });

    return <>{children}</>;
};

export default ProtectedRoute;
