import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'babel-polyfill';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import './IE11';

import store from 'store';  // redux store

import { Provider } from 'react-redux';


// **** (2) Provider 렌더링해서 기존의 App 감싸주기
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();