import React from 'react';
import {BrowserRouter, Routes} from 'react-router-dom';

export interface IStatsPageProps {}

const StatsPage: React.FunctionComponent<IStatsPageProps> = (props) => {
    return (
        <div>
            <h1>Statistiche</h1>
        </div>
    );
};

export default StatsPage;
