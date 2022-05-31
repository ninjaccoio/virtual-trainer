import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Paper, Avatar, TextField, Button, FormControlLabel, FormGroup, Stack, InputAdornment, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import authService from '../../services/auth/auth.service';

const RegisterPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        authService.register(username, email, pwd);

        /*
        logging.info('submit');
        if (email == 'ciao@miao.com') setErrMsg('la cipolla non e verde');
        logging.info(email);
        logging.info(pwd);
        logging.info(rememberMe);
        //setEmail('');
        //setPwd('');
        setRememberMe(false);
        logging.info(errMsg);
        */
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
                            label="Username"
                            variant="outlined"
                            placeholder="Username"
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            placeholder="E-Mail"
                            autoComplete="off"
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

                        <Button type="submit" variant="contained" fullWidth>
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
