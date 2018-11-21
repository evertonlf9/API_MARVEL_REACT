import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

// const devTools = window._REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
// const store = createStore(Reducers, devTools);

const store = createStore(Reducers);

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
