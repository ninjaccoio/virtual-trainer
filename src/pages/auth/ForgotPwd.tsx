import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import IPageProps from '../../interfaces/page.interface';
import {Paper, Avatar, TextField, Button, Stack, InputAdornment, Typography} from '@mui/material';
import MailOutlinedIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';

import AuthService from '../../services/auth/auth.service';

const ForgotPwd: React.FC<IPageProps> = (props) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [errEmailMsg, setErrEmailMsg] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const res = await AuthService.forgotPwd(email);

        if (res.success) {
            alert('controlla la posta');
            navigate('/');
        } else {
            alert(res.error);
        }

        setLoading(false);
    };

    const paperStyle = {padding: 20, heigth: 'auto', width: '85%', margin: '20px auto'};
    const avatarStyle = {backgroundColor: 'orange'};
    return (
        <>
            <Paper elevation={5} style={paperStyle}>
                <form onSubmit={handleSubmit}>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Avatar style={avatarStyle}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h2>Recupera Password</h2>

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

                        <Button type="submit" variant="contained" style={{backgroundColor: 'orange'}} startIcon={<LockResetIcon />} disabled={loading} fullWidth>
                            Recupera La Password
                        </Button>

                        <Typography>
                            <Link to="/login">Accedi</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default ForgotPwd;
