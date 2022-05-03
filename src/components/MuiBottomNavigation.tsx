import React from 'react';
import {BottomNavigation, BottomNavigationAction} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PersonIcon from '@mui/icons-material/Person';
import {Link} from 'react-router-dom';
import {useState} from 'react';

export interface IMuiBottomNavigationProps {}

const MuiBottomNavigation: React.FunctionComponent<IMuiBottomNavigationProps> = (props) => {
    const [value, setValue] = useState(0);

    return (
        <BottomNavigation
            sx={{width: '100%', position: 'absolute', bottom: 0}}
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
        >
            <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction component={Link} to="stats" label="Stats" icon={<ShowChartIcon />} />
            <BottomNavigationAction component={Link} to="profile" label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
    );
};

export default MuiBottomNavigation;
