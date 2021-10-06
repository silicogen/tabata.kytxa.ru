import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Providers from 'Providers';
import 'css/index.scss';

ReactDOM.render(
    <React.StrictMode>
        <Providers>
            <App />
        </Providers>
    </React.StrictMode>
    ,
    document.getElementById('root')
)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}