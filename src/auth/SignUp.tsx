import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {Button} from '@mui/material';
import IPageProps from '../interfaces/page.interface';
import logging from '../config/logging';

const SignUpPage: React.FunctionComponent<IPageProps> = (props) => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        const auth = getAuth();
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                logging.info(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                logging.error(error);
                setAuthing(false);
            });
    };

    return (
        <Button onClick={() => signInWithGoogle()} disabled={authing}>
            Sign in with Google
        </Button>
    );
};

export default SignUpPage;
