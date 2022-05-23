import React from 'react';
import {useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Button} from '@mui/material';

const RegisterPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <>
            <h1>Register Page</h1>
            <Button onClick={goBack}> INDIETRO </Button>
        </>
    );
};

export default RegisterPage;
