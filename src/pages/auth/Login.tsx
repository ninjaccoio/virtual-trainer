import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {auth} from '../../config/firebase';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import logging from '../../config/logging';
import {Paper, Avatar, TextField, Button, FormControlLabel, FormGroup, Stack, InputAdornment, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
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
    const paperStyle = {padding: 20, heigth: 'auto', width: '100%', maxwidth: '200px', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'green'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Login</h2>

                    <TextField
                        label="Email"
                        variant="outlined"
                        placeholder="E-Mail"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        placeholder="Password"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                    />

                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="Ricordami" />
                    </FormGroup>
                    <Button type="submit" variant="contained" fullWidth>
                        Login
                    </Button>
                    <Button variant="contained" style={{backgroundColor: 'red'}} startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()} disabled={authing} fullWidth>
                        Sign in with Google
                    </Button>
                    <Typography>
                        <Link to="#">password dimenticata?</Link>
                    </Typography>
                    <Typography>
                        {' '}
                        non hai un account?
                        <Link to="/register">clicca qui</Link>
                    </Typography>
                </Stack>
            </Paper>
        </>
    );
};

export default LoginPage;
