import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {auth} from '../../config/firebase';
import {GoogleAuthProvider, sendEmailVerification, signInWithPopup} from 'firebase/auth';
import logging from '../../config/logging';
import {Paper, Avatar, TextField, Button, Stack, InputAdornment, Typography} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import AuthService from '../../services/auth/auth.service';

const VerifyEmailPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [ticking, setTicking] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (ticking) {
                checkEmailVerified();
                setCount(count + 1);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [count]);

    const checkEmailVerified = () => {
        auth.currentUser?.reload();
        if (auth.currentUser?.emailVerified) {
            setTicking(false);
            navigate('/login');
        }
    };

    const resendEmailVerification = async () => {
        if (auth.currentUser == null) return;

        await sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('controllare la posta');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'orange'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Avatar style={avatarStyle}>
                        <MailOutlinedIcon />
                    </Avatar>
                    <h2>Verifica E-Mail</h2>

                    <strong>La mail di verifica e' stata inviata a: </strong>
                    <span> {auth.currentUser?.email}</span>

                    <Button variant="contained" style={{backgroundColor: 'orange'}} onClick={() => resendEmailVerification()}>
                        Reinvia Email
                    </Button>

                    <Typography>
                        <Link to="/login">Accedi</Link>
                    </Typography>
                </Stack>
            </Paper>
        </>
    );
};

export default VerifyEmailPage;
