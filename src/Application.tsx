import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import {Main} from './pages/Main';

export interface IApplicationProps {}

const Application: React.FC<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage name="Login" />} />
                <Route path="/register" element={<RegisterPage name="Register" />} />
                <Route path="/*" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Application;
