import React, { createContext } from 'react';
import './styles/App.scss';
import MainRoutes from './routes';

function App() {
    document.title = 'To do List'
    return (
        <MainRoutes />
    );
}

export default App;