import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import MuiBottomNavigation from './components/MuiBottomNavigation';
import HomePage from './pages/Home';
import StatsPage from './pages/Stats';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Settings';

export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
    return (
        <BrowserRouter>
            <MuiBottomNavigation />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="stats" element={<StatsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings">
                    <Route index element={<SettingsPage />} />
                    <Route path=":number" element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
