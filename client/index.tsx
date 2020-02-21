import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import axios from 'axios'


// Handle API request errors
axios.interceptors.response.use(response => {
    return response;
}, error => {
    return new Promise((resolve, reject) => {
        if (error.status === 401 && error.data.error_description === 'The access token provided has expired.') {
            // AuthActions.refreshToken({ initialRequest: error.config, resolve: resolve, reject: reject });
        } else if (error.status === 401 && error.statusText === 'Unauthorized') {
            // AuthActions.logout();
        } else {
            reject(error);
        }
    });
});


ReactDOM.render((<App />), document.getElementById('root'));
