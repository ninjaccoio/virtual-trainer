import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Paper, Avatar, TextField, Button, FormControlLabel, FormGroup, Stack, InputAdornment, Typography} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';

const RegisterPage: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'red'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Register</h2>

                    <TextField
                        label="Username"
                        variant="outlined"
                        placeholder="Username"
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
                        placeholder="E-Mail"
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
            </Paper>
        </>
    );
};

export default RegisterPage;
