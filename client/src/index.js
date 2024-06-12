import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MetamaskProvider } from './hooks/MetamaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MetamaskProvider>
        <App />
    </MetamaskProvider>
);
