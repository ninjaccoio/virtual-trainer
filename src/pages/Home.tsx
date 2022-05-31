import {Button} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../config/firebase';
import IPageProps from '../interfaces/page.interface';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <div>
            <h1>Home</h1>
            <h5>Ciao! </h5> <p>{auth.currentUser?.email}</p>
            <Button component={Link} to="profile">
                Vai a Profilo se sei loggato, ho usato il bottone col link
            </Button>
            <Button component={Link} to="/auth/login">
                Vai a login, ho usato il bottone col link
            </Button>
        </div>
    );
};

export default HomePage;
