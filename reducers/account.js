import createReducer from '../createReducer'
import * as types from '../actions/types'

export const accountInfo = createReducer({}, {
    [types.TEST_ACTION](state, action){
        const newState = Object.assign({}, state);
        newState.log = action.msg;
        return newState;
    },
});