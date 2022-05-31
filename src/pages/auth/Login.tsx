import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {auth} from '../../config/firebase';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import logging from '../../config/logging';
import {Paper, Avatar, TextField, Button, Stack, InputAdornment, Typography} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import AuthService from '../../services/auth/auth.service';

const LoginPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [authing, setAuthing] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState('');
    const [errPwdMsg, setErrPwdMsg] = useState('');

    useEffect(() => {
        setErrEmailMsg('');
        setErrPwdMsg('');
    }, [email, pwd]);

    const signInWithGoogle = async () => {
        setAuthing(true);

        const res = await AuthService.signInWithGoogle();
        logging.info(res);

        if (res.success) {
            navigate('/');
        } else {
            alert(res.error);
        }

        setAuthing(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setAuthing(true);

        setErrEmailMsg('');
        setErrPwdMsg('');

        const res = await AuthService.login(email, pwd);
        logging.info(res);

        if (res.success) {
            setEmail('');
            setPwd('');
            navigate('/');
        } else {
            if (res.target === 'email') setErrEmailMsg(res.error);
            if (res.target === 'pwd') setErrPwdMsg(res.error);
        }
        setAuthing(false);
    };

    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'green'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Login</h2>

                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            placeholder="E-Mail"
                            autoComplete="off"
                            error={errEmailMsg !== ''}
                            helperText={errEmailMsg !== '' ? errEmailMsg : ''}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            placeholder="Password"
                            error={errPwdMsg !== ''}
                            helperText={errPwdMsg !== '' ? errPwdMsg : ''}
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            required
                        />

                        <Button type="submit" variant="contained" disabled={authing} fullWidth>
                            Login
                        </Button>

                        <Button variant="contained" style={{backgroundColor: 'red'}} startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()} disabled={authing} fullWidth>
                            Accedi con Google
                        </Button>

                        <Typography>
                            <Link to="/forgot-pwd">password dimenticata?</Link>
                        </Typography>

                        <Typography>
                            {' '}
                            non hai un account?
                            <Link to="/register">crea un account</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default LoginPage;
