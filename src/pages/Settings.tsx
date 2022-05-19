import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Button} from '@mui/material';
import IPageProps from '../interfaces/page.interface';

const SettingsPage: React.FunctionComponent<IPageProps> = (props) => {
    const [message, setMessage] = useState('');
    const {number} = useParams();
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (number) {
            setMessage('Ho passato il numero ' + number);
        } else {
            setMessage('Non ho passato nessun numero');
        }
    }, []);

    return (
        <div>
            <Button onClick={goBack}> INDIETRO </Button>
            <h1>Impostazioni</h1>
            <h1>{message}</h1>
        </div>
    );
};

export default SettingsPage;
