/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import Root from './Root';
import {name as appName} from './app.json';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReduxers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers'

//log redux transactions if we're in development mode
const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__})

function configureStore(initialState){
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    );
    return createStore(reducer, initialState, enhancer)
}

const initState = {
    accountInfo: {},
    //dictionary of patient objects, key = patient id, value = patient object associated with that id
    patients: {},
    //list of notification objects sorted in chronological order
    notifications: []
}

const store = configureStore(initState);

//this is the root node of our project
const Application = () => {
    return(
        <Provider store={store}>
            <Root></Root>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => Application);


