import {Button} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import logging from '../config/logging';
import IPageProps from '../interfaces/page.interface';

const HomePage: React.FunctionComponent<IPageProps> = (props) => {
    return (
        <div>
            <h1>Home</h1>
            <Button component={Link} to="profile">
                Vai a Profilo se sei loggato, ho usato il bottone col link
            </Button>
            <Button component={Link} to="/auth/signup">
                Vai a login, ho usato il bottone col link
            </Button>
        </div>
    );
};

export default HomePage;
