import createReducer from './createReducer'
import * as types from './actionTypes'

export default appState = createReducer({}, {
    [types.TEST_ACTION](state, action){
        const newState = Object.assign({}, state);
        newState.log = action.msg;
        return newState;
    },
});