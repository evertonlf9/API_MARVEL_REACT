import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import configureStore from './core/store/configureStore';

import App from './app/app';
import 'antd/dist/antd.css';
import './index.scss';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);