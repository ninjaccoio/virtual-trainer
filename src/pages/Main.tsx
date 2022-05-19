import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from '../modules/auth/ProtectedRoute';
import MuiBottomNavigation from '../components/MuiBottomNavigation';
import HomePage from './Home';
import StatsPage from './Stats';
import ProfilePage from './Profile';
import SettingsPage from './Settings';

const Main = () => {
    return (
        <>
            <ProtectedRoute children={<MuiBottomNavigation />} />
            <Routes>
                <Route path="/" element={<ProtectedRoute children={<HomePage name={'HomePage'} />} />} />
                <Route path="stats" element={<ProtectedRoute children={<StatsPage name={'StatsPage'} />} />} />
                <Route path="profile" element={<ProtectedRoute children={<ProfilePage name={'ProfilePage'} />} />} />
                <Route path="settings">
                    <Route index element={<ProtectedRoute children={<SettingsPage name={'Setting Page'} />} />} />
                    <Route path=":number" element={<ProtectedRoute children={<SettingsPage name={'SettingPage With Number'} />} />} />
                </Route>
            </Routes>
        </>
    );
};

export {Main};
