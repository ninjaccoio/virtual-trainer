import {Button} from '@mui/material';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Home</h1>
            <Button component={Link} to="profile">
                Vai a Profilo, ho usato il bottone col link
            </Button>
        </div>
    );
};

export default HomePage;
