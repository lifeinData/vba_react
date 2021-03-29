import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import AppHeader from '../src/components/mainAppLayout/appHeader'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))
ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <AppHeader />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'))

