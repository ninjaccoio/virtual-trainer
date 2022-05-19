import {Button} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../config/firebase';
import IPageProps from '../interfaces/page.interface';
import {getAuth, signOut} from 'firebase/auth';
import logging from '../config/logging';

const ProfilePage: React.FunctionComponent<IPageProps> = (props) => {
    const navigate = useNavigate();

    const firebaseSignOut = async () => {
        logging.info('LogOut');
        signOut(auth);
        navigate('/auth/signup');
    };

    return (
        <div>
            <h1>Profilo</h1>
            <br />
            <h1>Ho Usato la funzione onClick</h1>
            <Button onClick={() => navigate('/settings')}>Vai a impostazioni, non passo un numero</Button>
            <Button onClick={() => navigate('/settings/69')}>Vai a impostazioni, passo il numero 69</Button>
            <button onClick={() => firebaseSignOut()}>Esci da Firebase se sei loggato</button>
        </div>
    );
};

export default ProfilePage;
