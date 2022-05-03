import {Button} from '@mui/material';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Profilo</h1>
            <br />
            <h1>Ho Usato la funzione onClick</h1>
            <Button onClick={() => navigate('/settings')}>Vai a impostazioni, non passo un numero</Button>
            <Button onClick={() => navigate('/settings/69')}>Vai a impostazioni, passo il numero 69</Button>
        </div>
    );
};

export default ProfilePage;
