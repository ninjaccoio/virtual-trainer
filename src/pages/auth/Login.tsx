import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Paper, Avatar, TextField, Button, Stack, InputAdornment, Typography, FormLabel} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import AuthService from '../../services/auth/auth.service';

const LoginPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState('');
    const [errPwdMsg, setErrPwdMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
        setErrEmailMsg('');
        setErrPwdMsg('');
    }, [email, pwd]);

    const signInWithGoogle = async () => {
        setLoading(true);

        const res = await AuthService.signInWithGoogle();

        if (res.success) {
            navigate('/');
        } else {
            alert(res.error);
        }

        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrMsg('');
        setErrEmailMsg('');
        setErrPwdMsg('');

        const res = await AuthService.login(email, pwd);

        if (res.success) {
            setErrMsg('');
            setEmail('');
            setPwd('');
            navigate('/');
        } else {
            if (res.target === 'all') setErrMsg(res.error);
            if (res.target === 'email') setErrEmailMsg(res.error);
            if (res.target === 'pwd') setErrPwdMsg(res.error);
        }
        setLoading(false);
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

                        <FormLabel color="error" error={errMsg !== ''}>
                            {errMsg}
                        </FormLabel>

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

                        <Button type="submit" variant="contained" disabled={loading} fullWidth>
                            Login
                        </Button>

                        <Button variant="contained" style={{backgroundColor: 'red'}} startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()} disabled={loading} fullWidth>
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
