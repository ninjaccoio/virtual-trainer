import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import SignUpPage from './auth/SignUp';
import {Main} from './pages/Main';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/signup" element={<SignUpPage name={'Login'} />} />
                <Route path="/*" element={<Main />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Application;
