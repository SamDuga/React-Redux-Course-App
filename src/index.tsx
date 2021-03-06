import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';

import App from './components/App';
import { AppState } from './redux/appState';

// eslint-disable-next-line prefer-const
let initalState: AppState = {
    courses: [],
    authors: [],
    apiCallsInProgress: 0
};

const store = configureStore( initalState );

render(
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
    document.getElementById( 'app' )
);
