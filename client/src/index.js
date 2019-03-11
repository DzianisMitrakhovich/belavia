import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import history from './history'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import {combineReducers, createStore} from 'redux';
import userReducer from './reducers/userReducer';

const allReducers = combineReducers({ user: userReducer});

const store = createStore(
    allReducers, 
    {
        user: {isUserAuthenticated: false}
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
    </Provider>
    , document.getElementById('root'));
serviceWorker.unregister();
