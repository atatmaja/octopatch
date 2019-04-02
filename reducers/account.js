import createReducer from '../createReducer'
import * as types from '../actions/types'

export const accountInfo = createReducer({}, {
    [types.TEST_ACTION](state, action){
        const newState = Object.assign({}, state);
        newState.log = action.msg;
        return newState;
    },
    [types.SAVE_BLE_ADDR](state, action){
        const newState = Object.assign({}, state);
        console.log(action.deviceAddr);
        newState.deviceAddr = action.deviceAddr;
        return newState;
    }
});