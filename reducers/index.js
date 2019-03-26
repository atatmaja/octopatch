import * as types from '../actions/types'
import { combineReducers } from 'redux'
import * as accountReducer from './account'
import * as patientReducer from './patient'
import * as notificationsReducer from './notifications'

//combines multiple reducers
//each reducer handles updating a different portion of the app state

export default combineReducers(Object.assign({},
    accountReducer,
    patientReducer,
    notificationsReducer
));