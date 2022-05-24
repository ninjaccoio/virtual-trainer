import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {auth} from '../../config/firebase';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import logging from '../../config/logging';
import {Box, Paper, Avatar, TextField, Button, FormControlLabel, FormGroup, Stack, InputAdornment, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
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
    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'green'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <form>
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
                                        <MailOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            fullWidth
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
                            fullWidth
                        />

                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} label="Ricordami" />
                        </FormGroup>
                        <Button type="submit" variant="contained" fullWidth>
                            Login
                        </Button>

                        <Button variant="contained" style={{backgroundColor: 'red'}} startIcon={<GoogleIcon />} onClick={() => signInWithGoogle()} disabled={authing} fullWidth>
                            Accedi con Google
                        </Button>
                        <Typography>
                            <Link to="#">password dimenticata?</Link>
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
