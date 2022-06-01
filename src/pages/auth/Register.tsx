import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Paper, Avatar, TextField, Button, Stack, InputAdornment, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import AuthService from '../../services/auth/auth.service';

const RegisterPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [rePwd, setRePwd] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState('');
    const [errPwdMsg, setErrPwdMsg] = useState('');

    useEffect(() => {
        setErrEmailMsg('');
        setErrPwdMsg('');
    }, [email, pwd]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        setErrEmailMsg('');
        setErrPwdMsg('');

        if (pwd === rePwd) {
            const res = await AuthService.register(email, pwd);

            if (res.success) {
                setEmail('');
                setPwd('');
                setRePwd('');
                navigate('/verify-email');
            } else {
                if (res.target === 'email') setErrEmailMsg(res.error);
                if (res.target === 'pwd') setErrPwdMsg(res.error);
            }
        } else setErrPwdMsg('Le Password non sono uguali');

        setLoading(false);
    };

    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'red'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Register</h2>

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

                        <TextField
                            label="Conferma Password"
                            variant="outlined"
                            type="password"
                            placeholder="Conferma Password"
                            error={errPwdMsg !== ''}
                            helperText={errPwdMsg !== '' ? errPwdMsg : ''}
                            onChange={(e) => setRePwd(e.target.value)}
                            value={rePwd}
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
                            Registrati
                        </Button>

                        <Typography>
                            {' '}
                            hai gia' un account?
                            <Link to="/login">accedi</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default RegisterPage;
